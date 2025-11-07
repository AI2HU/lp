import { NextRequest, NextResponse } from 'next/server';

interface Finding {
  type: string;
  severity: string;
  title: string;
  description: string;
  evidence?: string;
}

interface AuditResult {
  url: string;
  findings: Finding[];
  summary: {
    total_findings: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
  };
  pdf_path?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    const goditorUrl = process.env.GODITOR_API_URL || 'http://localhost:8584';
    const apiKey = process.env.GODITOR_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'GODITOR_API_KEY environment variable is not set' },
        { status: 500 }
      );
    }

    const response = await fetch(`${goditorUrl}/api/v1/audit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      return NextResponse.json(
        { error: errorData.error || 'Failed to perform audit' },
        { status: response.status }
      );
    }

    const result: AuditResult = await response.json();

    const filteredFindings = result.findings.filter(
      (finding) => finding.severity === 'medium' || finding.severity === 'low'
    );

    const filteredSummary = {
      total_findings: filteredFindings.length,
      critical: result.summary.critical ?? 0,
      high: result.summary.high ?? 0,
      medium: filteredFindings.filter((f) => f.severity === 'medium').length,
      low: filteredFindings.filter((f) => f.severity === 'low').length,
      info: 0,
    };

    const filteredResult: AuditResult = {
      url: result.url,
      findings: filteredFindings,
      summary: filteredSummary,
      pdf_path: result.pdf_path,
    };

    return NextResponse.json(filteredResult, { status: 200 });
  } catch (error: unknown) {
    console.error('Error calling goditor API:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: 'Failed to perform audit', details: errorMessage },
      { status: 500 }
    );
  }
}

