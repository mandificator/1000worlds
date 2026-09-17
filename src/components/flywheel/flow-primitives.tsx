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

export function FlowLabel({
  x,
  y,
  title,
  detail,
  accent = false,
}: {
  x: number;
  y: number;
  title: string;
  detail?: string[];
  accent?: boolean;
}) {
  return (
    <g>
      <text
        x={x}
        y={y}
        textAnchor="middle"
        className="font-display"
        fontSize={20}
        fill={accent ? "var(--gold-bright)" : "var(--parchment)"}
      >
        {title}
      </text>
      {detail?.map((line, i) => (
        <text
          key={line}
          x={x}
          y={y + 26 + i * 18}
          textAnchor="middle"
          fontSize={12.5}
          fill="var(--parchment-dim)"
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
