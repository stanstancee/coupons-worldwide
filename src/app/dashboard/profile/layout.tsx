import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coupons Worldwide | Profile",
  description: "Coupons Worldwide Dashboard",
  category: "Business & Finance",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default layout;
