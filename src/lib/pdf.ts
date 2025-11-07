import PDFDocument from 'pdfkit';

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

function getFindingByType(type: string): { title: string; description: string } {
  const findings: Record<string, { title: string; description: string }> = {
    "missing_hsts": {
      title: "En-tête Strict-Transport-Security manquant",
      description: "Le site n'applique pas HTTPS via HSTS, ce qui pourrait permettre des attaques de dégradation."
    },
    "insecure_hsts": {
      title: "Configuration HSTS non sécurisée",
      description: "L'en-tête HSTS est présent mais manque la directive max-age."
    },
    "missing_csp": {
      title: "En-tête Content-Security-Policy manquant",
      description: "Le site n'a pas d'en-tête CSP, qui aide à prévenir les attaques XSS."
    },
    "missing_content_type_options": {
      title: "En-tête X-Content-Type-Options: nosniff manquant",
      description: "Le site ne prévient pas le reniflage de type MIME, ce qui pourrait conduire à des problèmes de sécurité."
    },
    "missing_frame_protection": {
      title: "Protection contre le clickjacking manquante",
      description: "Le site n'a pas X-Frame-Options ou frame-ancestors dans CSP, ce qui pourrait permettre des attaques de clickjacking."
    },
    "version_leak_server": {
      title: "Fuite de version du serveur",
      description: "L'en-tête Server expose des informations de version de logiciel qui pourraient aider les attaquants à trouver des exploits connus."
    },
    "version_leak_powered_by": {
      title: "Fuite de version X-Powered-By",
      description: "L'en-tête X-Powered-By expose des informations de version de logiciel qui pourraient aider les attaquants à trouver des exploits connus."
    },
    "insecure_cookie_secure": {
      title: "Cookie sans drapeau Secure",
      description: "Le cookie est défini sur HTTPS mais manque le drapeau Secure, ce qui pourrait permettre son envoi sur HTTP."
    },
    "insecure_cookie_httponly": {
      title: "Cookie sans drapeau HttpOnly",
      description: "Le cookie est accessible via JavaScript, ce qui pourrait permettre aux attaques XSS de le voler."
    },
    "insecure_cookie_samesite": {
      title: "Cookie SameSite=None sans Secure",
      description: "Le cookie a SameSite=None mais manque le drapeau Secure, qui est requis pour les cookies cross-site."
    },
    "missing_cookie_samesite": {
      title: "Cookie sans attribut SameSite",
      description: "Le cookie n'a pas d'attribut SameSite défini, ce qui pourrait permettre des attaques CSRF."
    },
    "cors_wildcard": {
      title: "CORS autorise toutes les origines",
      description: "Le site autorise les requêtes de n'importe quelle origine via le caractère générique CORS, ce qui pourrait permettre à des sites malveillants de faire des requêtes au nom des utilisateurs."
    },
    "cors_credentials_with_wildcard": {
      title: "CORS autorise les identifiants avec origine générique/réfléchie",
      description: "Le site autorise l'envoi d'identifiants avec CORS tout en autorisant toutes les origines ou des origines réfléchies, ce qui est une faille de sécurité critique."
    },
    "cors_reflects_origin": {
      title: "CORS reflète l'en-tête Origin",
      description: "Le site reflète l'en-tête Origin dans Access-Control-Allow-Origin, ce qui pourrait permettre à n'importe quel site de faire des requêtes."
    },
    "sensitive_file_exposed": {
      title: "Fichier sensible exposé",
      description: "Un fichier sensible est publiquement accessible, ce qui pourrait exposer des secrets, la configuration ou le code source."
    },
    "directory_listing_enabled": {
      title: "Listage de répertoire activé",
      description: "Le listage de répertoire est activé, ce qui pourrait exposer la structure de fichiers et des fichiers sensibles."
    },
    "leaked_secret_stripe_key": {
      title: "Fuite potentielle de clé secrète Stripe Live",
      description: "Une fuite potentielle de clé secrète Stripe Live a été trouvée dans le code source de la page ou les fichiers JavaScript."
    },
    "leaked_secret_stripe_test": {
      title: "Fuite potentielle de clé secrète Stripe Test",
      description: "Une fuite potentielle de clé secrète Stripe Test a été trouvée dans le code source de la page ou les fichiers JavaScript."
    },
    "leaked_secret_google_api": {
      title: "Fuite potentielle de clé API Google",
      description: "Une fuite potentielle de clé API Google a été trouvée dans le code source de la page ou les fichiers JavaScript."
    },
    "leaked_secret_aws_access": {
      title: "Fuite potentielle d'ID de clé d'accès AWS",
      description: "Une fuite potentielle d'ID de clé d'accès AWS a été trouvée dans le code source de la page ou les fichiers JavaScript."
    },
    "leaked_secret_aws_secret": {
      title: "Fuite potentielle de clé secrète d'accès AWS",
      description: "Une fuite potentielle de clé secrète d'accès AWS a été trouvée dans le code source de la page ou les fichiers JavaScript."
    },
    "leaked_secret_client_secret": {
      title: "Fuite potentielle de secret client OAuth",
      description: "Une fuite potentielle de secret client OAuth a été trouvée dans le code source de la page ou les fichiers JavaScript."
    },
    "leaked_secret_private_key": {
      title: "Fuite potentielle de clé privée",
      description: "Une fuite potentielle de clé privée a été trouvée dans le code source de la page ou les fichiers JavaScript."
    },
    "leaked_secret_api_key": {
      title: "Fuite potentielle de clé API",
      description: "Une fuite potentielle de clé API a été trouvée dans le code source de la page ou les fichiers JavaScript."
    },
    "leaked_secret_password": {
      title: "Mot de passe potentiel dans le code",
      description: "Un mot de passe potentiel dans le code a été trouvé dans le code source de la page ou les fichiers JavaScript."
    },
    "robots_txt_sensitive_paths": {
      title: "robots.txt révèle des chemins sensibles",
      description: "Le fichier robots.txt contient des chemins qui sont interdits, ce qui pourrait révéler des panneaux d'administration cachés, des points de terminaison API ou des répertoires sensibles."
    },
    "verbose_error_500": {
      title: "Messages d'erreur verbeux sur erreur 500",
      description: "Le serveur renvoie des informations d'erreur détaillées dans les réponses 500, ce qui pourrait fuiter des informations sensibles sur les chemins de code, la structure de la base de données ou les technologies serveur."
    },
    "sql_injection_anomaly": {
      title: "Vulnérabilité d'injection SQL potentielle",
      description: "L'envoi d'une simple quote (') a causé une erreur 500 avec des messages d'erreur spécifiques à la base de données, indiquant une vulnérabilité potentielle d'injection SQL."
    },
    "reflected_xss": {
      title: "Vulnérabilité XSS réfléchie potentielle",
      description: "L'entrée utilisateur est réfléchie dans la réponse HTML sans assainissement approprié, ce qui pourrait permettre des attaques XSS."
    },
    "open_api_endpoint": {
      title: "Point de terminaison API potentiellement ouvert",
      description: "Un point de terminaison API a été trouvé qui renvoie des données JSON sans authentification. Cela peut exposer des données sensibles et nécessite une revue manuelle."
    },
    "insecure_form_action": {
      title: "Action de formulaire utilise HTTP",
      description: "Une action de formulaire pointe vers une URL HTTP au lieu de HTTPS, ce qui enverrait les identifiants ou données utilisateur en texte clair."
    },
    "missing_csrf_token": {
      title: "Jeton CSRF manquant",
      description: "Un formulaire qui effectue des actions modifiant l'état (POST/PUT/DELETE/PATCH) ne semble pas avoir de jeton CSRF, ce qui pourrait permettre des attaques CSRF."
    }
  };

  return findings[type] || { title: "", description: "" };
}

