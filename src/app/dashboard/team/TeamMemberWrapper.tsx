"use client";

import React from "react";
import { useDashboard } from "@/context/dashboard-context";
import { TeamMember } from "@/types/member";



const TeamMemberWrapper = ({
  children,
  team,
}: {
  children: React.ReactNode;
  team: TeamMember[];
}) => {
  const { setTeamMembers } = useDashboard();
  React.useEffect(() => {
    setTeamMembers(team);
  }, [team, setTeamMembers]);

  return <main>{children}</main>;
};




export default TeamMemberWrapper;
