'use server'

import { fetchWithAuthFormData, } from ".";



const updateProfileAction = async (data: FormData) => {
    const response = await fetchWithAuthFormData("profile/update", data, 'POST', 'profile');
    return response;
}

export { updateProfileAction }