export function generatePDF(result: AuditResult): Promise<Buffer> {
  return new Promise((resolve, reject) => {
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
      doc.text('Goditor @ https://ai2h.tech - jonathan@ai2h.tech', 
        margin, pageHeight - margin - footerHeight, 
        { width: pageWidth - 2 * margin, align: 'center' });
      doc.y = oldY;
    };

    doc.on('pageAdded', addFooter);

    doc.fontSize(20).font('Times-Bold').text('Rapport d\'Audit de Sécurité', { align: 'center' });
    doc.moveDown();
    
    doc.fontSize(12).font('Times-Roman').text(`Site audité: ${result.url}`);
    doc.moveDown(2);

    doc.fontSize(14).font('Times-Bold').text('Résumé');
    doc.moveDown(0.5);
    
    const totalFindings = result.summary.critical + result.summary.high + result.summary.medium + result.summary.low + result.summary.info;
    
    doc.fontSize(11).font('Times-Roman');
    doc.text(`Total des découvertes: ${totalFindings}`);
    doc.text(`Critique: ${result.summary.critical}`);
    doc.text(`Élevé: ${result.summary.high}`);
    doc.text(`Moyen: ${result.summary.medium}`);
    doc.text(`Faible: ${result.summary.low}`);
    doc.text(`Info: ${result.summary.info}`);
    doc.moveDown(2);

    if (result.findings.length > 0) {
      doc.fontSize(14).font('Times-Bold').text('Découvertes');
      doc.moveDown(0.5);

      result.findings.forEach((finding, index) => {
        if (doc.y > pageHeight - margin - footerHeight - 100) {
          doc.addPage();
        }

        const severityLabels: Record<string, string> = {
          'critical': 'Critique',
          'high': 'Élevé',
          'medium': 'Moyen',
          'low': 'Faible',
          'info': 'Info'
        };

        const severityLabel = severityLabels[finding.severity.toLowerCase()] || finding.severity;
        
        const severityColors: Record<string, string> = {
          'critical': '#DC3545',
          'high': '#FF9800',
          'medium': '#FFC107',
          'low': '#007BFF',
          'info': '#6C757D'
        };

        const color = severityColors[finding.severity.toLowerCase()] || '#000000';
        const findingInfo = getFindingByType(finding.type);
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
          let evidenceText = `Preuve: ${finding.evidence}`;
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

