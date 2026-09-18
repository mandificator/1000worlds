import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CapitalFlowDiagram } from "@/components/flywheel/CapitalFlowDiagram";

export const metadata: Metadata = {
  title: "flywheel",
  description:
    "How post-mint trading fees, NFT royalties and art upgrades loop value back into $WORLDS and 1000worlds NFT holders.",
};

export default function FlywheelPage() {
  return (
    <main id="top" data-theme="aurora">
      <Header />
      <section className="relative bg-ink px-6 pt-40 pb-32 text-center sm:px-10 lg:px-16 xl:px-24">
        <div className="divider-rule mx-auto mb-10 w-24" />
        <span className="inline-block border border-gold/40 px-3 py-1 text-[10px] tracking-[0.3em] text-gold-bright uppercase">
          mechanics
        </span>
        <h1 className="mt-6 font-display text-6xl text-parchment sm:text-7xl lg:text-8xl">
          the flywheel
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg text-parchment-dim sm:text-xl">
          After mint, every trade, royalty and art upgrade loops back into
          $WORLDS and the people who hold it.
        </p>

        <div className="mt-24">
          <CapitalFlowDiagram />
        </div>
      </section>
      <Footer />
    </main>
  );
}
