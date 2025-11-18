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
      ? "Code IA bloqué ? Migrez vers du code maintenable - A2H"
      : "AI Code stuck? Migrate to maintainable code - A2H",
    description: isFr
      ? "Code IA bloqué ? Migrez vers du code maintenable. Éliminez les boucles infinies avec notre migration unique vers un code maintenu par des experts."
      : "AI Code stuck? Migrate to maintainable code. Eliminate infinite loops with our unique migration to code maintained by experts.",
    openGraph: {
      title: isFr
        ? "Code IA bloqué ? Migrez vers du code maintenable - A2H"
        : "AI Code stuck? Migrate to maintainable code - A2H",
      description: isFr
        ? "Code IA bloqué ? Migrez vers du code maintenable. Éliminez les boucles infinies avec notre migration unique vers un code maintenu par des experts"
        : "AI Code stuck? Migrate to maintainable code. Eliminate infinite loops with our unique migration to code maintained by experts",
      images: [
        {
          url: "/images/a2h_banner.png",
          width: 1200,
          height: 630,
          alt: isFr ? "A2H - Migration code IA vers code humain" : "A2H - AI Code to Human Code Migration",
        },
      ],
      locale: isFr ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: isFr
        ? "Code IA bloqué ? Migrez vers du code maintenable - A2H"
        : "AI Code stuck? Migrate to maintainable code - A2H",
      description: isFr
        ? "Code IA bloqué ? Migrez vers du code maintenable. Éliminez les boucles infinies avec notre migration unique vers un code maintenu par des experts"
        : "AI Code stuck? Migrate to maintainable code. Eliminate infinite loops with our unique migration to code maintained by experts",
      images: ["/images/a2h_banner.png"],
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

