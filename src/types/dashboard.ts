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
    promotion_spent: string;
    active_campaigns: number;
    coupon_value: string;
    coupons_redeemed: number;
    coupons_grabbed: number | null;
    total_followers: number;
    followers: Followers;
    campaigns: Campaign[];
    promotions: Promotions;
    recent_promotions: RecentPromotions[];
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

interface RecentPromotions {
    id: number;
    status: string;
    total_amount: string;
    approval_status: string;
    start_date: string;
    end_date: string;
    duration: string;
    uid: string;
    promotion_type_id: number;
    promotion_channel_id: number;
    business_id: number;
    campaign_id: number;
    created_at: string;
    updated_at: string;
}
    











