/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

const URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export const verifyAction = async (data: {
  email: string | null;
  otp: string | null;
}) => {


  const response = await fetch(`${URL}/v1/auth/verify_otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    const res = await response.json();

    return res;
  }
};


export const resendOTP = async (data : any) => {


  const response = await fetch(`${URL}/v1/auth/resend_otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  
  });

  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    const res = await response.json();

    return res;
  }
};

