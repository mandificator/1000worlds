import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CapitalFlowDiagram } from "@/components/flywheel/CapitalFlowDiagram";

export const metadata: Metadata = {
  title: "flywheel",
  description:
    "How post-mint trading fees and NFT royalties loop value back into $WORLDS and 1000worlds NFT holders.",
};

export default function FlywheelPage() {
  return (
    <main id="top">
      <Header />
      <section className="relative bg-ink px-6 pt-40 pb-32 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="divider-rule mx-auto mb-10 w-24" />
          <span className="inline-block border border-gold/40 px-3 py-1 text-[10px] tracking-[0.3em] text-gold-bright uppercase">
            mechanics
          </span>
          <h1 className="mt-6 font-display text-5xl text-parchment sm:text-6xl">
            the flywheel
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg text-parchment-dim italic sm:text-xl">
            Every trade and royalty loops back into $WORLDS and the people
            who hold it.
          </p>
        </div>

        <div className="mx-auto mt-24 max-w-4xl">
          <CapitalFlowDiagram />
        </div>
      </section>
      <Footer />
    </main>
  );
}
