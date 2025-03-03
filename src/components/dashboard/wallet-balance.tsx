"use client";

import { useDashboard } from "@/context/dashboard-context";
import { formatNumber } from "@/utils/format-number";

const WalletBalance = () => {
  const { business } = useDashboard();
  return (
    <div className="flex flex-col gap-1 p-4 lg:p-7 pt-9 text-[#1D1B23] bg-white shadow-cards rounded-[10px]">
      <h1 className="font-bold text-lg lg:text-xl">Wallet Balance</h1>
      <p className="text-3xl font-bold">${formatNumber(business?.wallet?.balance || 0)}</p>
    </div>
  );
};

export default WalletBalance;
