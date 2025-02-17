import PromotionContainer from "./PromotionContainer";
import { cookies } from "next/headers";
import { getRequest } from "@/actions/requests";
import { PromotionResponse } from "@/types/promote";
import PromotionWrapper from "./PromotionWrapper";

const PromotionPage = async () => {
  const cookieStore = await cookies();
  const business_uid = cookieStore.get("business_uid")?.value;

  const res: PromotionResponse = await getRequest({
    url: `business/promotion/list?business_uid=${business_uid}`,
    tags: ["promotion"],
    revalidate: 60000,
  });

  return (
    <main>
      <PromotionWrapper
        promotions={res.data?.promotions || []}
        promotionData={res.data}
      >
        <PromotionContainer />
      </PromotionWrapper>
    </main>
  );
};

export default PromotionPage;
