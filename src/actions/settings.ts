'use server'

import { fetchWithAuthFormData, fetchWithAuth } from ".";

const updateBasicAction = async (data: FormData) => {
    const response = await fetchWithAuthFormData("business/edit", data, 'POST', 'profile');
    return response;
}

const updateSocialAction = async (data: FormData) => {
    const response = await fetchWithAuthFormData("business/edit-socials", data, 'POST', 'profile');
    return response;
}

const updateMediaAction = async (data: FormData) => {
    const response = await fetchWithAuthFormData("business/edit-media", data, 'POST', '');
    return response;
}

const removeMediaAction = async (data: {
    business_uid: string;
    asset_uid: string;
}) => {
    const response = await fetchWithAuth("business/remove-media", data, 'POST', 'profile');
    return response;
}

export { updateBasicAction, updateSocialAction, updateMediaAction, removeMediaAction }  