/* eslint-disable @typescript-eslint/no-explicit-any */
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
    const response = await unAuthenticatedFetchWithFormData("auth/forgot_password", formData);
    return response;

}

const changePasswordAction = async (formData: FormData) => {
    const response = await unAuthenticatedFetchWithFormData("auth/reset_password", formData);
    return response;

}


const verifyAction = async (data: FormData) => {

    const response = await unAuthenticatedFetchWithFormData("auth/verify_password_otp", data);
    return response;

}





const resendOTP = async (data: any) => {


    const response = await fetch(`${URL}/v1/auth/resend_otp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(data),

    });

    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
        const res = await response.json();

        return res;
    }
};
export { signUpAction, signInAction, forgotPasswordAction, resendOTP, verifyAction  , changePasswordAction}