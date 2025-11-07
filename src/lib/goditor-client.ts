export interface Finding {
  type: string;
  severity: string;
  title: string;
  description: string;
  evidence?: string;
}

export interface AuditResult {
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
}

export class GoditorClient {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = process.env.GODITOR_API_URL || 'http://localhost:8584';
    this.apiKey = process.env.GODITOR_API_KEY || '';

    if (!this.apiKey) {
      throw new Error('GODITOR_API_KEY environment variable is not set');
    }
  }

  async performAudit(url: string): Promise<AuditResult> {
    const response = await fetch(`${this.baseUrl}/api/v1/audit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey,
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || 'Failed to perform audit');
    }

    return await response.json();
  }
}

