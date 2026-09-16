"use client";

import { useCallback, useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

function shorten(address: string) {
  return `${address.slice(0, 4)}…${address.slice(-4)}`;
}

export function WalletButton({ className = "" }: { className?: string }) {
  const { publicKey, disconnect, connecting } = useWallet();
  const { setVisible } = useWalletModal();

  const label = useMemo(() => {
    if (publicKey) return shorten(publicKey.toBase58());
    if (connecting) return "connecting…";
    return "connect wallet";
  }, [publicKey, connecting]);

  const onClick = useCallback(() => {
    if (publicKey) {
      disconnect();
    } else {
      setVisible(true);
    }
  }, [publicKey, disconnect, setVisible]);

  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden border border-gold/40 px-5 py-2 text-sm tracking-[0.18em] uppercase text-parchment transition-colors hover:border-gold hover:text-gold-bright ${className}`}
    >
      <span className="relative z-10">{label}</span>
      <span
        className={`absolute left-0 top-0 h-full w-1.5 bg-gold transition-opacity ${
          publicKey ? "opacity-100" : "opacity-0 group-hover:opacity-60"
        }`}
      />
    </button>
  );
}
