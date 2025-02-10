/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Campaign } from "@/types/campaign";
import { publishCampaignAction } from "@/actions/campaign";
import { useToast } from "@/hooks/use-toast";

interface PublishCampaignDialogProps {
  campaign: Campaign;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function PublishCampaignDialog({
  campaign,
  isOpen,
  setIsOpen,
}: PublishCampaignDialogProps) {
  const [isPublishing, setIsPublishing] = useState(false);
  const { toast } = useToast();

  const handlePublish = async () => {
    setIsPublishing(true);

    try {
      const res = await publishCampaignAction({
        uid: campaign.uid,
      });
      if (res.status) {
        toast({
          description: res.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: res.message,
        });
      }
      setIsOpen(false);

      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error?.message || "Something went wrong. Please try again later.",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[500px] ">
        <DialogHeader>
          <DialogTitle className="font-medium">Publish Campaign</DialogTitle>
          <DialogDescription className="mt-4 pb-10">
            Are you sure you want to publish this campaign?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex space-x-6">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handlePublish} disabled={isPublishing}>
            {isPublishing ? "Publishing..." : "Publish"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
