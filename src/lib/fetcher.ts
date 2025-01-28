/* eslint-disable @typescript-eslint/no-explicit-any */
import { getApiUrl } from "../config/api"
import { decryptData } from "./crypto"

import Cookies from "js-cookie"


export const fetcher = async (url: string) => {
    const token = Cookies.get("auth_token")
    const decryptedToken = decryptData(token!)
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    }

    if (token) {
        headers["Authorization"] = `Bearer ${decryptedToken}`
    }


    const response = await fetch(getApiUrl(url), { headers })

    if (!response.ok) {
        const error = new Error("An error occurred while fetching the data.")
            // Attach extra info to the error object.
            ; (error as any).info = await response.json()
            ; (error as any).status = response.status
        throw error
    }

    return response.json()
}