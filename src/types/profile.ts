/* eslint-disable @typescript-eslint/no-explicit-any */



interface Country {
    id: number;
    name: string;
    iso3: string;
    numeric_code: string;
    iso2: string;
    phonecode: string;
    capital: string;
    currency: string;
    currency_name: string;
    currency_symbol: string;
    tld: string;
    native: string;
    region: string;
    region_id: number;
    subregion: string;
    subregion_id: number;
    nationality: string;
    timezones: Timezone[];
    translations: Record<string, string>;
    latitude: string;
    longitude: string;
    emoji: string;
    emojiU: string;
    created_at: string;
    updated_at: string;
    flag: number;
    wikiDataId: string;
}

interface Timezone {
    zoneName: string;
    gmtOffset: number;
    gmtOffsetName: string;
    abbreviation: string;
    tzName: string;
}




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

interface CurrentSubscription {
    id: number;
    user_id: number;
    business_id: number;
    license_id: number;
    license: string;
    license_type: string | null;
    status: number;
    stripe_id: string;
    subscription_id: string;
    auto_renewal: number;
    amount: number;
    expires_at: string;
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
    business_country: Country
    wallet: {
        id: number
        business_id: number
        balance: number
        created_at: string
        updated_at: string
    }
    current_subscription: CurrentSubscription




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
    wallet: number

}

export interface ApiResponse {
    status: boolean;
    message: string;
    data: Profile;
    errors: any[];
}
