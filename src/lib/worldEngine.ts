// Deterministic world generator — ported 1:1 from many-hands-genesis-1000/engine.js
// so the live animation matches the actual collection art exactly.
/* eslint-disable @typescript-eslint/no-explicit-any */

export const S = 96;
export const G0 = 2;
export const MAXG = 66;

const hx = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mx = (a: number[], b: number[], t: number) =>
  a.map((v, i) => Math.round(v + (b[i] - v) * t));

const RAW_PALS = [
  {
    n: "Solana",
    w: 30,
    sky: ["#130b2b", "#3d177a", "#6326bd", "#9945ff", "#4997e0", "#14f195"],
    far: "#2a1458",
    near: "#07060f",
    sun: "#dcfff0",
    acc: "#14f195",
  },
  {
    n: "Asfintit",
    w: 18,
    sky: ["#1d0c2a", "#3a1340", "#86245a", "#d85a4f", "#ef8a45", "#f7bb5e"],
    far: "#6a1f55",
    near: "#0a0612",
    sun: "#fde9b0",
    acc: "#f7bb5e",
  },
  {
    n: "Gheata",
    w: 18,
    sky: ["#0a1426", "#173a61", "#2d73ae", "#6fb9e6", "#a8dbf5", "#eef9ff"],
    far: "#2a5d91",
    near: "#04070f",
    sun: "#ffffff",
    acc: "#a8dbf5",
  },
  {
    n: "Ultraviolet",
    w: 16,
    sky: ["#07030d", "#2c0c45", "#661a8d", "#b23bd6", "#dc1fff", "#f08cff"],
    far: "#5a1784",
    near: "#07030d",
    sun: "#fde6ff",
    acc: "#f08cff",
  },
  {
    n: "Aurora",
    w: 18,
    sky: ["#030712", "#0b2a45", "#11657a", "#1fae8f", "#3fd39a", "#8cefc0"],
    far: "#136170",
    near: "#030712",
    sun: "#e6fff4",
    acc: "#8cefc0",
  },
];

export const PALS = RAW_PALS.map((p) => {
  const F = hx(p.far);
  const N = hx(p.near);
  return {
    ...p,
    rgb: [
      ...p.sky.map(hx),
      mx(F, hx(p.sky[4]), 0.3),
      F,
      mx(F, N, 0.4),
      mx(F, N, 0.7),
      N,
      hx(p.sun),
      hx(p.acc),
    ] as number[][],
  };
});

const Bm = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];
const HEADS = ["", "gluga", "palarie", "coarne"];
const ACC = ["", "toiag", "aura", "felinar", "steag"];
const TREES = ["brad", "copac rotund", "copac uscat"];
const TOPS = ["turla", "cupola", "antena", "inel plutitor"];

