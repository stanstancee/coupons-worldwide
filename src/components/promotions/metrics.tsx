"use client";

import { SimpleMetric } from "@/components/promotions/simple-metric";
import { BalanceMetric } from "@/components/promotions/balance-metric";
import { useDashboard } from "@/context/dashboard-context";
import { formatNumber } from "@/utils/format-number";

export default function Metrics() {
  const { promotionData, business } = useDashboard();
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SimpleMetric
          value={formatNumber(
            promotionData?.total_promotion_amount || (0 as number)
          )}
          label="Total Promotion"
          trend={[3, 7, 5, 9, 6, 8, 9]}
        />
        <SimpleMetric
          value={formatNumber(
            promotionData?.active_promotions_count || (0 as number)
          )}
          label="Active Promotion"
          trend={[4, 6, 8, 5, 7, 9, 8]}
        />
      </div>
      <BalanceMetric
        totalSpent={formatNumber(promotionData?.total_spent || (0 as number))}
        walletBalance={formatNumber(business?.wallet?.balance || (0 as number))}
        spentData={[4, 6, 3]}
        balanceData={[5, 3, 7]}
      />
    </div>
  );
}
