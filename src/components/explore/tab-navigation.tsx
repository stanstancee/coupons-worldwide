import { Ticket, Info, MessageSquare } from "lucide-react"

type TabProps = {
  activeTab: string
  onTabChange: (tab: "coupons" | "about" | "reviews") => void
}

export default function TabNavigation({ activeTab, onTabChange }: TabProps) {
  return (
    <div className="flex border-b">
      <button
        className={`flex items-center justify-center py-3 flex-1 ${
          activeTab === "coupons" ? "border-b-2 border-black" : ""
        }`}
        onClick={() => onTabChange("coupons")}
      >
        <Ticket className="h-4 w-4 mr-2" />
        <span className="text-sm">Coupons</span>
      </button>
      <button
        className={`flex items-center justify-center py-3 flex-1 ${
          activeTab === "about" ? "border-b-2 border-black" : ""
        }`}
        onClick={() => onTabChange("about")}
      >
        <Info className="h-4 w-4 mr-2" />
        <span className="text-sm">About</span>
      </button>
      <button
        className={`flex items-center justify-center py-3 flex-1 ${
          activeTab === "reviews" ? "border-b-2 border-black" : ""
        }`}
        onClick={() => onTabChange("reviews")}
      >
        <MessageSquare className="h-4 w-4 mr-2" />
        <span className="text-sm">Reviews</span>
      </button>
    </div>
  )
}

