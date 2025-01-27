import React from "react";
import TopNav from "@/components/nav/top-nav";
import SubscriptionInfo from "@/components/team/subscription-info";
import SettingsTabs from "./SettingsTabs";

const SettingsContainer = () => {
  return (
    <div>
      <TopNav title="Settings" />
      <main className="p-4 md:px-5 md:py-6 space-y-4 md:space-y-6 xl:space-y-8 pb-12">
        <div className="bg-white">
          <SubscriptionInfo />
          <div className="p-4 md:px-5 md:my-8">
            <h1 className="text-xl md:text-2xl font-bold mb-6">Settings</h1>
            <SettingsTabs />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsContainer;
