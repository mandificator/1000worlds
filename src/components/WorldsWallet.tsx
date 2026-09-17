"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletButton } from "./WalletButton";
import { DepositModal } from "./DepositModal";
import { useWorldsBalance } from "@/hooks/useWorldsBalance";
import { WORLDS_CONFIGURED, WORLDS_SYMBOL, fmtAmount } from "@/lib/worlds";

export function WorldsWallet() {
  const { publicKey } = useWallet();
  const balance = useWorldsBalance();
  const [open, setOpen] = useState(false);
  const connected = !!publicKey;

  return (
    <div className="flex items-center gap-2 md:gap-3">
      {connected && WORLDS_CONFIGURED && (
        <>
          <span
            className="hidden items-center border border-gold/25 px-3 py-2 text-xs tracking-[0.14em] text-parchment uppercase sm:inline-flex"
            title={`${WORLDS_SYMBOL} balance`}
          >
            {balance.loading ? "…" : fmtAmount(balance.uiAmount)}
            <span className="ml-1.5 text-gold-bright">{WORLDS_SYMBOL}</span>
          </span>
          <button
            onClick={() => setOpen(true)}
            className="border border-gold/40 bg-gold/10 px-4 py-2 text-xs tracking-[0.18em] text-parchment uppercase transition-colors hover:border-gold hover:bg-gold/20 hover:text-gold-bright"
          >
            deposit
          </button>
        </>
      )}
      <WalletButton />
      <DepositModal open={open} onClose={() => setOpen(false)} balance={balance} />
    </div>
  );
}
