"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MemberCard } from "@/components/team/member-card";
import { NewMemberModal } from "@/components/team/new-member-modal";
import type { Member } from "@/types/member";
import { Plus } from "lucide-react";

const initialMembers: Member[] = [
  {
    id: "1",
    name: "Célestin Gardinier",
    status: "Active",
    avatarUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-chKnnX95YqIQARqCr17okyCb1uw93I.png",
  },
  {
    id: "2",
    name: "Reynaud Colbert",
    status: "Active",
    avatarUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-chKnnX95YqIQARqCr17okyCb1uw93I.png",
  },
  {
    id: "3",
    name: "Arienne Lyon",
    status: "Active",
    avatarUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-chKnnX95YqIQARqCr17okyCb1uw93I.png",
  },
  {
    id: "4",
    name: "Arienne Lyon",
    status: "Pending",
    avatarUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-chKnnX95YqIQARqCr17okyCb1uw93I.png",
  },
  {
    id: "5",
    name: "Bernard Alexander",
    status: "Active",
    avatarUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-chKnnX95YqIQARqCr17okyCb1uw93I.png",
  },
  {
    id: "6",
    name: "Christine Jhonson",
    status: "Active",
    avatarUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-chKnnX95YqIQARqCr17okyCb1uw93I.png",
  },
  {
    id: "7",
    name: "Aaron Morgan",
    status: "Pending",
    avatarUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-chKnnX95YqIQARqCr17okyCb1uw93I.png",
  },
  {
    id: "8",
    name: "Aaron Morgan",
    status: "Active",
    avatarUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-chKnnX95YqIQARqCr17okyCb1uw93I.png",
  },
  {
    id: "9",
    name: "Bernard Alexander",
    status: "Active",
    avatarUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-chKnnX95YqIQARqCr17okyCb1uw93I.png",
  },
  {
    id: "10",
    name: "Christine Jhonson",
    status: "Active",
    avatarUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-chKnnX95YqIQARqCr17okyCb1uw93I.png",
  },
  {
    id: "11",
    name: "Aaron Morgan",
    status: "Pending",
    avatarUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-chKnnX95YqIQARqCr17okyCb1uw93I.png",
  },
  {
    id: "12",
    name: "Aaron Morgan",
    status: "Active",
    avatarUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-chKnnX95YqIQARqCr17okyCb1uw93I.png",
  },
];

export default function TeamMembers() {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [showNewMemberModal, setShowNewMemberModal] = useState(false);

  const handleDeleteMember = (id: string) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  };


  return (
    <div className="p-6 bg-white">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl text-[#202430] font-bold">50 Members</h1>
        <Button
          onClick={() => setShowNewMemberModal(true)}
          className="bg-[#27285C] hover:bg-[#27285C]/90"
        >
          <Plus className="h-5 w-5" />
          Add Members
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {members.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            onDelete={handleDeleteMember}
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
