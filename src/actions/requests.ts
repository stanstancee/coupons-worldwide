/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { cookies } from "next/headers";
import { decryptData } from "@/lib/crypto";


const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const VERSION = 'v1'







const getRequest = async ({
    url,
    tags,
    revalidate,
}: {
    url: string;
    tags?: string[];
    revalidate?: number;
}) => {
    let token = (await cookies()).get("token")?.value;
token = decryptData(token || "");

    try {
        const response = await fetch(`${API_URL}/${VERSION}/${url}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
            next: {
                revalidate: revalidate,
                tags,
            },
        });

        if (response?.status) {
            return response.json()
        }


    } catch (error: any) {
        return {
            message: error.message || "An error occurred, please try again.",
            status: false,
        }

    }



}

export { getRequest }