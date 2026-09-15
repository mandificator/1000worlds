"use client";

import dynamic from "next/dynamic";

const GalleryCanvas = dynamic(() => import("./GalleryCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-ink">
      <span className="font-serif text-sm tracking-[0.3em] text-gold/70 uppercase">
        entering the gallery…
      </span>
    </div>
  ),
});

export function GalleryStage() {
  return (
    <div className="absolute inset-0">
      <GalleryCanvas />
    </div>
  );
}
