import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Lore } from "@/components/Lore";
import { EvolutionShowcase } from "@/components/EvolutionShowcase";
import { WhitelistSection } from "@/components/WhitelistSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main id="top">
      <Header />
      <Hero />
      <Lore />
      <EvolutionShowcase />
      <WhitelistSection />
      <Footer />
    </main>
  );
}
