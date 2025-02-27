import { useState } from "react"
import { Clock, ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type CouponItem = {
  id: string
  title: string
  image: string
  isNew: boolean
  expiresIn: string
}

export default function CouponsTab() {
  const [coupons] = useState<CouponItem[]>([
    {
      id: "1",
      title: "Whopper Burger Down",
      image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=200&auto=format&fit=crop",
      isNew: true,
      expiresIn: "2d",
    },
    {
      id: "2",
      title: "Medium Fries Down",
      image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=200&auto=format&fit=crop",
      isNew: false,
      expiresIn: "5d",
    },
    {
      id: "3",
      title: "Chicken Sandwich Down",
      image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=200&auto=format&fit=crop",
      isNew: true,
      expiresIn: "1d",
    },
    {
      id: "4",
      title: "Onion Rings Down",
      image: "https://images.unsplash.com/photo-1619881590738-a111d176d906?q=80&w=200&auto=format&fit=crop",
      isNew: false,
      expiresIn: "3d",
    },
  ])

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold">Active</h3>
        <ChevronDown className="h-5 w-5" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {coupons.map((coupon) => (
          <div key={coupon.id} className="border rounded-lg overflow-hidden bg-white">
            {coupon.isNew && <Badge className="absolute m-2 bg-red-500">New</Badge>}
            <div className="relative h-24">
              <img src={coupon.image || "/placeholder.svg"} alt={coupon.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-2">
              <div className="flex items-center text-xs text-gray-500 mb-1">
                <Clock className="h-3 w-3 mr-1" />
                <span>{coupon.expiresIn}</span>
              </div>
              <p className="text-sm font-medium truncate">{coupon.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

