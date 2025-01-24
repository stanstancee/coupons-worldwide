interface MiniTrendlineProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}

export function MiniTrendline({
  data,
  color = "#FFB800",
  width = 40,
  height = 40,
}: MiniTrendlineProps) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;

  // Create points for the path
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} className="overflow-visible">
      <path
        d={`M ${points}`}
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="rounded-md"
      />
    </svg>
  );
}
