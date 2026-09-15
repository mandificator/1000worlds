import curated from "@/data/curated-gallery.json";

export type CuratedPiece = (typeof curated)[number];

export type WallPlacement = {
  piece: CuratedPiece;
  position: [number, number, number];
  rotationY: number;
};

const ART_SIZE = 2.1;
export const FRAME_BORDER = 0.16;
const FRAME_WIDTH = ART_SIZE + FRAME_BORDER;
const Y = 3.1;

// the exact, identical edge-to-edge gap used between every pair of
// neighbouring frames, on every wall
const FRAME_GAP = 0.75;

// even layout driven by the real frame footprint (not an arbitrary span),
// so the gap between frames is the same physical distance everywhere
function layout(count: number) {
  const pitch = FRAME_WIDTH + FRAME_GAP;
  const totalWidth = count * FRAME_WIDTH + (count - 1) * FRAME_GAP;
  const start = -totalWidth / 2 + FRAME_WIDTH / 2;
  return Array.from({ length: count }, (_, i) => start + i * pitch);
}

const legendary = curated.slice(0, 6);
const rar = curated.slice(16, 22);
const neobisnuit = curated.slice(28, 34);

// pulled a few cm off the wall face so the frame geometry never shares
// an exact plane with the wall geometry (coplanar faces z-fight/flicker)
const WALL_GAP = 0.06;

const backOffsets = layout(legendary.length);
const backWall: WallPlacement[] = legendary.map((piece, i) => ({
  piece,
  position: [backOffsets[i], Y, -11.85 + WALL_GAP],
  rotationY: 0,
}));

const leftOffsets = layout(rar.length);
const leftWall: WallPlacement[] = rar.map((piece, i) => ({
  piece,
  position: [-9.85 + WALL_GAP, Y, leftOffsets[i]],
  rotationY: Math.PI / 2,
}));

const rightOffsets = layout(neobisnuit.length);
const rightWall: WallPlacement[] = neobisnuit.map((piece, i) => ({
  piece,
  position: [9.85 - WALL_GAP, Y, rightOffsets[i]],
  rotationY: -Math.PI / 2,
}));

export const wallPlacements: WallPlacement[] = [
  ...backWall,
  ...leftWall,
  ...rightWall,
];

export const roomBounds = {
  halfWidth: 10,
  halfDepth: 12,
  height: 7,
  artSize: ART_SIZE,
};
