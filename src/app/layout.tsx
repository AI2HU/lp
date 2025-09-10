import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A2H - Libérez vos applications générées par IA",
  description: "Éliminez définitivement les coûteux abonnements IA grâce à notre migration unique vers un code maintenu par des experts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
