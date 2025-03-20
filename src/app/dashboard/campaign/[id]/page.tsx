import CampaignContainer from "./CampaignContainer";

import { ICampaignResponse } from "@/types/campaign";
import { getRequest } from "@/actions/requests";
import CampaignDetailsWrapper from "./CampaignDetailsWrapper";

const CampaignDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res: ICampaignResponse = await getRequest({
    url: `business/campaign?uid=${id}`,
    tags: ["campaigns"],
    revalidate: 100,
  });
  // const analyticsResponse = await getRequest({
  //   url: `business/campaign/analytics?campaign_uid=${id}`,
  //   tags: ["campaigns"],
  //   revalidate: 100,
  // });

  return (
    <CampaignDetailsWrapper data={res.data}>
      <CampaignContainer />
    </CampaignDetailsWrapper>
  );
};

export default CampaignDetailPage;
