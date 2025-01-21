import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confirm OTP",
  description: "Create and manage jobs with oTask",
};

const ConfirmOTPLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
     {children}
    </div>
  );
};

export default ConfirmOTPLayout;
