import { FileText, ShoppingBag } from "lucide-react"

type EmptyStateProps = {
  title: string
  description: string
  type: "reviews" | "coupons"
}

export default function EmptyState({ title, description, type }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 h-64">
      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        {type === "reviews" ? (
          <FileText className="h-6 w-6 text-gray-400" />
        ) : (
          <ShoppingBag className="h-6 w-6 text-gray-400" />
        )}
      </div>
      <h3 className="text-lg font-medium mb-1">{title}</h3>
      <p className="text-sm text-gray-500 text-center">{description}</p>
    </div>
  )
}

