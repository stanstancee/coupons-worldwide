import React from "react";
import { PromotionForm } from "@/components/promotions/promotion-form";
import TopNav from "@/components/nav/top-nav";

const CreatePromotionContainer = () => {
  return (
    <div>
      <TopNav title="Run Promotion" />
      <PromotionForm />
    </div>
  );
};

export default CreatePromotionContainer;
