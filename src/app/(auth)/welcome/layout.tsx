import React from "react";
import { Metadata } from "next";
import AuthWrapper from "@/components/auth-wrapper";

export const metadata: Metadata = {
  title: "Welcome to oTask",
  description: "Create and manage jobs with oTask",
};

export default function WelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="welcome-layout">
      <AuthWrapper>{children}</AuthWrapper>
    </div>
  );
}
