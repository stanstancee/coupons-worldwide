import TeamContainer from "./TeamContainer";
import { getRequest } from "@/actions/requests";
import { cookies } from "next/headers";
import { TeamMemberResponse } from "@/types/member";
import TeamMemberWrapper from "./TeamMemberWrapper";

const TeamPage = async () => {
  const cookiesStore = await cookies();
  const business_uid = cookiesStore.get("business_uid")?.value;

  const response: TeamMemberResponse = await getRequest({
    url: `business/teams/list?business_uid=${business_uid}`,
  });

  return (
    <TeamMemberWrapper team={response.data?.team_members}>
      <TeamContainer />
    </TeamMemberWrapper>
  );
};

export default TeamPage;
