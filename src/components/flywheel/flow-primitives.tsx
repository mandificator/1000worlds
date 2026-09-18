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

function FlameIcon({ cx, cy, size = 26 }: { cx: number; cy: number; size?: number }) {
  return (
    <svg
      x={cx - size / 2}
      y={cy - size / 2}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="#ff7a45"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.176 7.547 7.547 0 01-1.705-1.715.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1.005a3.75 3.75 0 013.75-3.75c.045 0 .09.003.135.008a.75.75 0 01.675.746 3.732 3.732 0 00.62 3.163z"
      />
    </svg>
  );
}

export function FlowNode({
  cx,
  cy,
  accent = false,
  flame = false,
}: {
  cx: number;
  cy: number;
  accent?: boolean;
  flame?: boolean;
}) {
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={30}
        fill="var(--wall)"
        stroke="var(--gold-bright)"
        strokeOpacity={accent ? 0.6 : 0.3}
        strokeWidth={1.5}
      />
      {flame && <FlameIcon cx={cx} cy={cy} />}
    </g>
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
