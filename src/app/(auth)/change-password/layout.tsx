import AuthWrapper from "@/components/auth-wrapper";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Set new password",
  description: "Create and manage jobs with oTask",
};

const ChangePasswordLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <AuthWrapper>{children}</AuthWrapper>
    </div>
  );
};

export default ChangePasswordLayout;
