'use server'

import { fetchWithAuthFormData, fetchWithAuth } from ".";

interface PublishCampaignData {
    uid: string;
}

const createCampaignAction = async (data: FormData) => {
    const response = await fetchWithAuthFormData("business/campaign/create", data, 'POST', 'campaigns');
    return response;
}

const publishCampaignAction = async (data: PublishCampaignData) => {
    const response = await fetchWithAuth("business/campaign/publish", data, 'POST', 'campaigns');
    return response;
}

const editImagesAction = async (data: FormData) => {
    const response = await fetchWithAuthFormData("business/campaign/edit-media", data, 'POST', 'campaigns');
    return response;
}

const editCampaignAction = async (data: FormData) => {
    const response = await fetchWithAuthFormData("business/campaign/edit", data, 'POST', 'campaigns');
    return response;
}

export { createCampaignAction, publishCampaignAction  , editCampaignAction  , editImagesAction };   