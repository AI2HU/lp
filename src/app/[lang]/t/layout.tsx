import { Nav } from "@/component/Nav";
import { Footer } from "@/component/Footer";

export default function TargetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-white text-black">
        {children}
      </main>
      <Footer />
    </>
  );
}
