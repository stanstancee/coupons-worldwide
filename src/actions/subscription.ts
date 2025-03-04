'use server'



import { fetchWithAuthFormData, fetchWithAuth } from ".";


interface SubscriptionPayload {
    subscription_id: string;
    business_uid: string;
}

export const updateSubscriptionAction = async (data: FormData) => {
    const response = await fetchWithAuthFormData("subscription/subscribe", data, 'POST', 'subscription');
    return response;
}


export const cancelSubscriptionAction = async (data: SubscriptionPayload) => {
    const response = await fetchWithAuth("subscription/cancel", data, 'POST', 'subscription');
    return response;
}


