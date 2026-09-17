// Server-side Solana RPC proxy. The real RPC URL (with its secret token) lives in the
// server-only SOLANA_RPC_URL env and is NEVER shipped to the browser. The client points
// its Connection at /api/rpc (same-origin) and this forwards the JSON-RPC call upstream.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RPC = process.env.SOLANA_RPC_URL || "";

export async function POST(req: Request) {
  if (!RPC) {
    return new Response(JSON.stringify({ error: "RPC not configured" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
  const body = await req.text();
  try {
    const upstream = await fetch(RPC, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
    });
    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: { "content-type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "upstream RPC error" }), {
      status: 502,
      headers: { "content-type": "application/json" },
    });
  }
}
