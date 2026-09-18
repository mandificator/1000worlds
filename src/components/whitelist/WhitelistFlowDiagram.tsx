import {
  FlowDiagram,
  FlowLabel,
  FlowLine,
  FlowNode,
} from "@/components/flywheel/flow-primitives";

export function WhitelistFlowDiagram() {
  return (
    <div className="mt-16">
      <FlowDiagram width={1100} height={340}>
        <FlowLine d="M336,170 L470,170" />
        <FlowLine d="M530,170 C660,170 660,70 710,70 L770,70" />
        <FlowLine d="M530,170 C660,170 660,270 710,270 L770,270" />
        <FlowNode cx={306} cy={170} />
        <FlowNode cx={500} cy={170} />
        <FlowNode cx={800} cy={70} accent />
        <FlowNode cx={800} cy={270} flame />

        <FlowLabel
          x={261}
          y={170}
          side="left"
          title="deposit $WORLDS"
          detail={["min. 10,000, any number of times"]}
        />
        <FlowLabel
          x={500}
          y={125}
          side="top"
          title="worlds granted"
          detail={["deposit ÷ final price,", "rounded down"]}
        />
        <FlowLabel
          x={845}
          y={70}
          accent
          title="refunded"
          detail={["the rounding remainder, and anything", "unused, comes back to you"]}
        />
        <FlowLabel
          x={845}
          y={270}
          title="burned"
          detail={["the $WORLDS spent on your worlds,", "permanently"]}
        />
      </FlowDiagram>
    </div>
  );
}
