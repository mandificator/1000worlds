"use client";

import { useCallback, useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WORLDS_MINT } from "@/lib/worlds";

export interface WorldsBalance {
  uiAmount: number; // human-readable balance
  decimals: number;
  raw: bigint; // base units
  loading: boolean;
  refresh: () => void;
}

export function useWorldsBalance(): WorldsBalance {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [uiAmount, setUiAmount] = useState(0);
  const [decimals, setDecimals] = useState(0);
  const [raw, setRaw] = useState<bigint>(BigInt(0));
  const [loading, setLoading] = useState(false);

  const fetchBalance = useCallback(async () => {
    if (!publicKey || !WORLDS_MINT) {
      setUiAmount(0);
      setRaw(BigInt(0));
      return;
    }
    setLoading(true);
    try {
      const res = await connection.getParsedTokenAccountsByOwner(publicKey, {
        mint: WORLDS_MINT,
      });
      let ui = 0;
      let dec = decimals;
      let base = BigInt(0);
      for (const { account } of res.value) {
        const info = account.data.parsed.info.tokenAmount;
        ui += info.uiAmount ?? 0;
        dec = info.decimals;
        base += BigInt(info.amount);
      }
      setUiAmount(ui);
      setDecimals(dec);
      setRaw(base);
    } catch {
      // leave previous values on transient RPC errors
    } finally {
      setLoading(false);
    }
  }, [connection, publicKey, decimals]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return { uiAmount, decimals, raw, loading, refresh: fetchBalance };
}
