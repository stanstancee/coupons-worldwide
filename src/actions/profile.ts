'use server'

import { fetchWithAuthFormData, fetchWithAuth } from ".";



const updateProfileAction = async (data: FormData) => {
    const response = await fetchWithAuthFormData("profile/update", data, 'POST', 'profile');
    return response;
}


const updatePasswordAction = async (data: {
    password: string;
    password_confirmation: string;
}) => {
    const response = await fetchWithAuth("profile/change-password", data, 'PUT', 'profile');
    return response;
}

export { updateProfileAction, updatePasswordAction }