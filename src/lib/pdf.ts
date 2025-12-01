import PDFDocument from 'pdfkit';
import frTranslations from '@/i18n/locales/fr.json';
import enTranslations from '@/i18n/locales/en.json';

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
}

type Translations = typeof frTranslations;

function getTranslations(lang: string): Translations {
  return lang === 'en' ? enTranslations : frTranslations;
}

function getFindingByType(type: string, translations: Translations): { title: string; description: string } {
  const findingsByType = translations.pdf?.findingsByType;
  if (!findingsByType) {
    return { title: "", description: "" };
  }
  const finding = findingsByType[type as keyof typeof findingsByType];
  return finding || { title: "", description: "" };
}

export function generatePDF(result: AuditResult, lang: string = 'fr'): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const translations = getTranslations(lang);
    const t = translations.pdf;
    const auditT = translations.audit;
    
    const doc = new PDFDocument({ 
      margin: 50,
      autoFirstPage: true
    });
    const chunks: Buffer[] = [];

    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const pageHeight = doc.page.height;
    const pageWidth = doc.page.width;
    const margin = 50;
    const footerHeight = 30;

    const addFooter = () => {
      const oldY = doc.y;
      doc.fontSize(9).fillColor('#646464');
      doc.text(t.footer, 
        margin, pageHeight - margin - footerHeight, 
        { width: pageWidth - 2 * margin, align: 'center' });
      doc.y = oldY;
    };

    doc.on('pageAdded', addFooter);

    doc.fontSize(20).font('Times-Bold').text(t.title, { align: 'center' });
    doc.moveDown();
    
    doc.fontSize(12).font('Times-Roman').text(`${t.auditedSite} ${result.url}`);
    doc.moveDown(2);

    doc.fontSize(14).font('Times-Bold').text(t.summary);
    doc.moveDown(0.5);
    
    const totalFindings = result.summary.critical + result.summary.high + result.summary.medium + result.summary.low + result.summary.info;
    
    doc.fontSize(11).font('Times-Roman');
    doc.text(`${t.totalFindings} ${totalFindings}`);
    doc.text(`${t.critical} ${result.summary.critical}`);
    doc.text(`${t.high} ${result.summary.high}`);
    doc.text(`${t.medium} ${result.summary.medium}`);
    doc.text(`${t.low} ${result.summary.low}`);
    doc.text(`${t.info} ${result.summary.info}`);
    doc.moveDown(2);

    if (result.findings.length > 0) {
      doc.fontSize(14).font('Times-Bold').text(t.findings);
      doc.moveDown(0.5);

      result.findings.forEach((finding, index) => {
        if (doc.y > pageHeight - margin - footerHeight - 100) {
          doc.addPage();
        }

        const severityLabel = auditT.severity[finding.severity.toLowerCase() as keyof typeof auditT.severity] || finding.severity;
        
        const severityColors: Record<string, string> = {
          'critical': '#DC3545',
          'high': '#FF9800',
          'medium': '#FFC107',
          'low': '#007BFF',
          'info': '#6C757D'
        };

        const color = severityColors[finding.severity.toLowerCase()] || '#000000';
        const findingInfo = getFindingByType(finding.type, translations);
        const translatedTitle = findingInfo.title || finding.title;
        const translatedDescription = findingInfo.description || finding.description;
        
        doc.fillColor(color);
        doc.fontSize(11).font('Times-Bold');
        doc.text(`${index + 1}. ${translatedTitle} [${severityLabel}]`);
        doc.fillColor('#000000');
        
        doc.moveDown(0.3);
        doc.fontSize(10).font('Times-Roman');
        doc.text(translatedDescription, { align: 'left' });
        
        if (finding.evidence) {
          doc.moveDown(0.3);
          let evidenceText = `${t.evidence} ${finding.evidence}`;
          if (evidenceText.length > 200) {
            evidenceText = evidenceText.substring(0, 200) + '...';
          }
          doc.fontSize(9).font('Times-Italic').fillColor('#646464');
          doc.text(evidenceText);
          doc.fillColor('#000000');
        }
        
        doc.moveDown(1);
      });
    }

    addFooter();
    
    doc.end();
  });
}

