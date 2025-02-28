interface Currency {
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
    name: string;
    duration_days: number;
    price: string;
    description: string;
    status: number;
    license_type: string;
    gateway: string;
    stripe_id: string;
    currency_id: number;
    created_at: string;
    updated_at: string;
    currency: Currency;
}
 