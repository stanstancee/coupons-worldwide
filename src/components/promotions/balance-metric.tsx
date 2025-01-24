"use client";

interface BarChartProps {
  data: number[];
  color: string;
  width?: number;
  height?: number;
}

function MiniBarChart({ data, color, width = 40, height = 40 }: BarChartProps) {
  const max = Math.max(...data);
  const barWidth = width / data.length - 2;

  return (
    <svg width={width} height={height} className="overflow-visible">
      {data.map((value, index) => {
        const barHeight = (value / max) * height;
        return (
          <rect
            key={index}
            x={index * (barWidth + 2)}
            y={height - barHeight}
            width={barWidth}
            height={barHeight}
            fill={color}
            rx="1"
          />
        );
      })}
    </svg>
  );
}

interface BalanceMetricProps {
  totalSpent: string;
  walletBalance: string;
  spentData?: number[];
  balanceData?: number[];
  className?: string;
}

export function BalanceMetric({
  totalSpent,
  walletBalance,
  spentData = [4, 6, 3, 8, 5, 7],
  balanceData = [5, 3, 7, 4, 6, 8],
  className = "",
}: BalanceMetricProps) {
  return (
    <div
      className={`flex rounded-lg overflow-hidden bg-[#1A2B88] ${className}`}
    >
      <div className="flex items-center gap-3  text-white p-4 lg:p-6  flex-1">
        <div>
          <div className="text-sm font-medium opacity-80">Total Spent</div>
          <div className="text-3xl font-bold">{totalSpent}</div>
        </div>
        <MiniBarChart data={spentData} color="rgba(255, 255, 255, 0.8)" />
      </div>
      <div className="flex items-center gap-3  p-4 lg:py-6 md:pl-14 md:pr-5 flex-1 bg-[#717579] shadow-[0px_3.45px_5.17px_0px_#3E49540A] rounded-[10.34px] text-white">
        <div>
          <div className="text-sm font-medium ">Wallet Balance</div>
          <div className="text-3xl font-bold ">{walletBalance}</div>
        </div>
        <MiniBarChart data={balanceData} color="white" />
      </div>
    </div>
  );
}
