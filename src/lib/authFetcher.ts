/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";
import { decryptData } from "@/lib/crypto";
import { getApiUrl } from "@/config/api";

export type FetcherOptions = {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    data?: any;
    headers?: Record<string, string>;
};

export const authFetcher = async (url: string, options?: FetcherOptions) => {
    const token = Cookies.get("token");
    const decryptedToken = token ? decryptData(token) : null;

    const defaultHeaders: Record<string, string> = {
        "Content-Type": "application/json",
    };

    // Remove Content-Type for FormData
    if (options?.data instanceof FormData) {
        delete defaultHeaders["Content-Type"];
    }

    const response = await fetch(getApiUrl(url), {
        method: options?.method || "GET",
        headers: {
            ...defaultHeaders,
            ...(decryptedToken ? { Authorization: `Bearer ${decryptedToken}` } : {}),
            ...(options?.headers || {}),
        },
        body: options?.data
            ? options.data instanceof FormData
                ? options.data
                : JSON.stringify(options.data)
            : undefined,
    });

    if (!response.ok) {
        const error = new Error("Failed to fetch data");
        (error as any).status = response.status;
        (error as any).info = await response.json();
        throw error;
    }

    return response.json();
};
