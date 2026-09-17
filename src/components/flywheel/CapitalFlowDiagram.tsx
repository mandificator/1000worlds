import { FlowDiagram, FlowLabel, FlowLine, FlowNode, FlowPct } from "./flow-primitives";

function TokenFeesFlow() {
  return (
    <FlowDiagram width={760} height={430}>
      <FlowLine d="M180,210 C310,210 310,90 360,90 L430,90" />
      <FlowLine d="M180,210 C310,210 310,330 360,330 L430,330" />
      <FlowNode cx={150} cy={210} />
      <FlowNode cx={460} cy={90} accent />
      <FlowNode cx={460} cy={330} />

      <FlowPct x={300} y={150} value="80%" />
      <FlowPct x={300} y={270} value="20%" />

      <FlowLabel x={150} y={255} title="fees from $WORLDS trades" />
      <FlowLabel
        x={460}
        y={135}
        accent
        title="to NFT holders"
        detail={["redistributed proportional to NFTs held", "and their art's upgrade stage"]}
      />
      <FlowLabel
        x={460}
        y={375}
        title="burned"
        detail={["removed from the $WORLDS supply,", "permanently"]}
      />
    </FlowDiagram>
  );
}

function RoyaltiesFlow() {
  return (
    <FlowDiagram width={920} height={430}>
      <FlowLine d="M180,210 L320,210" />
      <FlowLine d="M380,210 C520,210 520,90 570,90 L670,90" />
      <FlowLine d="M380,210 C520,210 520,330 570,330 L670,330" />
      <FlowNode cx={150} cy={210} />
      <FlowNode cx={350} cy={210} />
      <FlowNode cx={700} cy={90} accent />
      <FlowNode cx={700} cy={330} />

      <FlowPct x={520} y={150} value="80%" />
      <FlowPct x={520} y={270} value="20%" />

      <FlowLabel x={150} y={255} title="royalties from NFT trades" />
      <FlowLabel
        x={350}
        y={255}
        title="buy $WORLDS"
        detail={["royalties buy $WORLDS", "on the market"]}
      />
      <FlowLabel
        x={700}
        y={135}
        accent
        title="to users"
        detail={["distributed to users on every trade"]}
      />
      <FlowLabel
        x={700}
        y={375}
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
