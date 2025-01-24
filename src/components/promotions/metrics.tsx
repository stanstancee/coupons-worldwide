"use client";

import { SimpleMetric } from "@/components/promotions/simple-metric";
import { BalanceMetric } from "@/components/promotions/balance-metric";

export default function Metrics() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SimpleMetric
          value="14,565k"
          label="Total Promotion"
          trend={[3, 7, 5, 9, 6, 8, 9 , ]}
        />
        <SimpleMetric
          value="565"
          label="Active Promotion"
          trend={[4, 6, 8, 5, 7, 9 , 8]}
        />
      </div>
      <BalanceMetric
        totalSpent="$5,245"
        walletBalance="$953.55"
        spentData={[4, 6, 3]}
        balanceData={[5, 3, 7,]}
      />
    </div>
  );
}
