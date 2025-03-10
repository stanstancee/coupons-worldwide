/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DashboardResponse {
    status: boolean;
    message: string;
    data: {
        business: DashboardBusiness;
    };
    errors: any[];
}



export interface DashboardBusiness {
    id: number;
    uid: string;
    name: string;
    total_campaigns: number;
    active_campaigns: number;
    coupon_value: string;
    coupons_redeemed: number;
    coupons_grabbed: number | null;
    total_followers: number;
    followers: Followers;
    campaigns: Campaign[];
    promotions: Promotions;
}


interface Campaign {
    id: number;
    title: string;
    total_reviews: number;
    analytics: Analytics[];
    coupons: Coupon[];
}

interface Analytics {
    campaign_id: number;
    total_views: number;
}

interface Coupon {
    campaign_id: number;
    total_grabs: string;
    total_redeemed: string;
}

interface Promotions {
    active: string;
    pending: string;
    expired: string;
}


interface Followers {
    avg_monthly: string;
    last_7_months: MonthlyFollowers[];
}


interface MonthlyFollowers {
    year: number;
    month: number;
    total_followers: number;
}










