import AuthWrapper from "@/components/auth-wrapper";
import React from "react";

const SignUpInLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="sign-in-layout">
      <AuthWrapper>{children}</AuthWrapper>
    </div>
  );
};

export default SignUpInLayout;
