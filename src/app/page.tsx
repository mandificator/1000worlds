import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Lore } from "@/components/Lore";
import { CollectionStrip } from "@/components/CollectionStrip";
import { MintSection } from "@/components/MintSection";
import { WhitelistSection } from "@/components/WhitelistSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main id="top">
      <Header />
      <Hero />
      <Lore />
      <CollectionStrip />
      <MintSection />
      <WhitelistSection />
      <Footer />
    </main>
  );
}
