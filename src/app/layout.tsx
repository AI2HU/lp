import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "A2H - Libérez vos applications générées par IA",
  description: "Éliminez définitivement les coûteux abonnements IA grâce à notre migration unique vers un code maintenu par des experts",
  openGraph: {
    title: "A2H - Libérez vos applications générées par IA",
    description: "Éliminez définitivement les coûteux abonnements IA grâce à notre migration unique vers un code maintenu par des experts",
    images: [
      {
        url: "/images/a2h_banner.png",
        width: 1200,
        height: 630,
        alt: "A2H - Migration IA vers code humain",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "A2H - Libérez vos applications générées par IA",
    description: "Éliminez définitivement les coûteux abonnements IA grâce à notre migration unique vers un code maintenu par des experts",
    images: ["/images/a2h_banner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
      <GoogleAnalytics gaId="G-JJGT6CSEFN" />
    </html>
  );
}
