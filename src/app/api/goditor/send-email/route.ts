import { NextRequest, NextResponse } from 'next/server';
import { generatePDF } from '@/lib/pdf';
import { GoditorClient } from '@/lib/goditor-client';
import { CreateContact, ContactsApi } from '@getbrevo/brevo';

function extractDomain(urlString: string): string {
  try {
    const urlObj = new URL(urlString.startsWith('http') ? urlString : `https://${urlString}`);
    return urlObj.hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return urlString.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0].toLowerCase();
  }
}

function validateEmailDomain(email: string, url: string): boolean {
  if (!email || !email.includes('@')) {
    return false;
  }
  
  const emailDomain = email.split('@')[1]?.toLowerCase();
  if (!emailDomain) {
    return false;
  }
  
  const urlDomain = extractDomain(url);
  return emailDomain === urlDomain;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, email } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!validateEmailDomain(email, url)) {
      return NextResponse.json(
        { error: 'Email must be on the same domain as the audited site' },
        { status: 400 }
      );
    }

    const client = new GoditorClient();
    const result = await client.performAudit(url);

    if (!validateEmailDomain(email, result.url)) {
      return NextResponse.json(
        { error: 'Email domain must match the audited website domain' },
        { status: 400 }
      );
    }

    const brevoApiKey = process.env.BREVO_API_KEY;
    if (!brevoApiKey) {
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 500 }
      );
    }

    const pdfBuffer = await generatePDF(result);
    const pdfBase64 = pdfBuffer.toString('base64');

    const attachmentName = `audit_securite_${result.url.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
    
    const totalFindings = (result.summary.critical ?? 0) + (result.summary.high ?? 0) + (result.summary.medium ?? 0) + (result.summary.low ?? 0) + (result.summary.info ?? 0);

    interface EmailPayload {
      sender: {
        email: string;
        name: string;
      };
      to: Array<{
        email: string;
        name: string;
      }>;
      subject: string;
      htmlContent: string;
      attachment: Array<{
        content: string;
        name: string;
      }>;
    }

    const emailPayload: EmailPayload = {
      sender: {
        email: 'jonathan@ai2h.tech',
        name: 'A2H - Goditor'
      },
      to: [
        {
          email: email,
          name: email.split('@')[0]
        }
      ],
      subject: `Rapport d'audit de sécurité - ${result.url}`,
      htmlContent: `
        <html>
          <body>
            <p>Bonjour,</p>
            <p>Veuillez trouver ci-joint le rapport d'audit de sécurité pour le site : <strong>${result.url}</strong></p>
            <p><strong>L'audit a relevé ${totalFindings} découvertes :</strong></p>
            <p><strong>Critique : ${result.summary.critical ?? 0}</strong></p>
            <p><strong>Élevé : ${result.summary.high ?? 0}</strong></p>
            <p><strong>Moyen : ${result.summary.medium ?? 0}</strong></p>
            <p><strong>Faible : ${result.summary.low ?? 0}</strong></p>
            <p><strong>Info : ${result.summary.info ?? 0}</strong></p>
            <p>Cordialement,<br>L'équipe A2H</p>
            <p>Goditor @ https://ai2h.tech - jonathan@ai2h.tech</p>
          </body>
        </html>
      `,
      attachment: [
        {
          content: pdfBase64,
          name: attachmentName
        }
      ]
    };

    const emailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': brevoApiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload)
    });

    const responseText = await emailResponse.text();

    if (!emailResponse.ok) {
      try {
        const errorData = JSON.parse(responseText);
        console.error('Error sending email via Brevo:', errorData);
        return NextResponse.json(
          { error: errorData.message || 'Failed to send email' },
          { status: emailResponse.status }
        );
      } catch {
        console.error('Error response (not JSON):', responseText);
        return NextResponse.json(
          { error: 'Failed to send email' },
          { status: emailResponse.status }
        );
      }
    }

    try {
      const responseData = JSON.parse(responseText);
      console.log('Email sent successfully:', responseData);
    } catch {
      console.log('Success response (not JSON):', responseText);
    }

    try {
      const contactAPI = new ContactsApi();
      (contactAPI as unknown as { authentications: { apiKey: { apiKey: string } } }).authentications.apiKey.apiKey = brevoApiKey;

      const emailName = email.split('@')[0];
      const contact = new CreateContact();
      contact.email = email;
      contact.listIds = [4];
      contact.attributes = {
        FIRSTNAME: emailName,
        LASTNAME: '',
      };

      await contactAPI.createContact(contact);
      console.log('Contact added to list 4:', email);
    } catch (contactError) {
      console.error('Error creating contact:', contactError);
    }

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Error sending email:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    if (error instanceof Error && error.message.includes('GODITOR_API_KEY')) {
      return NextResponse.json(
        { error: 'GODITOR_API_KEY environment variable is not set' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to send email', details: errorMessage },
      { status: 500 }
    );
  }
}

