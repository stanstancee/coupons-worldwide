/* eslint-disable @typescript-eslint/no-explicit-any */







  interface SecuritySetting {
    uid: string;
    user_uid: string;
    finger_print: string;
    face_recognition: string;
    created_at: string;
    updated_at: string;
}

interface NotificationSetting {
    uid: string;
    user_uid: string;
    general: string;
    follow_store: string;
    created_at: string;
    updated_at: string;
}

interface AddressJson {
    address: string;
    lat: number;
    lng: number;
    url: string;
    place_id: string;
}


export interface Asset {
    id: number;
    uid: string;
    business_id: number;
    asset_path: string;
    created_at: string;
    updated_at: string;
  }
export interface Business {
    id: number;
    uid: string;
    user_id: number;
    name: string;
    company_size: string;
    country: string;
    city: string;
    state: string;
    address: string;
    phone: string;
    website: string | null;
    email: string;
    about: string;
    logo: string | null;
    slug: string;
    primary_industry: string | null;
    secondary_industry: string | null;
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
    address_json: AddressJson;
    url: string;
    qr_code: string;
    created_at: string;
    updated_at: string;
    youtube: string | null
    assets: Asset[]
}

export interface Profile {
    uid: string;
    first_name: string;
    last_name: string;
    email: string;
    email_verified_at: string;
    profile_image: string | null;
    account_type: string;
    username: string;
    is_verified: number;
    is_onboarded: boolean;
    country: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    security_setting: SecuritySetting;
    notification_setting: NotificationSetting;
    businesses: Business[];
    gender: string;
}

export interface ApiResponse {
    status: boolean;
    message: string;
    data: Profile;
    errors: any[];
}
