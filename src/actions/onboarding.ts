'use server'

import { fetchWithAuthFormData } from ".";



const onboardBusinessAction = async (data: FormData) => {
    const response = await fetchWithAuthFormData("business/onboard", data);
    return response;
}

const uploadFilesAction = async (data: FormData) => {
    const response = await fetchWithAuthFormData("business/onboard-media", data);
    return response;
}

export { onboardBusinessAction, uploadFilesAction }