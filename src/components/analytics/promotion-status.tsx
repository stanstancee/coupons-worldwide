export function PromotionStatus() {
  return (
    <div className="rounded-lg bg-white p-6 shadow-cards">
      <h3 className="mb-10 text-lg md:text-2xl font-bold">Promotion Status</h3>
      <div className="flex items-center justify-between gap-3 flex-wrap md:flex-nowrap">
        <div className="space-y-6">
          <div className="flex items-center gap-2 ">
            <div className="h-6 w-6 rounded-full bg-c-gray" />
            <span className="text-2xl font-bold text-[#1D1B23]">37</span>
          </div>
          <p className="text-sm lg:text-base text-[#717579]">Pending</p>
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-c-green" />
            <span className="text-2xl font-bold text-[#1D1B23]">2</span>
          </div>
          <p className="text-sm lg:text-base text-[#717579]">Active</p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-c-red" />
            <span className="text-2xl font-bold text-[#1D1B23]">2</span>

          </div>
          <p className="text-sm lg:text-base text-[#717579]">Expired</p>
        </div>
      </div>
    </div>
  );
}
