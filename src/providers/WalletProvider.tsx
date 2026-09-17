"use client";

import { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
// Mainnet. The browser talks to our SAME-ORIGIN proxy (/api/rpc), which forwards to the
// real RPC server-side — so the paid RPC token is never exposed in the client bundle.
function rpcEndpoint(): string {
  if (typeof window !== "undefined") return window.location.origin + "/api/rpc";
  return "http://localhost:3400/api/rpc"; // SSR placeholder (never actually fetched)
}

export function SolanaWalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const endpoint = useMemo(() => rpcEndpoint(), []);
  // Phantom + Solflare are listed explicitly (best mobile/deep-link support).
  // Every other Solana wallet (Backpack, Glow, OKX, Coinbase, Trust, Ledger…)
  // is auto-detected via the Wallet Standard and shows up in the modal too.
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
