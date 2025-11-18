import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

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
