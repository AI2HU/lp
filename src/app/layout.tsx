import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Code IA trop cher ? Migrez vers du code humain - A2H",
  description: "Code IA trop cher ? Migrez vers du code humain. Éliminez les abonnements coûteux avec notre migration unique vers un code maintenu par des experts.",
  openGraph: {
    title: "Code IA trop cher ? Migrez vers du code humain - A2H",
    description: "Code IA trop cher ? Migrez vers du code humain. Éliminez les abonnements coûteux avec notre migration unique vers un code maintenu par des experts",
    images: [
      {
        url: "/images/a2h_banner.png",
        width: 1200,
        height: 630,
        alt: "A2H - Migration code IA vers code humain",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Code IA trop cher ? Migrez vers du code humain - A2H",
    description: "Code IA trop cher ? Migrez vers du code humain. Éliminez les abonnements coûteux avec notre migration unique vers un code maintenu par des experts",
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
