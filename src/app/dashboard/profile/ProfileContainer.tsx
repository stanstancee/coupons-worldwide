import React from "react";
import TopNav from "@/components/nav/top-nav";
import SubscriptionInfo from "@/components/team/subscription-info";
import ProfileForm from "@/components/profile/profile-form";


const ProfileContainer = () => {
  return (
    <div>
      <TopNav title="Profile" />
      <main className="p-4 md:px-5 md:py-6 space-y-4 md:space-y-6 xl:space-y-8 pb-12">
        <div className='bg-white'>
        <SubscriptionInfo />
        <ProfileForm />
        </div>

      </main>
    </div>
  );
};

export default ProfileContainer;
