/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";




const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const VERSION = 'v1'

import { decryptData } from "@/lib/crypto";

const fetchWithAuthFormData = async (
  url: string,
  data: FormData,
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  tag?: string
) => {
  const token = (await cookies()).get("token")?.value;

  const response = await fetch(`${API_URL}/${VERSION}/${url}`, {
    method: method || "POST",
    headers: {
      Authorization: `Bearer ${decryptData(token || "")}`,
      Accept: "application/json",
    },
    body: data,
  });


  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    const responseData = await response.json();
    if (tag) {
      revalidateTag(tag);
    }
    return responseData;
  } else {
    return {
      message: "An error occurred, please try again.",
      status: false,
    };
  }
};

const fetchWithAuth = async (
  url: string,
  data: FormData | any,
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  tag?: string
) => {
  const token = (await cookies()).get("token")?.value;

  const response = await fetch(`${API_URL}/${VERSION}/${url}`, {
    method: method || "POST",

    headers: {
      Authorization: `Bearer ${decryptData(token || "")}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });



  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    const responseData = await response.json();

    if (tag) {
      revalidateTag(tag);
    }

    return responseData;
  } else {
    return {
      message: "An error occurred, please try again.",
      status: false,
    };
  }
};

const fetchWithAuthFormURLData = async (
  url: string,
  data: FormData,
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  tag?: string
) => {
  const token = (await cookies()).get("token")?.value;
  const input = new URLSearchParams();

  for (const [key, value] of data.entries()) {
    input.append(key, value as string);
  }

  const response = await fetch(`${API_URL}/${VERSION}/${url}`, {
    method: method || "POST",
    headers: {
      Authorization: `Bearer ${decryptData(token || "")}`,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: input.toString(),
  });


  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    const responseData = await response.json();
    if (tag) {
      revalidateTag(tag);
    }
    return responseData;
  } else {
    return {
      message: "An error occurred, please try again.",
      status: false,
    };
  }
};

const UpdateFormData = async (
  url: string,
  data: FormData,
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  tag?: string
) => {
  const token = (await cookies()).get("token")?.value;
  const input = new FormData();

  for (const [key, value] of data.entries()) {
    if (value) input.append(key, value as string);
  }
  input.append("_method", method || "POST".toLowerCase());

  const response = await fetch(`${API_URL}/${VERSION}/${url}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${decryptData(token || "")}`,
      Accept: "application/json",
    },
    body: input,
  });


  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    const responseData = await response.json();
    if (tag) {
      revalidateTag(tag);
    }
    return responseData;
  } else {
    return {
      message: "An error occurred, please try again.",
      status: false,
    };
  }
};


const unAuthenticatedFetch = async (
  url: string,
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  data?: any
) => {
  const response = await fetch(`${API_URL}/${VERSION}/${url}`, {
    method: method || "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify(data),

  });
  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    const responseData = await response.json();

    return responseData;
  }
}




const unAuthenticatedFetchWithFormData = async (
  url: string,
  data: FormData,
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",

) => {
  const response = await fetch(`${API_URL}/${VERSION}/${url}`, {
    method: method || "POST",
    headers: {
      Accept: "application/json",
    },
    body: data,
  });

  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    const responseData = await response.json();

    return responseData;
  } else {
    return {
      message: "An error occurred, please try again.",
      status: false,
    };
  }
};










export {
  unAuthenticatedFetchWithFormData,
  fetchWithAuthFormData,
  fetchWithAuth,
  unAuthenticatedFetch,
  fetchWithAuthFormURLData,
  UpdateFormData,
};
