import CampaignContainer from "./CampaignContainer";

import { ICampaignResponse } from "@/types/campaign";
import { getRequest } from "@/actions/requests";
import CampaignDetailsWrapper from "./CampaignDetailsWrapper";

export default async function CampaignDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
const {id} =  await params
const {page} =  await searchParams

  const res: ICampaignResponse = await getRequest({
    url: `business/campaign?uid=${id}&page=${page}`,
    tags: ["campaigns"],
    revalidate: 100,
  });

  return (
    <CampaignDetailsWrapper data={res.data}>
      <CampaignContainer />
    </CampaignDetailsWrapper>
  );
};


