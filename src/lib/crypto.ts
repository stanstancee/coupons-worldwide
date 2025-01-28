import CryptoJS from 'crypto-js';



const secretKey = process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY as string

if (!secretKey) {
    throw new Error('NEXT_PUBLIC_CRYPTO_SECRET_KEY is not defined');
}

function encryptData(data: string): string {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
}


function decryptData(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}


export { encryptData, decryptData }