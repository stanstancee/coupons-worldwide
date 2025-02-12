"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MemberCard } from "@/components/team/member-card";
import { NewMemberModal } from "@/components/team/new-member-modal";

import { Plus } from "lucide-react";
import { useDashboard } from "@/context/dashboard-context";

export default function TeamMembers() {
  const [showNewMemberModal, setShowNewMemberModal] = useState(false);
  const { teamMembers = [] } = useDashboard();

  return (
    <div className="md:p-6 p-4 bg-white  min-h-[calc(100vh-10rem)] pb-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl text-[#202430] font-bold">
          {`${teamMembers ? teamMembers?.length : 0} member${
            teamMembers && teamMembers?.length > 1 ? "s" : ""
          }`}
        </h1>
        <Button
          onClick={() => setShowNewMemberModal(true)}
          className="bg-[#27285C] hover:bg-[#27285C]/90"
        >
          <Plus className="h-5 w-5" />
          Add Members
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers?.map((member) => (
          <MemberCard
            key={member.user?.uid}
            member={member}
           
          />
        ))}
      </div>

      <NewMemberModal
        open={showNewMemberModal}
        onOpenChange={setShowNewMemberModal}
      />
    </div>
  );
}
