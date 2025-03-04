export interface Currency {
    id: number;
    name: string;
    symbol: string;
    code: string;
    status: number;
    created_at: string;
    updated_at: string;
}

export interface Plan {
    id: number;
    plan: string;
    amount: number;
    payment_channel: string;
    expires: string;
    status: string;
    auto_renewal: string;
    date: string;
    created_at: string;
    updated_at: string;
}
   



 