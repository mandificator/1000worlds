import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MintSection } from "@/components/MintSection";

export const metadata: Metadata = {
  title: "mint",
  description:
    "1000 worlds, minted on Solana as compressed NFTs. Free mint, network fees only, opening after the whitelist.",
};

export default function MintPage() {
  return (
    <main id="top" data-theme="ultraviolet">
      <Header />
      <MintSection />
      <Footer />
    </main>
  );
}
