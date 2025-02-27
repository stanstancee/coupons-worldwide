"use client"

import { useState } from "react"

import BusinessHeader from "@/components/explore/business-header"
import TabNavigation from "@/components/explore/tab-navigation"
import CouponsTab from "./coupons-tab"
import AboutTab from "./about-tab"
import ReviewsTab from "./reviews-tab"
import EmptyState from "@/components/explore/empty-state"

type Tab = "coupons" | "about" | "reviews"

export default function BusinessExplore() {
  const [activeTab, setActiveTab] = useState<Tab>("about")
  const [showEmptyState, setShowEmptyState] = useState(false)

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
    // For demo purposes, show empty states for reviews and coupons when toggled twice
    if ((tab === "reviews" || tab === "coupons") && activeTab === tab) {
      setShowEmptyState(!showEmptyState)
    } else {
      setShowEmptyState(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg overflow-hidden shadow">




      {/* Business Header */}
      <BusinessHeader />

      {/* Tab Navigation */}
      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Tab Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === "coupons" && !showEmptyState && <CouponsTab />}
        {activeTab === "coupons" && showEmptyState && (
          <EmptyState
            title="No Coupons"
            description="This restaurant doesn't have any coupons. Check back later."
            type="coupons"
          />
        )}
        {activeTab === "about" && <AboutTab />}
        {activeTab === "reviews" && !showEmptyState && <ReviewsTab />}
        {activeTab === "reviews" && showEmptyState && (
          <EmptyState title="No Reviews" description="Restaurant doesn't have any reviews yet." type="reviews" />
        )}
      </div>
    </div>
  )
}

