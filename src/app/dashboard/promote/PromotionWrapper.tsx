"use client";

import React, { useEffect } from "react";
import { Promotion, PromotionData } from "@/types/promote";
import { useDashboard } from "@/context/dashboard-context";

const PromotionWrapper = ({
  children,
  promotions,
  promotionData,
}: {
  children: React.ReactNode;
  promotions: Promotion[];
  promotionData: PromotionData;
}) => {
  const { setPromotionData, setPromotions } = useDashboard();
  useEffect(() => {
    setPromotions(promotions);
    setPromotionData(promotionData);
  }, [setPromotions, setPromotionData, promotions, promotionData]);

  return <div>{children}</div>;
};

export default PromotionWrapper;
