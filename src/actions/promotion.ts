'use server'

import { fetchWithAuth } from ".";


// {
//     "total_amount": 900.00,
//     "start_date": "2025-03-01 10:00:00",
//     "end_date": "2025-03-10 23:59:59",
//     "promotion_type_id": 1,
//     "promotion_channel_id": 1,
//     "business_uid": "dbb29d02-dd5b-11ef-a847-f0d5bfa19b80",
//     "campaign_uid": "0bc04fb9-e30e-11ef-999b-f0d5bfa19b80"
//   }

interface RunPromotionData {
    total_amount: number;
    start_date: string;
    end_date: string;
    promotion_type_id: number;
    promotion_channel_id: number;
    business_uid: string;
    campaign_uid: string;
}

const runPromotionAction = async (data: RunPromotionData) => {
    const response = await fetchWithAuth("business/promotion/new", data, 'POST', 'promotion');
    return response;
}


export { runPromotionAction };