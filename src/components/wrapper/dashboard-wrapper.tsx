"use client";

import { useEffect } from "react";
import { NavSidebar } from "@/components/nav/nav-sidebar";
import { useApi } from "@/hooks/useApi";
import { useDashboard } from "@/context/dashboard-context";
import Cookies from "js-cookie";
import { Profile } from "@/types/profile";

export default function DashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = useApi("/profile/info", {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });

  const { setProfile } = useDashboard();

  useEffect(() => {
    if (data) {
      const profileData: Profile = data?.data;
      Cookies.set("business_uid", profileData?.businesses[0]?.uid);
      setProfile(profileData);
    }
  }, [data, setProfile]);

  return (
    <div className="flex min-h-screen flex-col  md:flex-row bg-[#F7F8FA]">
      <NavSidebar />
      <div className="flex-1">
        <main>{children}</main>
      </div>
    </div>
  );
}
