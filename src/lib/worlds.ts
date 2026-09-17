import { PublicKey } from "@solana/web3.js";

// $WORLDS token + the address deposits are sent to. Set via env so we never
// hardcode addresses into the bundle; both come from NEXT_PUBLIC_* at build.
//   NEXT_PUBLIC_WORLDS_MINT     — the $WORLDS SPL mint address
//   NEXT_PUBLIC_DEPOSIT_ADDRESS — the wallet that receives deposits
export const WORLDS_SYMBOL = "WORLDS";

const MINT_STR = process.env.NEXT_PUBLIC_WORLDS_MINT || "";
const DEPOSIT_STR = process.env.NEXT_PUBLIC_DEPOSIT_ADDRESS || "";

function toKey(s: string): PublicKey | null {
  try {
    return s ? new PublicKey(s) : null;
  } catch {
    return null;
  }
}

export const WORLDS_MINT = toKey(MINT_STR);
export const DEPOSIT_ADDRESS = toKey(DEPOSIT_STR);
export const WORLDS_CONFIGURED = !!(WORLDS_MINT && DEPOSIT_ADDRESS);

export function fmtAmount(n: number, maxFrac = 4): string {
  if (!isFinite(n)) return "0";
  return n.toLocaleString(undefined, { maximumFractionDigits: maxFrac });
}
