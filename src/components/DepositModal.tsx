"use client";

import { useEffect, useMemo, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import {
  getAssociatedTokenAddressSync,
  createAssociatedTokenAccountIdempotentInstruction,
  createTransferCheckedInstruction,
  TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import { WORLDS_MINT, DEPOSIT_ADDRESS, WORLDS_SYMBOL, fmtAmount } from "@/lib/worlds";
import type { WorldsBalance } from "@/hooks/useWorldsBalance";

function toBaseUnits(input: string, decimals: number): bigint {
  const s = input.trim().replace(/[^0-9.]/g, "");
  if (!s) return BigInt(0);
  const [i = "0", f = ""] = s.split(".");
  const frac = (f + "0".repeat(decimals)).slice(0, decimals);
  return BigInt((i || "0") + (decimals ? frac : ""));
}
function fromBaseUnits(v: bigint, decimals: number): number {
  return Number(v) / Math.pow(10, decimals);
}

type Status = { kind: "idle" | "sending" | "ok" | "err"; msg?: string; sig?: string };

export function DepositModal({
  open,
  onClose,
  balance,
}: {
  open: boolean;
  onClose: () => void;
  balance: WorldsBalance;
}) {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  useEffect(() => {
    if (open) {
      setAmount("");
      setStatus({ kind: "idle" });
    }
  }, [open]);

  const { decimals, raw } = balance;
  const amountBase = useMemo(() => toBaseUnits(amount, decimals), [amount, decimals]);
  const overBalance = amountBase > raw;
  const canSend =
    !!publicKey && WORLDS_MINT && DEPOSIT_ADDRESS && amountBase > BigInt(0) && !overBalance && status.kind !== "sending";

  const setPct = (pct: number) => {
    const part = pct >= 100 ? raw : (raw * BigInt(Math.round(pct))) / BigInt(100);
    setAmount(String(fromBaseUnits(part, decimals)));
  };

  async function deposit() {
    if (!publicKey || !WORLDS_MINT || !DEPOSIT_ADDRESS) return;
    setStatus({ kind: "sending", msg: "Preparing transaction…" });
    try {
      // detect token program (classic SPL vs Token-2022)
      const mintInfo = await connection.getAccountInfo(WORLDS_MINT);
      const programId =
        mintInfo && mintInfo.owner.equals(TOKEN_2022_PROGRAM_ID)
          ? TOKEN_2022_PROGRAM_ID
          : TOKEN_PROGRAM_ID;

      const source = getAssociatedTokenAddressSync(WORLDS_MINT, publicKey, false, programId);
      const dest = getAssociatedTokenAddressSync(WORLDS_MINT, DEPOSIT_ADDRESS as PublicKey, true, programId);

      const tx = new Transaction().add(
        createAssociatedTokenAccountIdempotentInstruction(
          publicKey,
          dest,
          DEPOSIT_ADDRESS as PublicKey,
          WORLDS_MINT,
          programId
        ),
        createTransferCheckedInstruction(
          source,
          WORLDS_MINT,
          dest,
          publicKey,
          amountBase,
          decimals,
          [],
          programId
        )
      );
      tx.feePayer = publicKey;
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;

      setStatus({ kind: "sending", msg: "Approve in your wallet…" });
      const sig = await sendTransaction(tx, connection);
      setStatus({ kind: "sending", msg: "Confirming on Solana…", sig });
      // Poll over HTTP (the RPC proxy has no websocket) until confirmed or the blockhash expires.
      let confirmed = false;
      for (let i = 0; i < 40 && !confirmed; i++) {
        const st = await connection.getSignatureStatuses([sig]);
        const s = st.value[0];
        if (s) {
          if (s.err) throw new Error("Transaction failed on-chain");
          if (s.confirmationStatus === "confirmed" || s.confirmationStatus === "finalized") confirmed = true;
        }
        if (!confirmed && i % 5 === 4) {
          const h = await connection.getBlockHeight();
          if (h > lastValidBlockHeight) throw new Error("Transaction expired — please retry");
        }
        if (!confirmed) await new Promise((r) => setTimeout(r, 1500));
      }
      const done = `Deposited ${fmtAmount(fromBaseUnits(amountBase, decimals))} ${WORLDS_SYMBOL}.`;
      setStatus({ kind: "ok", msg: confirmed ? done : `Submitted — ${done} (confirming)`, sig });
      balance.refresh();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Transaction failed";
      setStatus({ kind: "err", msg });
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md border border-gold/35 bg-wall p-6 md:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-1 flex items-center justify-between">
          <h3 className="font-display text-xl text-parchment">Deposit {WORLDS_SYMBOL}</h3>
          <button onClick={onClose} className="text-parchment-dim hover:text-parchment">✕</button>
        </div>
        <p className="mb-5 text-xs tracking-[0.15em] text-parchment-dim uppercase">
          balance: {fmtAmount(balance.uiAmount)} {WORLDS_SYMBOL}
        </p>

        <label className="mb-2 block text-xs tracking-[0.15em] text-parchment-dim uppercase">amount</label>
        <input
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.0"
          className="mb-3 w-full border border-gold/25 bg-ink px-4 py-3 font-display text-lg text-parchment outline-none focus:border-gold"
        />

        <div className="mb-5 grid grid-cols-3 gap-2">
          {[25, 50, 100].map((p) => (
            <button
              key={p}
              onClick={() => setPct(p)}
              className="border border-gold/25 py-2 text-xs tracking-[0.15em] text-parchment uppercase transition-colors hover:border-gold hover:text-gold-bright"
            >
              {p === 100 ? "MAX" : `${p}%`}
            </button>
          ))}
        </div>

        {overBalance && (
          <p className="mb-3 text-xs text-red-400">Amount exceeds your balance.</p>
        )}
        {status.kind !== "idle" && (
          <p className={`mb-3 text-xs ${status.kind === "err" ? "text-red-400" : status.kind === "ok" ? "text-gold-bright" : "text-parchment-dim"}`}>
            {status.kind === "ok" ? "✓ " : ""}{status.msg}
            {status.sig && (
              <>
                {" "}
                <a className="text-gold underline" target="_blank" rel="noreferrer" href={`https://solscan.io/tx/${status.sig}`}>view</a>
              </>
            )}
          </p>
        )}

        <button
          onClick={deposit}
          disabled={!canSend}
          className="w-full border border-gold bg-gold/15 py-3 text-sm tracking-[0.2em] text-parchment uppercase transition-colors enabled:hover:bg-gold/25 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {status.kind === "sending" ? "…" : `Deposit ${WORLDS_SYMBOL}`}
        </button>
      </div>
    </div>
  );
}
