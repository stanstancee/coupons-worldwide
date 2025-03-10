'use client'
import { useDashboard } from "@/context/dashboard-context";


export function PromotionStatus() {
  const { dashboardData } = useDashboard();
  return (
    <div className="rounded-lg bg-white p-4 md:p-6 shadow-cards">
      <h3 className="mb-4  md:text-xl font-bold">Promotion Status</h3>
      <div className="flex items-center justify-between gap-3 flex-wrap md:flex-nowrap">
        <div className="space-y-4">
          <div className="flex items-center gap-2 ">
            <div className="h-6 w-6 rounded-full bg-c-gray" />
            <span className="md:text-xl text-lg font-bold text-[#1D1B23]">{
              dashboardData?.promotions?.pending || 0
            }</span>
          </div>
          <p className="text-sm lg:text-base text-[#717579]">Pending</p>
        </div>
        <div className="  space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-c-green" />
            <span className="md:text-xl text-lg  font-bold text-[#1D1B23]">{
              dashboardData?.promotions?.active || 0
            }</span>
          </div>
          <p className="text-sm lg:text-base text-[#717579]">Active</p>
        </div>

        <div className=" space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-c-red" />
            <span className="md:text-xl text-lg  font-bold text-[#1D1B23]">{
              dashboardData?.promotions?.expired || 0
            }</span>

          </div>
          <p className="text-sm lg:text-base text-[#717579]">Expired</p>
        </div>
      </div>
    </div>
  );
}
