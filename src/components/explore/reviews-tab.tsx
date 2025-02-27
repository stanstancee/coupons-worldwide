import { Star } from "lucide-react"

type Review = {
  id: string
  productName: string
  description: string
  rating: number
  date: string
  reviewer: string
}

export default function ReviewsTab() {
  const reviews: Review[] = [
    {
      id: "1",
      productName: "ZARA Perfume Tobacco series 200ml",
      description: "Great packaging, amazing perfume now!",
      rating: 5,
      date: "14 Dec 2022",
      reviewer: "Kenneth Charles",
    },
    {
      id: "2",
      productName: "ZARA Perfume Tobacco series 200ml",
      description: "Great packaging, amazing perfume now!",
      rating: 4,
      date: "10 Dec 2022",
      reviewer: "Kenneth Charles",
    },
    {
      id: "3",
      productName: "ZARA Perfume Tobacco series 200ml",
      description: "Great packaging, amazing perfume now!",
      rating: 5,
      date: "14 Nov 2022",
      reviewer: "Kenneth Charles",
    },
  ]

  return (
    <div className="p-4">
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-4">
            <h3 className="font-medium text-sm">{review.productName}</h3>
            <p className="text-xs text-gray-500 mt-1">{review.description}</p>

            <div className="flex items-center mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500">{review.reviewer}</span>
              <span className="text-xs text-gray-500">{review.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

