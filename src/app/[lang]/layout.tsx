import { I18nProvider } from "@/i18n/I18nProvider";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return [{ lang: 'fr' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';
  
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://ai2h.tech'),
    title: isFr 
      ? "Assurer la mise en Production : Stabilisez votre logiciel pour l'évolutivité et la sécurité - AI2H"
      : "Production-Ready Certainty: Stabilize Your Software for Scale and Security - AI2H",
    description: isFr
      ? "Votre partenaire CTO à la demande pour la dernière ligne droite. Nous durcissons votre base de code, garantissant des mises à jour plus rapides, une sécurité supérieure, et une stabilité opérationnelle à long terme."
      : "Your CTO-on-Demand partner for the last mile. We harden your code base, guaranteeing faster updates, superior security, and long-term operational stability.",
    openGraph: {
      title: isFr
        ? "Assurer la mise en Production : Stabilisez votre logiciel pour l'évolutivité et la sécurité - AI2H"
        : "Production-Ready Certainty: Stabilize Your Software for Scale and Security - AI2H",
      description: isFr
        ? "Votre partenaire CTO à la demande pour la dernière ligne droite. Nous durcissons votre base de code, garantissant des mises à jour plus rapides, une sécurité supérieure, et une stabilité opérationnelle à long terme"
        : "Your CTO-on-Demand partner for the last mile. We harden your code base, guaranteeing faster updates, superior security, and long-term operational stability",
      images: [
        {
          url: "/images/ai2h_banner.png",
          width: 1200,
          height: 630,
          alt: isFr ? "AI2H - Du prototype IA au système de production puissant" : "AI2H - From AI Prototype to Production Powerhouse",
        },
      ],
      locale: isFr ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: isFr
        ? "Assurer la mise en Production : Stabilisez votre logiciel pour l'évolutivité et la sécurité - AI2H"
        : "Production-Ready Certainty: Stabilize Your Software for Scale and Security - AI2H",
      description: isFr
        ? "Votre partenaire CTO à la demande pour la dernière ligne droite. Nous durcissons votre base de code, garantissant des mises à jour plus rapides, une sécurité supérieure, et une stabilité opérationnelle à long terme"
        : "Your CTO-on-Demand partner for the last mile. We harden your code base, guaranteeing faster updates, superior security, and long-term operational stability",
      images: ["/images/ai2h_banner.png"],
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  
  return (
    <I18nProvider locale={lang}>
      {children}
    </I18nProvider>
  );
}

