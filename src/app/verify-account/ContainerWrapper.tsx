/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { encryptData } from "@/lib/crypto";

const ContainerWrapper = ({
  children,
  token,
  user,
}: {
  children: React.ReactNode;
  user: any;
  token: string;
}) => {
  const router = useRouter();
  useEffect(() => {
    Cookies.set("token", encryptData(token));
    Cookies.set("user", JSON.stringify(user));
  }, [token, user, router]);
  return <div>{children}</div>;
};

export default ContainerWrapper;
