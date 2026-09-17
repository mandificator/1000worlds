export function FlowDiagram({
  width,
  height,
  children,
}: {
  width: number;
  height: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="mx-auto w-full"
      style={{ maxWidth: width, aspectRatio: `${width} / ${height}` }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {children}
      </svg>
    </div>
  );
}

export function FlowLine({ d }: { d: string }) {
  return (
    <g>
      <path d={d} fill="none" stroke="var(--gold)" strokeOpacity={0.18} strokeWidth={1.5} />
      <path
        d={d}
        fill="none"
        stroke="var(--gold-bright)"
        strokeWidth={2}
        strokeLinecap="round"
        className="flow-dash"
      />
    </g>
  );
}

export function FlowNode({
  cx,
  cy,
  accent = false,
}: {
  cx: number;
  cy: number;
  accent?: boolean;
}) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={30}
      fill="var(--wall)"
      stroke={accent ? "var(--gold-bright)" : "var(--gold)"}
      strokeOpacity={accent ? 0.6 : 0.3}
      strokeWidth={1.5}
    />
  );
}

const LINE_HEIGHT = 18;
const TITLE_SIZE = 20;
const DETAIL_SIZE = 12.5;

export function FlowLabel({
  x,
  y,
  title,
  detail,
  accent = false,
  side = "right",
}: {
  x: number;
  y: number;
  title: string;
  detail?: string[];
  accent?: boolean;
  side?: "left" | "right" | "top";
}) {
  const lines = [title, ...(detail ?? [])];
  const titleFill = accent ? "var(--gold-bright)" : "var(--parchment)";

  if (side === "top") {
    return (
      <g>
        {lines.map((line, i) => {
          const fromBottom = lines.length - 1 - i;
          return (
            <text
              key={line}
              x={x}
              y={y - fromBottom * LINE_HEIGHT}
              textAnchor="middle"
              className={i === 0 ? "font-display" : undefined}
              fontSize={i === 0 ? TITLE_SIZE : DETAIL_SIZE}
              fill={i === 0 ? titleFill : "var(--parchment-dim)"}
            >
              {line}
            </text>
          );
        })}
      </g>
    );
  }

  const anchor = side === "left" ? "end" : "start";
  const firstY = y - ((lines.length - 1) * LINE_HEIGHT) / 2 + 5;

  return (
    <g>
      {lines.map((line, i) => (
        <text
          key={line}
          x={x}
          y={firstY + i * LINE_HEIGHT}
          textAnchor={anchor}
          className={i === 0 ? "font-display" : undefined}
          fontSize={i === 0 ? TITLE_SIZE : DETAIL_SIZE}
          fill={i === 0 ? titleFill : "var(--parchment-dim)"}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

export function FlowPct({ x, y, value }: { x: number; y: number; value: string }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      className="font-display"
      fontSize={22}
      fill="var(--gold-bright)"
    >
      {value}
    </text>
  );
}
