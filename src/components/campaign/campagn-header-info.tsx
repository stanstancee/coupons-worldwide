"use client";

import { useDashboard } from "@/context/dashboard-context";
import { Button } from "../ui/button";
import Link from "next/link";

export function formatDate(value: string): string {
  const date = new Date(value);
  return date
    .toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "UTC",
    })
    .replace(",", "")
    .replace(" at", "");
}

const CampaignHeaderInfo = () => {    
  const { campaignDetails } = useDashboard();
  return (
    <header className="flex items-center md:justify-between gap-4 flex-wrap md:flex-nowrap p-4 md:p-6 shadow-cards bg-white rounded-[10px]">
      <div className="space-y-1">
        <article className="flex items-center gap-4 md:gap-8 flex-wrap md:flex-nowrap">
          <h1 className="text-xl font-bold ">Insights for Campaign</h1>
          <h1 className="text-[#1D1B23] text-sm font-normal">
            Status:
            <strong className="uppercase">
              {campaignDetails?.campaign?.status || ""}{" "}
            </strong>{" "}
            - {formatDate(campaignDetails?.campaign?.updated_at || "")}
          </h1>
        </article>
        <p className="text-[#717579]">{campaignDetails?.campaign?.title}</p>
      </div>
      <Link href="/dashboard/promote/create">
        <Button className="shadow-btn text-c-green bg-white hover:bg-slate-50 py-[17px] font-bold h-[50px]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.7105 17.2993C13.6876 17.2993 13.6646 17.2985 13.6415 17.297C13.2106 17.2693 12.8441 16.9861 12.7078 16.5755L10.5181 9.95412L8.66334 14.3325C8.50903 14.6969 8.16839 14.9426 7.77445 14.9735C7.38033 15.0042 7.00613 14.8151 6.79692 14.4795L4.78969 11.2677C4.48786 10.7847 4.63467 10.1486 5.11767 9.84673C5.60063 9.54495 6.23686 9.69167 6.53873 10.1747L7.51973 11.7444L9.66291 6.6852C9.8333 6.28283 10.2404 6.02445 10.6769 6.0418C11.1131 6.05942 11.4986 6.35033 11.636 6.76559L13.884 13.5633L15.4497 10.3197C15.653 9.91531 16.0667 9.6688 16.5134 9.68295L18.81 9.71281C19.3795 9.72022 19.8352 10.1879 19.8278 10.7574C19.8204 11.3268 19.3524 11.7829 18.7832 11.7751L17.048 11.7526L14.6592 16.7022C14.4818 17.0702 14.1145 17.2993 13.7105 17.2993ZM12.802 15.8052C12.8018 15.8055 12.8016 15.8059 12.8015 15.8062L12.802 15.8052ZM8.54545 13.3856L8.54663 13.3875C8.54625 13.3869 8.54583 13.3863 8.54545 13.3856ZM19.4601 20.2624C19.4601 19.6929 18.9984 19.2312 18.4289 19.2312H5.57114C3.63647 19.2312 2.0625 17.6579 2.0625 15.7242V7.56941C2.0625 5.63567 3.63647 4.0625 5.57114 4.0625H18.4289C20.3635 4.0625 21.9375 5.63572 21.9375 7.56941V15.7242C21.9375 16.1592 21.8591 16.5831 21.7045 16.9843C21.4997 17.5158 21.7645 18.1126 22.2959 18.3174C22.8276 18.5223 23.4242 18.2574 23.629 17.726C23.8751 17.0872 24 16.4137 24 15.7242V7.56941C24 4.49839 21.5008 2 18.4288 2H5.57114C2.49919 1.99995 0 4.49839 0 7.56936V15.7242C0 18.7952 2.49919 21.2937 5.57114 21.2937H18.4289C18.9984 21.2937 19.4601 20.8319 19.4601 20.2624Z"
              fill="#44CA82"
            />
            <path
              d="M21.4219 20.9395C21.9914 20.9395 22.4531 20.4778 22.4531 19.9083C22.4531 19.3387 21.9914 18.877 21.4219 18.877C20.8523 18.877 20.3906 19.3387 20.3906 19.9083C20.3906 20.4778 20.8523 20.9395 21.4219 20.9395Z"
              fill="#44CA82"
            />
          </svg>
          Promote Coupon
        </Button>
      </Link>
    </header>
  );
};

export default CampaignHeaderInfo;
