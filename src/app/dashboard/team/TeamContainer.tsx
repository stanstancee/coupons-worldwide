import React from "react";
import TopNav from "@/components/nav/top-nav";
import SubscriptionInfo from "@/components/team/subscription-info";
import TeamMembers from "@/components/team/team-members";

const TeamContainer = () => {
  return (
    <div>
      <TopNav title="Team management" />
      <main className="p-4 md:px-5 md:py-6 space-y-4 md:space-y-6 xl:space-y-8 pb-12">
        <SubscriptionInfo />
        <TeamMembers />
      </main>
    </div>
  );
};

export default TeamContainer;
