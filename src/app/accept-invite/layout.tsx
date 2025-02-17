import AuthWrapper from "@/components/auth-wrapper";
import React from "react";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Accept Invite",
  description: "Create and manage jobs with oTask",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="sign-in-layout">
      <AuthWrapper>{children}</AuthWrapper>
    </div>
  );
};

export default Layout;
