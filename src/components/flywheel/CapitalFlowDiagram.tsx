import { FlowDiagram, FlowLabel, FlowLine, FlowNode, FlowPct } from "./flow-primitives";

const HOLDERS_DETAIL = [
  "redistributed proportional to NFTs held",
  "and their art's upgrade stage",
];

function TokenFeesFlow() {
  return (
    <FlowDiagram width={900} height={340}>
      <FlowLine d="M336,170 C460,170 460,70 510,70 L570,70" />
      <FlowLine d="M336,170 C460,170 460,270 510,270 L570,270" />
      <FlowNode cx={306} cy={170} />
      <FlowNode cx={600} cy={70} accent />
      <FlowNode cx={600} cy={270} />

      <FlowPct x={460} y={120} value="80%" />
      <FlowPct x={460} y={220} value="20%" />

      <FlowLabel x={261} y={170} side="left" title="fees from $WORLDS trades" />
      <FlowLabel
        x={645}
        y={70}
        accent
        title="to NFT holders"
        detail={HOLDERS_DETAIL}
      />
      <FlowLabel
        x={645}
        y={270}
        title="burned"
        detail={["removed from the $WORLDS supply,", "permanently"]}
      />
    </FlowDiagram>
  );
}

function RoyaltiesFlow() {
  return (
    <FlowDiagram width={1100} height={340}>
      <FlowLine d="M330,170 L470,170" />
      <FlowLine d="M530,170 C660,170 660,70 710,70 L770,70" />
      <FlowLine d="M530,170 C660,170 660,270 710,270 L770,270" />
      <FlowNode cx={300} cy={170} />
      <FlowNode cx={500} cy={170} />
      <FlowNode cx={800} cy={70} accent />
      <FlowNode cx={800} cy={270} />

      <FlowPct x={660} y={120} value="80%" />
      <FlowPct x={660} y={220} value="20%" />

      <FlowLabel x={255} y={170} side="left" title="royalties from NFT trades" />
      <FlowLabel
        x={500}
        y={125}
        side="top"
        title="buy $WORLDS"
        detail={["royalties buy $WORLDS", "on the market"]}
      />
      <FlowLabel
        x={845}
        y={70}
        accent
        title="to NFT holders"
        detail={HOLDERS_DETAIL}
      />
      <FlowLabel
        x={845}
        y={270}
        title="burned"
        detail={["removed from the $WORLDS supply,", "permanently"]}
      />
    </FlowDiagram>
  );
}

export function CapitalFlowDiagram() {
  return (
    <div className="mx-auto max-w-4xl">
      <p className="text-center text-xs tracking-[0.3em] text-gold-bright uppercase">
        diagram
      </p>
      <h3 className="mt-3 text-center font-display text-3xl text-parchment sm:text-4xl">
        capital flow
      </h3>
      <p className="mx-auto mt-4 max-w-xl text-center text-lg text-parchment-dim">
        After mint, two fee streams keep feeding value back into NFT holders
        and the $WORLDS supply.
      </p>

      <div className="mt-16 space-y-16">
        <div>
          <p className="mb-6 text-center text-sm tracking-[0.2em] text-parchment uppercase">
            token trading fees
          </p>
          <TokenFeesFlow />
        </div>

        <div>
          <p className="mb-6 text-center text-sm tracking-[0.2em] text-parchment uppercase">
            NFT royalties
          </p>
          <RoyaltiesFlow />
        </div>
      </div>
    </div>
  );
}
