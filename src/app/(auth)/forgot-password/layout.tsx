import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Create and manage jobs with oTask",
};

const ForgotPasswordLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <>{children}</>
    </div>
  );
};

export default ForgotPasswordLayout;
