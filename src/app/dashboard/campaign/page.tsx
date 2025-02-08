import CampaignContainer from "./CampaignContainer";
import { getRequest } from "@/actions/requests";
import { cookies } from "next/headers";
import { CampaignResponse } from "@/types/campaign";
import CampaignWrapper from "./CampaignWrapper";

interface CampaignPageProps {
  searchParams: Promise<{ page: string }>;
}

const CampaignPage = async ({ searchParams }: CampaignPageProps) => {
  const cookieStore = cookies();
  const { page = "1" } = await searchParams;

  const res: CampaignResponse = await getRequest({
    url: `business/campaign/list?business_uid=${
      (await cookieStore).get("business_uid")?.value
    }&page=${page}`,
    tags: ["campaigns"],
    revalidate: 100,
  });
  return (
    <CampaignWrapper res={res}>
      <CampaignContainer />
    </CampaignWrapper>
  );
};

export default CampaignPage;
