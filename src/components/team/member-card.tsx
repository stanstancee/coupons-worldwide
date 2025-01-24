"use client";

import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import type { Member } from "../../types/member";

interface MemberCardProps {
  member: Member;
  onDelete: (id: string) => void;
}

export function MemberCard({ member, onDelete }: MemberCardProps) {
  const [, setShowDelete] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <div
        className="relative p-6 border rounded-lg hover:bg-gray-50 transition-colors bg-white"
        onMouseEnter={() => setShowDelete(true)}
        onMouseLeave={() => setShowDelete(false)}
      >
        <div className="flex flex-col items-center gap-3">
          <Avatar className="h-20 w-20 rounded-full">
            <AvatarImage src={member.avatarUrl} alt={member.name} />
            <AvatarFallback>{member.name[0]}</AvatarFallback>
          </Avatar>
          <div className="text-center grid place-content-center place-items-center">
            <h3 className="font-semibold text-xl">{member.name}</h3>
            <span className="text-[#7C8493] mt-2">{member.status}</span>
          </div>
        </div>
        {member.status === "Active" && (
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-2 right-2 hover:bg-transparent cursor-pointer"
            onClick={() => setShowDeleteDialog(true)}
          >
            <g clip-path="url(#clip0_8991_13403)">
              <path
                d="M34.1333 5.85332C32.2775 3.99401 30.0728 2.51951 27.6457 1.51447C25.2186 0.509419 22.6169 -0.00638603 19.99 -0.00334355C8.94328 -0.00334355 -0.0117188 8.95166 -0.0117188 19.9983C-0.0117188 25.5217 2.22828 30.5233 5.84828 34.1433C7.70405 36.0026 9.90876 37.4771 12.3359 38.4822C14.763 39.4872 17.3647 40.003 19.9916 40C31.0383 40 39.9933 31.045 39.9933 19.9983C39.9933 14.475 37.7533 9.47332 34.1333 5.85332ZM31.5633 31.565C30.0447 33.086 28.2409 34.2924 26.2552 35.1149C24.2695 35.9375 22.1409 36.36 19.9916 36.3583C10.9533 36.3583 3.62661 29.0317 3.62661 19.9933C3.62492 17.844 4.04746 15.7155 4.87 13.7298C5.69254 11.7441 6.89891 9.94022 8.41995 8.42166C9.93831 6.90081 11.7419 5.69456 13.7273 4.87203C15.7127 4.04949 17.8409 3.62685 19.99 3.62832C29.0266 3.62832 36.3533 10.955 36.3533 19.9917C36.3548 22.1407 35.9321 24.2689 35.1096 26.2543C34.287 28.2397 33.0808 30.0433 31.5599 31.5617L31.5633 31.565Z"
                fill="#FF0000"
              />
              <path
                d="M22.5616 20L28.9866 13.575C29.3035 13.2296 29.4748 12.775 29.4646 12.3063C29.4545 11.8376 29.2637 11.391 28.9321 11.0596C28.6004 10.7282 28.1537 10.5377 27.685 10.5278C27.2162 10.518 26.7618 10.6895 26.4166 11.0067L26.4183 11.005L19.9933 17.43L13.5683 11.005C13.2228 10.6881 12.7683 10.5168 12.2996 10.527C11.8309 10.5371 11.3842 10.7279 11.0528 11.0595C10.7214 11.3912 10.5309 11.8379 10.5211 12.3066C10.5112 12.7754 10.6828 13.2298 10.9999 13.575L10.9983 13.5733L17.4233 19.9983L10.9983 26.4233C10.8175 26.5892 10.6721 26.7899 10.571 27.0134C10.4698 27.2369 10.4149 27.4785 10.4096 27.7238C10.4043 27.9691 10.4487 28.2129 10.54 28.4405C10.6314 28.6682 10.7679 28.875 10.9413 29.0486C11.1148 29.2221 11.3215 29.3587 11.5491 29.4503C11.7767 29.5418 12.0205 29.5863 12.2657 29.5811C12.511 29.576 12.7527 29.5213 12.9763 29.4202C13.1998 29.3192 13.4006 29.174 13.5666 28.9933L13.5683 28.9917L19.9933 22.5667L26.4183 28.9917C26.5841 29.1724 26.7848 29.3178 27.0083 29.419C27.2318 29.5201 27.4735 29.575 27.7187 29.5803C27.964 29.5856 28.2078 29.5413 28.4355 29.4499C28.6631 29.3585 28.87 29.222 29.0435 29.0486C29.217 28.8752 29.3536 28.6684 29.4452 28.4408C29.5367 28.2132 29.5812 27.9695 29.5761 27.7242C29.5709 27.4789 29.5162 27.2372 29.4152 27.0137C29.3141 26.7901 29.1689 26.5893 28.9883 26.4233L28.9866 26.4217L22.5616 20Z"
                fill="#FF0000"
              />
            </g>
            <defs>
              <clipPath id="clip0_8991_13403">
                <rect width="40" height="40" fill="white" />
              </clipPath>
            </defs>
          </svg>
        )}
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove {member.name} from the team. This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-c-red hover:bg-c-red"
              onClick={() => onDelete(member.id)}
            >
              Delete Member
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
