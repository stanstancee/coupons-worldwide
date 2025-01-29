'use server'
import { unAuthenticatedFetchWithFormData } from "."

const signUpAction = async (formData: FormData) => {
    const response = await unAuthenticatedFetchWithFormData("auth/register", formData);
    return response;

}

const signInAction = async (formData: FormData) => {
    const response = await unAuthenticatedFetchWithFormData("auth/login", formData);
    return response;

}

const forgotPasswordAction = async (formData: FormData) => {
    const response = await unAuthenticatedFetchWithFormData("auth/forgot-password", formData);
    return response;

}
export { signUpAction, signInAction, forgotPasswordAction }