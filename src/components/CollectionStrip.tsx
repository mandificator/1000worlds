import curated from "@/data/curated-gallery.json";

const strip = curated.slice(0, 32);

export function CollectionStrip() {
  return (
    <section className="marquee-row relative overflow-hidden border-y border-gold/10 bg-wall py-10">
      <div className="marquee-track flex w-max gap-6 px-6">
        {[...strip, ...strip].map((piece, i) => {
          const label = `world #${String(piece.id).padStart(4, "0")}`;
          return (
            <figure
              key={`${piece.id}-${i}`}
              className="w-24 shrink-0 sm:w-32"
              title={label}
            >
              <img
                src={piece.file}
                alt={label}
                width={96}
                height={96}
                className="w-full border border-gold/20"
                style={{ imageRendering: "pixelated" }}
              />
            </figure>
          );
        })}
      </div>
      <p className="mt-8 text-center text-xs tracking-[0.35em] text-parchment-dim/70 uppercase">
        a glimpse — 32 of 1000 worlds
      </p>
    </section>
  );
}
