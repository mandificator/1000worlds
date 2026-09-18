import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main id="top">
      <Header />
      <Hero />
      <div data-theme="solana">
        <div
          aria-hidden
          className="h-[40vh] w-full"
          style={{ background: "linear-gradient(to bottom, #000000, var(--ink))" }}
        />
        <Footer />
      </div>
    </main>
  );
}
