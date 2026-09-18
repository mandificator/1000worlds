import {
  FlowDiagram,
  FlowLabel,
  FlowLine,
  FlowNode,
  FlowPct,
  FlowStepsTable,
  type FlowStep,
} from "./flow-primitives";

const HOLDERS_DETAIL = [
  "redistributed proportional to NFTs held",
  "and their art's upgrade stage",
];

const BURNED_DETAIL = ["removed from the $WORLDS supply,", "permanently"];

const HOLDERS_STEP_DETAIL =
  "redistributed proportional to NFTs held and their art's upgrade stage";
const BURNED_STEP_DETAIL = "removed from the $WORLDS supply, permanently";

const tokenFeesSteps: FlowStep[] = [
  { title: "fees from $WORLDS trades", detail: ["collected in SOL"] },
  { title: "buy $WORLDS", detail: ["SOL fees buy $WORLDS on the market"] },
  { title: "80% to NFT holders", detail: [HOLDERS_STEP_DETAIL], accent: true },
  { title: "20% burned", detail: [BURNED_STEP_DETAIL] },
];

const royaltiesSteps: FlowStep[] = [
  { title: "royalties from NFT trades", detail: ["collected in SOL or USDC"] },
  { title: "buy $WORLDS", detail: ["royalties buy $WORLDS on the market"] },
  { title: "80% to NFT holders", detail: [HOLDERS_STEP_DETAIL], accent: true },
  { title: "20% burned", detail: [BURNED_STEP_DETAIL] },
];

const artUpgradeSteps: FlowStep[] = [
  { title: "art upgrade", detail: ["paid in $WORLDS"] },
  {
    title: "100% burned",
    detail: ["all of it removed from the $WORLDS supply, permanently"],
  },
];

function TokenFeesFlow() {
  return (
    <>
      <div className="hidden lg:block">
        <FlowDiagram width={1100} height={340}>
          <FlowLine d="M336,170 L470,170" />
          <FlowLine d="M530,170 C660,170 660,70 710,70 L770,70" />
          <FlowLine d="M530,170 C660,170 660,270 710,270 L770,270" />
          <FlowNode cx={306} cy={170} />
          <FlowNode cx={500} cy={170} />
          <FlowNode cx={800} cy={70} accent />
          <FlowNode cx={800} cy={270} flame />

          <FlowPct x={740} y={52} value="80%" />
          <FlowPct x={740} y={298} value="20%" />

          <FlowLabel
            x={261}
            y={170}
            side="left"
            title="fees from $WORLDS trades"
            detail={["collected in SOL"]}
          />
          <FlowLabel
            x={500}
            y={125}
            side="top"
            title="buy $WORLDS"
            detail={["SOL fees buy $WORLDS", "on the market"]}
          />
          <FlowLabel
            x={845}
            y={70}
            accent
            title="to NFT holders"
            detail={HOLDERS_DETAIL}
          />
          <FlowLabel x={845} y={270} title="burned" detail={BURNED_DETAIL} />
        </FlowDiagram>
      </div>
      <FlowStepsTable steps={tokenFeesSteps} />
    </>
  );
}

function RoyaltiesFlow() {
  return (
    <>
      <div className="hidden lg:block">
        <FlowDiagram width={1100} height={340}>
          <FlowLine d="M330,170 L470,170" />
          <FlowLine d="M530,170 C660,170 660,70 710,70 L770,70" />
          <FlowLine d="M530,170 C660,170 660,270 710,270 L770,270" />
          <FlowNode cx={300} cy={170} />
          <FlowNode cx={500} cy={170} />
          <FlowNode cx={800} cy={70} accent />
          <FlowNode cx={800} cy={270} flame />

          <FlowPct x={740} y={52} value="80%" />
          <FlowPct x={740} y={298} value="20%" />

          <FlowLabel
            x={255}
            y={170}
            side="left"
            title="royalties from NFT trades"
            detail={["collected in SOL or USDC"]}
          />
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
          <FlowLabel x={845} y={270} title="burned" detail={BURNED_DETAIL} />
        </FlowDiagram>
      </div>
      <FlowStepsTable steps={royaltiesSteps} />
    </>
  );
}

function ArtUpgradeFlow() {
  return (
    <>
      <div className="hidden lg:block">
        <FlowDiagram width={1100} height={260}>
          <FlowLine d="M336,130 L770,130" />
          <FlowNode cx={306} cy={130} />
          <FlowNode cx={800} cy={130} flame />

          <FlowPct x={680} y={95} value="100%" />

          <FlowLabel
            x={261}
            y={130}
            side="left"
            title="art upgrade"
            detail={["paid in $WORLDS"]}
          />
          <FlowLabel
            x={845}
            y={130}
            title="burned"
            detail={["all of it removed from the $WORLDS supply,", "permanently"]}
          />
        </FlowDiagram>
      </div>
      <FlowStepsTable steps={artUpgradeSteps} />
    </>
  );
}

export function CapitalFlowDiagram() {
  return (
    <div>
      <div className="space-y-16">
        <div>
          <p className="mb-6 text-center text-sm tracking-[0.2em] text-gold uppercase">
            token trading fees
          </p>
          <TokenFeesFlow />
        </div>

        <div>
          <p className="mb-6 text-center text-sm tracking-[0.2em] text-gold uppercase">
            NFT royalties
          </p>
          <RoyaltiesFlow />
        </div>

        <div>
          <p className="mb-6 text-center text-sm tracking-[0.2em] text-gold uppercase">
            art upgrades
          </p>
          <ArtUpgradeFlow />
        </div>
      </div>
    </div>
  );
}
