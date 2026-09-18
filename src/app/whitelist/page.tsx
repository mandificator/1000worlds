import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhitelistSection } from "@/components/WhitelistSection";

export const metadata: Metadata = {
  title: "whitelist",
  description:
    "Deposit $WORLDS during the whitelist window. Everyone pays the same price per world, and the rest comes back to you.",
};

export default function WhitelistPage() {
  return (
    <main id="top" data-theme="asfintit">
      <Header />
      <WhitelistSection />
      <Footer />
    </main>
  );
}
