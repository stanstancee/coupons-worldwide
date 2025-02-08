/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Campaign {
    id: number;
    title: string;
    views: number;
    grabs: number;
    redeemed: number;
    quantity: string;
    reviews: number;
    status: string;
    uid: string;
}

export interface PaginationLinks {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

export interface CampaignResponse {
    status: boolean;
    message: string;
    data: {
        campaigns: Campaign[];
        total: number;
        current_page: number;
        last_page: number;
        links: PaginationLinks;
    };
    errors: any[];
}

interface ICampaign {
    id: number;
    title: string;
    description: string;
    slug: string;
    currency: string;
    amount: number;
    minimum_amount: number;
    discount: number;
    valid_till: string;
    start_date: string;
    status: string;
    type: string;
    total_coupons: number;
    total_used: number;
    total_unused: number;
    activation_type: string;
    business_id: number;
    cover_image: string;
    uid: string;
    created_at: string;
    updated_at: string;
    claim_limit: number;
    claim_type: string;
}

export interface ICoupon {
    id: number;
    uid: string;
    code: string;
    first_name: string;
    last_name: string;
    date_grabbed: string;
    date_redeemed: string;
    redeem_status: string;
}

export interface ICampaignResponse {
    status: boolean;
    message: string;
    data: {
        campaign: ICampaign;
        coupons: ICoupon[];
        total: number;
        current_page: number;
        last_page: number;


    };
}


export interface ICampaignData {
    campaign: ICampaign;
    coupons: ICoupon[];
    total: number;
    current_page: number;
    last_page: number;
}
