import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="md:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-center flex flex-col items-center gap-2">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <span className="text-2xl font-bold text-gray-800">
              Successful Signup!
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="text-center mt-4">
          <p className="text-gray-600 font-medium">
            Please check your email for a confirmation link to activate your
            account.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
