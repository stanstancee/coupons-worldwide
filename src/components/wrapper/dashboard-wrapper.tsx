/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";
import { NavSidebar } from "@/components/nav/nav-sidebar";
import { useApi } from "@/hooks/useApi";
import { useDashboard } from "@/context/dashboard-context";
import Cookies from "js-cookie";
import { Profile } from "@/types/profile";
import { countries } from "@/lib/countries";

export default function DashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = useApi("/profile/info", {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });

  const { setProfile, setBusiness } = useDashboard();

  useEffect(() => {
    if (data) {
      const profileData: Profile = data?.data;
      const business = profileData?.businesses[0];
      const country = countries.find((c) => c.name === business?.country);
      Cookies.set("business_uid", business?.uid);
      Cookies.set("currency_symbol", country?.symbol as string);
      setProfile(profileData);
      setBusiness(business);
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
