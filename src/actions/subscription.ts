'use server'



import { fetchWithAuthFormData, } from ".";

export const updateSubscriptionAction = async (data: FormData) => {
    const response = await fetchWithAuthFormData("subscription/subscribe", data, 'POST', 'subscription');
    return response;
}



