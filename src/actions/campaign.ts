'use server'

import { fetchWithAuthFormData } from ".";


const createCampaignAction = async (data: FormData) => {
    const response = await fetchWithAuthFormData("business/campaign/create", data, 'POST', 'campaign');
    return response;
}



export { createCampaignAction };   