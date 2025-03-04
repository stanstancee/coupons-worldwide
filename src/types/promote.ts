/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Promotion {
    id: number;
    total_amount: string;
    start_date: string;
    end_date: string;
    slots: string;
    status: string;
    promotion_type: string;
    display_space: string;
    campaign: string;
  }
  
  interface Links {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  }
  
  export interface PromotionData {
    total_promotion_amount: number;
    active_promotions_count: number;
    total_promotion_count: number;
    total_spent: number;
    wallet_balance: number;
    promotions: Promotion[];
    total: number;
    current_page: number;
    last_page: number;
    links: Links;
  }
  
  export interface PromotionResponse {
    status: boolean;
    message: string;
    data: PromotionData;
    errors: any[];
  }


  