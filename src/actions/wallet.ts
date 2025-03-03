'use server'


import { fetchWithAuthFormData } from ".";


const fundWalletAction = async (data: FormData) => {
    const response = await fetchWithAuthFormData("payment/fund-wallet", data, 'POST', 'wallet');
    return response;
}



export { fundWalletAction };