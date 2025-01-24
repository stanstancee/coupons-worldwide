import React from "react";
import TopNav from "@/components/nav/top-nav";
import Metrics from "@/components/promotions/metrics";
import PromotionList from "@/components/promotions/promotion-list";

const PromotionContainer = () => {
  return (
    <div>
      <TopNav title="Promotion Management" />
      <main className="p-4 md:px-5 md:py-6 space-y-4 md:space-y-6 xl:space-y-8 pb-12">
        <Metrics />
        <PromotionList />
      </main>
    </div>
  );
};

export default PromotionContainer;