function rng(s: number) {
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function pick(r: () => number, a: { w: number }[]) {
  const T = a.reduce((s, x) => s + x.w, 0);
  let v = r() * T;
  for (let i = 0; i < a.length; i++) {
    v -= a[i].w;
    if (v < 0) return i;
  }
  return 0;
}
function shuf<T>(a: T[], r: () => number) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function noise1(r: () => number, k: number) {
  const a: number[] = [];
  for (let i = 0; i < Math.ceil(S / k) + 2; i++) a.push(r());
  return (x: number) => {
    const f = x / k,
      i = Math.floor(f),
      t = f - i,
      u = (1 - Math.cos(t * Math.PI)) / 2;
    return a[i] * (1 - u) + a[i + 1] * u;
  };
}
const nibR = (r: () => number) =>
  Array.from({ length: 67 }, () => Math.floor(r() * 16));

export function scene(seed: number): any {
  const r = rng(seed),
    pal = pick(r, PALS),
    H = 40 + Math.floor(r() * 9),
    amp = 6 + r() * 8,
    nf = noise1(r, 14 + r() * 10),
    nb = [0, 1, 2, 3].map(() => noise1(r, 6 + r() * 8));
  const sun = {
    x: 10 + r() * 76,
    y: 8 + r() * (H - 20),
    rad: 3 + Math.floor(r() * 5),
    t: r() < 0.3 ? 1 : r() < 0.2 ? 2 : 0,
  };
  const stars: [number, number][] = [];
  for (let i = Math.floor(r() * 26); i > 0; i--)
    stars.push([Math.floor(r() * S), Math.floor(r() * (H - 14))]);
  const BASE = [4, 13, 23, 36],
    COUNTS = [22, 18, 12, 10],
    MIX = [0.4, 0.25, 0.2, 0.15],
    bands: any[][] = [];
  for (let k = 0; k < 4; k++) {
    const C = COUNTS[k],
      ty: number[] = [];
    MIX.forEach((m, t) => {
      for (let i = 0; i < Math.round(C * m); i++) ty.push(t);
    });
    while (ty.length < C) ty.push(0);
    ty.length = C;
    shuf(ty, r);
    const xs: number[] = [];
    for (let i = 0; i < C; i++)
      xs.push(Math.round(((i + 0.5) * S) / C + ((k * S) / C) * 0.37) % S);
    shuf(xs, r);
    bands.push(xs.map((x, i) => ({ band: k, x, type: ty[i] })));
  }
  const birds = [0, 1, 2, 3].map(() => ({
    bird: 1,
    x: Math.floor(r() * S),
    y: 6 + Math.floor(r() * (H - 16)),
  }));
  const order = [bands[3][0], bands[3][1]];
  return {
    seed,
    pal,
    H,
    amp,
    farY: (x: number) => Math.round(H - 3 - nf(x) * amp),
    gY: (k: number, x: number) => Math.round(H + BASE[k] - nb[k](x) * 2.5),
    sun,
    stars,
    bands,
    birds,
    order,
    genes: [nibR(r), nibR(r)],
  };
}

function fig(n: number[], L: number) {
  const p: [number, number, string?][] = [],
    P = (x: number, y: number, c?: string) => p.push([x, y, c]);
  if (L === 0) {
    const t = n[5] & 1;
    P(-1, 0);
    P(1, 0);
    P(0, -1);
    if (t) P(0, -2);
    const s = -2 - t;
    P(-1, s);
    P(0, s);
    P(1, s);
    P(0, s - 1);
    return { p, d: "silueta mica" };
  }
  const h = [0, 7, 10, 13][L] + (n[5] % [1, 2, 3, 4][L]),
    lh = Math.round(h * 0.35),
    bh = Math.round(h * 0.38),
    hr = [0, 1, 1.5, 2][L],
    bw = L === 3 ? 1 + (n[7] & 1) : L === 2 ? 1 : 0,
    cape = L >= 2 && n[8] % 3 === 0,
    hd = L >= 2 ? n[9] % 4 : n[9] % 4 === 1 ? 1 : 0,
    ac = L >= 2 ? n[10] % 5 : n[10] % 5 === 1 ? 1 : 0;
  for (let y = 0; y < lh; y++) {
    P(-1, -y);
    P(1, -y);
  }
  for (let y = 0; y < bh; y++) {
    const hw = bw + (cape ? Math.floor((bh - y) / 3) : 0);
    for (let x = -hw; x <= hw; x++) P(x, -lh - y);
  }
  if (!cape) {
    if (L >= 2)
      for (let y = 0; y < 3; y++) {
        P(-bw - 1, -lh - bh + 1 + y);
        P(bw + 1, -lh - bh + 1 + y);
      }
    else {
      P(-1, -lh - bh + 1);
      P(1, -lh - bh + 1);
    }
  }
  const R = Math.ceil(hr),
    cy = -lh - bh - R;
  for (let dx = -R; dx <= R; dx++)
    for (let dy = -R; dy <= R; dy++)
      if (dx * dx + dy * dy <= hr * hr + 0.5) P(dx, cy + dy);
  const ty = cy - R;
  if (hd === 1) {
    P(0, ty);
    if (L >= 2) P(0, ty - 1);
  } else if (hd === 2) {
    for (let x = -R - 1; x <= R + 1; x++) P(x, ty + 1);
    P(-1, ty);
    P(0, ty);
    P(1, ty);
  } else if (hd === 3) {
    P(-R - 1, ty + 1);
    P(R + 1, ty + 1);
    P(-R - 1, ty);
    P(R + 1, ty);
    if (L === 3) {
      P(-R - 2, ty - 1);
      P(R + 2, ty - 1);
    }
  }
  const sx = bw + 2;
  if (ac === 1 || ac === 4) {
    for (let y = 0; y <= h + 1; y++) P(sx, -y);
    if (ac === 4)
      for (let x = 1; x <= 2; x++)
        for (let y = 0; y < 2; y++) P(sx + x, -h - 1 + y, "a");
  } else if (ac === 2) {
    for (let x = -2; x <= 2; x++) P(x, ty - 2, "s");
  } else if (ac === 3) {
    P(sx, -lh - bh + 3, "a");
    P(sx, -lh - bh + 4, "a");
  }
  const parts = [HEADS[hd], ACC[ac]].filter(Boolean);
  return { p, d: "silueta" + (parts.length ? " cu " + parts.join(", ") : "") };
}
function tree(n: number[], L: number) {
  const p: [number, number, string?][] = [],
    P = (x: number, y: number, c?: string) => p.push([x, y, c]),
    t = n[5] % 3;
  if (t === 0) {
    const h = [5, 8, 11, 14][L] + (n[6] % 3),
      tr = L >= 2 ? 2 : 1;
    for (let y = 0; y < h; y++) {
      if (y < tr) {
        P(0, -y);
        if (L === 3) P(-1, -y);
        continue;
      }
      const rem = h - y,
        hf = L === 0 ? (rem > 2 ? 1 : 0) : Math.floor((rem % 4) * 0.5 + rem * 0.3);
      for (let x = -hf; x <= hf; x++) P(x, -y);
    }
    P(0, -h);
  } else if (t === 1) {
    const tr = [1, 2, 3, 4][L],
      R = [1, 2, 3, 4][L];
    for (let y = 0; y < tr; y++) P(0, -y);
    for (let dx = -R - 1; dx <= R + 1; dx++)
      for (let dy = -R - 1; dy <= R + 1; dy++) {
        const e = L >= 2 ? (n[Math.abs(dx * 7 + dy * 13 + 100) % 67] / 15 - 0.5) * 1.2 : 0;
        if (Math.hypot(dx, dy) <= R + e + 0.3) P(dx, -(tr + R) + dy);
      }
  } else {
    const h = [4, 7, 10, 13][L] + (n[6] % 3);
    for (let y = 0; y < h; y++) {
      P(0, -y);
      if (L === 3 && y < h / 2) P(1, -y);
    }
    for (let i = 1; i <= Math.min(3, L + 1); i++) {
      const yb = Math.floor(h * (0.3 + i * 0.17)),
        dir = n[6 + i] & 1 ? 1 : -1,
        len = [1, 1, 2, 3][L] + (n[9 + i] & 1);
      for (let k = 1; k <= len; k++) P(dir * k, -(yb + k));
      if (L >= 2 && n[12 + i] & 1)
        for (let k = 1; k < len; k++) P(-dir * k, -(yb + k + 1));
    }
  }
  return { p, d: TREES[t] };
}
function tower(n: number[], L: number) {
  const p: [number, number, string?][] = [],
    P = (x: number, y: number, c?: string) => p.push([x, y, c]);
  const w = [1, 1, 2, 2][L] + (L === 3 ? n[5] % 2 : 0),
    h = [7, 11, 15, 19][L] + (n[6] % [2, 3, 4, 5][L]),
    x0 = -Math.floor(w / 2),
    tp = L === 0 ? 0 : n[7] % 4;
  for (let y = 0; y < h; y++) for (let x = x0; x < x0 + w; x++) P(x, -y);
  if (L >= 2)
    for (let i = 0; i <= n[8] % 4; i++)
      P(x0 + (n[14 + i] % w), -(2 + ((n[9 + i] * 3) % (h - 4))), "a");
  if (tp === 0) {
    const sh = L === 0 ? 2 : w + 2;
    for (let k = 0; k < sh; k++) {
      const hf = Math.floor((w / 2) * (1 - k / sh));
      for (let x = -hf; x <= hf; x++) P(x, -h - k);
    }
  } else if (tp === 1) {
    const R = L === 1 ? 1 : Math.ceil(w / 2) + 1;
    for (let dy = 0; dy <= R; dy++)
      for (let dx = -R; dx <= R; dx++)
        if (dx * dx + dy * dy <= R * R + 0.3) P(dx, -h - dy);
  } else if (tp === 2) {
    const al = [0, 3, 4, 5][L];
    for (let k = 0; k < al; k++) P(0, -h - k);
    P(0, -h - al, "s");
  } else {
    P(0, -h);
    const a = w + 2,
      cy = -h - 3,
      b = L === 3 ? 1.5 : 1.2;
    for (let dx = -a - 1; dx <= a + 1; dx++)
      for (let dy = -2; dy <= 2; dy++) {
        const v = (dx / a) ** 2 + (dy / b) ** 2;
        if (Math.abs(v - 1) < 0.38) P(dx, cy + dy);
      }
    P(0, cy, "s");
  }
  return { p, d: "turn cu " + TOPS[tp] };
}
function creature(n: number[], L: number) {
  const p: [number, number, string?][] = [],
    P = (x: number, y: number, c?: string) => p.push([x, y, c]);
  const hw = [1, 2, 3, 3][L] + (L === 3 ? n[5] % 2 : 0),
    ch = [2, 3, 5, 7][L];
  for (let y = 0; y < ch; y++)
    for (let x = 0; x <= hw; x++) {
      let on: boolean;
      if (y === 0) on = x === hw;
      else
        on =
          x === 0 ||
          (x === 1 && y < ch - 1 && L >= 1) ||
          (L >= 1 && ((n[(y * 7 + x * 3) % 67] >> (x % 3)) & 1) === 1);
      if (on) {
        P(x, -y);
        if (x) P(-x, -y);
      }
    }
  if (L === 0) {
    P(-1, -2);
    P(1, -2);
  }
  if (L >= 2) {
    const ey = ch - 2;
    P(-1, -ey, "a");
    P(1, -ey, "a");
    if (n[20] & 1) {
      P(-1, -ch);
      P(1, -ch);
      P(-2, -ch - 1);
      P(2, -ch - 1);
    }
  }
  return { p, d: "creatura" };
}
function sprite(slot: any, n: number[]): any {
  if (slot.bird) {
    const up = n[5] & 1,
      p: [number, number][] = up
        ? [
            [-2, -1],
            [-1, 0],
            [0, 0],
            [1, 0],
            [2, -1],
          ]
        : [
            [-2, 1],
            [-1, 0],
            [0, 0],
            [1, 0],
            [2, 1],
          ];
    if (n[6] % 3 === 0) p.push([4, 2], [5, 1], [6, 2]);
    return {
      bird: 1,
      x: slot.x,
      y: slot.y,
      p,
      d: n[6] % 3 === 0 ? "pasari" : "pasare",
    };
  }
  const L = slot.band,
    o: any = [fig, tree, tower, creature][slot.type](n, L);
  return { ...o, L, type: slot.type, x: slot.x + ((n[3] % 3) - 1) * (L >= 2 ? 2 : 1) };
}

export function render(sc: any): { buf: Uint8Array; sprites: any[] } {
  const b = new Uint8Array(S * S),
    set = (x: number, y: number, c: number) => {
      if (x >= 0 && x < S && y >= 0 && y < S) b[y * S + x] = c;
    };
  for (let y = 0; y < S; y++)
    for (let x = 0; x < S; x++) {
      const t = Math.min(1, y / (sc.H + 2));
      b[y * S + x] = Math.max(
        0,
        Math.min(5, Math.floor(t * 5 + 0.5 + (Bm[y & 3][x & 3] + 0.5) / 16 - 0.5))
      );
    }
  if (sc.pal !== 1)
    sc.stars.forEach(([x, y]: [number, number]) => {
      if (b[y * S + x] <= 1) set(x, y, 11);
    });
  const s = sc.sun;
  for (let dy = -s.rad - 7; dy <= s.rad + 7; dy++)
    for (let dx = -s.rad - 7; dx <= s.rad + 7; dx++) {
      const d = Math.hypot(dx, dy),
        X = Math.round(s.x + dx),
        Y = Math.round(s.y + dy);
      if (s.t === 0 && d <= s.rad) set(X, Y, 11);
      else if (
        s.t === 1 &&
        d <= s.rad &&
        Math.hypot(dx - s.rad * 0.45, dy + s.rad * 0.2) > s.rad * 0.8
      )
        set(X, Y, 11);
      else if (s.t === 2) {
        if (d <= s.rad * 0.6) set(X, Y, 11);
        const a = s.rad * 1.5,
          v = (dx / a) ** 2 + (dy / (s.rad * 0.35)) ** 2;
        if (Math.abs(v - 1) < 0.2 && !(dy < 0 && d <= s.rad * 0.6)) set(X, Y, 11);
      }
    }
  for (let x = 0; x < S; x++) for (let y = sc.farY(x); y < S; y++) set(x, y, 6);
  const slots = assign(sc);
  const sp = sc.genes.map((n: number[], i: number) => sprite(slots[i], n));
  const put = (o: any, base: number, col: number) =>
    o.p.forEach(([dx, dy, c]: [number, number, string?]) =>
      set(o.x + dx, base - 1 + dy, c === "a" ? 12 : c === "s" ? 11 : col)
    );
  sp.filter((o: any) => o.bird).forEach((o: any) => put(o, o.y + 1, 9));
  for (let k = 0; k < 4; k++) {
    for (let x = 0; x < S; x++) for (let y = sc.gY(k, x); y < S; y++) set(x, y, 7 + k);
    sp.filter((o: any) => !o.bird && o.L === k).forEach((o: any) => put(o, sc.gY(k, o.x), 7 + k));
  }
  return { buf: b, sprites: sp };
}

const SKY_W = 0.4;
function u16(n: number[], a: number) {
  return ((n[a] << 12) | (n[a + 1] << 8) | (n[a + 2] << 4) | n[a + 3]) / 65536;
}
function pickSlot(n: number[], pools: any[][]) {
  const w: number[] = pools.map((p, i) => (p.length ? (i === 4 ? SKY_W : 1) : 0)),
    T = w.reduce((a, b) => a + b, 0);
  let v = u16(n, 56) * T,
    k = 0;
  for (; k < pools.length; k++) {
    v -= w[k];
    if (v < 0 && w[k] > 0) break;
  }
  if (k >= pools.length) k = w.findIndex((x) => x > 0);
  return pools[k].splice(Math.floor(u16(n, 60) * pools[k].length), 1)[0];
}
function assign(sc: any) {
  const pools = [
    sc.bands[0].slice(),
    sc.bands[1].slice(),
    sc.bands[2].slice(),
    sc.bands[3].slice(2),
    sc.birds.slice(),
  ];
  const out = sc.order.slice();
  for (let i = out.length; i < sc.genes.length; i++) out.push(pickSlot(sc.genes[i], pools));
  return out;
}

export function fill(sc: any) {
  const r = rng(sc.seed * 13 + sc.genes.length);
  while (sc.genes.length < MAXG) sc.genes.push(nibR(r));
}
