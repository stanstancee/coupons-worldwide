import React from "react";
import { ProfileRegWrapper } from "@/components/auth-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create company's profile",
  description: "Create and manage jobs with oTask",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <ProfileRegWrapper>{children}</ProfileRegWrapper>
    </div>
  );
}
