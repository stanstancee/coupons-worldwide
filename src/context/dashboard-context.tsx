"use client";

import type React from "react";
import { createContext, useContext, useState, type ReactNode } from "react";
import { Profile, Business } from "@/types/profile";
import { CampaignResponse, Campaign, ICampaignData } from "@/types/campaign";
import { TeamMember } from "@/types/member";
import { Promotion, PromotionData } from "@/types/promote";
import { DashboardBusiness } from "@/types/dashboard";

interface DashboardContextType {
  dashboardData: DashboardBusiness | null;
  setDashboardData: React.Dispatch<React.SetStateAction<DashboardBusiness | null>>;
  profile: Profile | null;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
  campaign: Campaign[];
  campaignResponse: CampaignResponse | null;
  setCampaignResponse: React.Dispatch<
    React.SetStateAction<CampaignResponse | null>
  >;
  setCampaign: React.Dispatch<React.SetStateAction<Campaign[]>>;
  campaignDetails: ICampaignData | null;
  setCampaignDetails: React.Dispatch<
    React.SetStateAction<ICampaignData | null>
  >;
  teamMembers: TeamMember[] | null;
  setTeamMembers: React.Dispatch<React.SetStateAction<TeamMember[] | null>>;
  business: Business | null;
  setBusiness: React.Dispatch<React.SetStateAction<Business | null>>;
  promotions: Promotion[] | null;
  setPromotions: React.Dispatch<React.SetStateAction<Promotion[] | null>>;
  promotionData: PromotionData | null;
  setPromotionData: React.Dispatch<React.SetStateAction<PromotionData | null>>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [campaign, setCampaign] = useState<Campaign[]>([]);
  const [campaignResponse, setCampaignResponse] =
    useState<CampaignResponse | null>(null);
  const [campaignDetails, setCampaignDetails] = useState<ICampaignData | null>(
    null
  );
  const [teamMembers, setTeamMembers] = useState<TeamMember[] | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [promotions, setPromotions] = useState<Promotion[] | null>(null);
  const [promotionData, setPromotionData] = useState<PromotionData | null>(
    null
  );
  const [dashboardData, setDashboardData] = useState<DashboardBusiness | null>(
    null
  );

  return (
    <DashboardContext.Provider
      value={{
        dashboardData,
        setDashboardData,
        profile,
        setProfile,
        campaign,
        campaignResponse,
        setCampaignResponse,
        setCampaign,
        campaignDetails,
        setCampaignDetails,
        teamMembers,
        setTeamMembers,
        business,
        setBusiness,
        promotions,
        setPromotions,
        promotionData,
        setPromotionData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
