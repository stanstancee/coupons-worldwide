export interface Campaign {
  id: string
  name: string
  views: number
  grabs: number
  redeemed: number
  quantity: {
    used: number
    total: number
  }
  reviews: number
  status: "Active" | "Closed"
}

class CampaignService {
  private static instance: CampaignService
  private campaigns: Campaign[]

  private constructor() {
    // Initialize with mock data
    this.campaigns = [
      {
        id: "1",
        name: "Christmas Special Sales and Discounts",
        views: 189000,
        grabs: 9000,
        redeemed: 6200,
        quantity: { used: 850, total: 2000 },
        reviews: 850,
        status: "Active",
      },
      {
        id: "2",
        name: "Tops and Gowns discount sale",
        views: 287000,
        grabs: 15000,
        redeemed: 452,
        quantity: { used: 850, total: 2000 },
        reviews: 400,
        status: "Active",
      },
      {
        id: "3",
        name: "Online only Trouser sales and discounts",
        views: 156000,
        grabs: 12000,
        redeemed: 9100,
        quantity: { used: 850, total: 2000 },
        reviews: 1250,
        status: "Closed",
      },
      {
        id: "4",
        name: "Summer Collection Launch",
        views: 234000,
        grabs: 18000,
        redeemed: 7800,
        quantity: { used: 780, total: 2000 },
        reviews: 920,
        status: "Active",
      },
      {
        id: "5",
        name: "Weekend Flash Sale",
        views: 145000,
        grabs: 8500,
        redeemed: 4200,
        quantity: { used: 420, total: 1000 },
        reviews: 380,
        status: "Closed",
      },
      {
        id: "6",
        name: "Accessories Clearance",
        views: 98000,
        grabs: 5600,
        redeemed: 2800,
        quantity: { used: 280, total: 1500 },
        reviews: 310,
        status: "Active",
      },
      {
        id: "7",
        name: "Winter Wear Collection",
        views: 178000,
        grabs: 11200,
        redeemed: 5900,
        quantity: { used: 590, total: 1800 },
        reviews: 680,
        status: "Active",
      },
      {
        id: "8",
        name: "Designer Bags Special",
        views: 167000,
        grabs: 9800,
        redeemed: 4100,
        quantity: { used: 410, total: 1200 },
        reviews: 450,
        status: "Closed",
      },
      {
        id: "9",
        name: "Footwear Bonanza",
        views: 198000,
        grabs: 13400,
        redeemed: 6700,
        quantity: { used: 670, total: 2000 },
        reviews: 730,
        status: "Active",
      },
      {
        id: "10",
        name: "Kids Fashion Week",
        views: 145000,
        grabs: 8900,
        redeemed: 4500,
        quantity: { used: 450, total: 1500 },
        reviews: 520,
        status: "Active",
      },
      {
        id: "11",
        name: "Sports Wear Discount",
        views: 134000,
        grabs: 7800,
        redeemed: 3900,
        quantity: { used: 390, total: 1200 },
        reviews: 410,
        status: "Closed",
      },
      {
        id: "12",
        name: "Beauty Products Sale",
        views: 223000,
        grabs: 16700,
        redeemed: 8300,
        quantity: { used: 830, total: 2500 },
        reviews: 890,
        status: "Active",
      },
      {
        id: "13",
        name: "Home Decor Special",
        views: 112000,
        grabs: 6500,
        redeemed: 3200,
        quantity: { used: 320, total: 1000 },
        reviews: 280,
        status: "Active",
      },
      {
        id: "14",
        name: "Electronics Mega Sale",
        views: 289000,
        grabs: 19800,
        redeemed: 9900,
        quantity: { used: 990, total: 3000 },
        reviews: 1100,
        status: "Active",
      },
      {
        id: "15",
        name: "Jewelry Collection",
        views: 156000,
        grabs: 9200,
        redeemed: 4600,
        quantity: { used: 460, total: 1500 },
        reviews: 510,
        status: "Closed",
      },
      {
        id: "16",
        name: "Back to School Sale",
        views: 178000,
        grabs: 12300,
        redeemed: 6100,
        quantity: { used: 610, total: 2000 },
        reviews: 670,
        status: "Active",
      },
      {
        id: "17",
        name: "Fitness Equipment Deals",
        views: 134000,
        grabs: 7900,
        redeemed: 3900,
        quantity: { used: 390, total: 1200 },
        reviews: 420,
        status: "Active",
      },
      {
        id: "18",
        name: "Kitchen Essentials",
        views: 145000,
        grabs: 8800,
        redeemed: 4400,
        quantity: { used: 440, total: 1500 },
        reviews: 480,
        status: "Closed",
      },
      {
        id: "19",
        name: "Travel Accessories",
        views: 167000,
        grabs: 10200,
        redeemed: 5100,
        quantity: { used: 510, total: 1800 },
        reviews: 560,
        status: "Active",
      },
      {
        id: "20",
        name: "Pet Supplies Discount",
        views: 123000,
        grabs: 7100,
        redeemed: 3500,
        quantity: { used: 350, total: 1200 },
        reviews: 390,
        status: "Active",
      },
    ]
  }

  public static getInstance(): CampaignService {
    if (!CampaignService.instance) {
      CampaignService.instance = new CampaignService()
    }
    return CampaignService.instance
  }

  public getCampaigns(): Campaign[] {
    return this.campaigns
  }
}

export const campaignService = CampaignService.getInstance()

