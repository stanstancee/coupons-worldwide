"use client";

import { useState } from "react";
import { MoreVertical, Edit, Scroll, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import type { Campaign } from "@/types/campaign";
import { PublishCampaignDialog } from "./publish-campaign-dialog";

export default function ActionDropdown({ campaign }: { campaign: Campaign }) {
  const router = useRouter();
  const [openPublishDialog, setOpenPublishDialog] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const handlePublishClick = () => {
    setOpenDropdown(false);
    setOpenPublishDialog(true);
  };

  return (
    <>
      <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className="bg-white hover:bg-gray-100 text-black cursor-pointer"
          >
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px] cursor-pointer">
          {campaign.status === "draft" && (
            <DropdownMenuItem
              onSelect={handlePublishClick}
              className="cursor-pointer"
            >
              <Scroll className="mr-2 h-4 w-4" />
              <span>Publish</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onSelect={() => router.push(`/dashboard/campaign/${campaign.uid}`)}
            className="cursor-pointer"
          >
            <Eye className="mr-2 h-4 w-4" />
            <span>View</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() =>
              router.push(`/dashboard/campaign/${campaign.uid}/edit`)
            }
            className="cursor-pointer"
          >
            <Edit className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <PublishCampaignDialog
        isOpen={openPublishDialog}
        setIsOpen={setOpenPublishDialog}
        campaign={campaign}
      />
    </>
  );
}
