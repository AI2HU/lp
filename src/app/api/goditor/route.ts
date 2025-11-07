import { NextRequest, NextResponse } from 'next/server';
import { GoditorClient, AuditResult } from '@/lib/goditor-client';

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

    const client = new GoditorClient();
    const result = await client.performAudit(url);

    const filteredFindings = result.findings.filter(
      (finding) => finding.severity === 'medium' || finding.severity === 'low'
    );

    const filteredSummary = {
      total_findings: (result.summary.critical ?? 0) + (result.summary.high ?? 0) + (result.summary.medium ?? 0) + (result.summary.low ?? 0) + (result.summary.info ?? 0),
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
    };

    return NextResponse.json(filteredResult, { status: 200 });
  } catch (error: unknown) {
    console.error('Error calling goditor API:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    if (error instanceof Error && error.message.includes('GODITOR_API_KEY')) {
      return NextResponse.json(
        { error: 'GODITOR_API_KEY environment variable is not set' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to perform audit', details: errorMessage },
      { status: 500 }
    );
  }
}

