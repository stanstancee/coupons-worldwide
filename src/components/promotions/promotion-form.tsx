"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PartyPopper } from "lucide-react"
import { promotionSchema, type PromotionFormData } from "@/lib/schema"
import { PromotionPreview } from "./promotion-preview"
import { Dialog, DialogContent, DialogHeader,  DialogTitle } from "../ui/dialog"

const COST_PER_DAY = 10

const durationOptions = [

  { value: "7", label: "7 days" },
  { value: "14", label: "14 days" },
  { value: "30", label: "30 days" },
  { value: "90", label: "90 days" },
  { value: "180", label: "180 days" },
  { value: "365", label: "365 days" },
]

export function PromotionForm({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (value: boolean) => void }) {
  const [showSuccess, setShowSuccess] = useState(false)
  const form = useForm<PromotionFormData>({
    resolver: zodResolver(promotionSchema),
    defaultValues: {
      promotionType: "store",
      adChannel: "featured",
      duration: "7", 
    },
  })

  const formData = form.watch()
  const duration = Number.parseInt(formData.duration)
  const totalCost = duration * COST_PER_DAY

  async function onSubmit(data: PromotionFormData) {
    console.log(data)
    setShowSuccess(true)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} >


     
      <DialogContent className="lg:max-w-[1200px]">
      <DialogHeader>
        <DialogTitle className="mb-8 xl:text-2xl">Create Promotion</DialogTitle>
       
      </DialogHeader>
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="promotionType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#515B6F] font-semibold text-base">Promotion Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-none h-[48px] text-[#515B6F]">
                            <SelectValue placeholder="Select promotion type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="campaign">Campaign</SelectItem>
                          <SelectItem value="store">Store</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {formData.promotionType === "campaign" && (
                  <FormField
                    control={form.control}
                    name="campaignId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#515B6F] font-semibold text-base">Campaign</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-none h-[48px] text-[#515B6F]">
                              <SelectValue placeholder="Select campaign" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">Summer Sale</SelectItem>
                            <SelectItem value="2">Winter Collection</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="adChannel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#515B6F] font-semibold text-base">Ad Channel</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-none h-[48px] text-[#515B6F]">
                            <SelectValue placeholder="Select ad channel" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="featured">Featured</SelectItem>
                          <SelectItem value="promoted">Promoted</SelectItem>
                          <SelectItem value="popular">Popular</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#515B6F] font-semibold text-base">Duration</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-none h-[48px] text-[#515B6F]">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {durationOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="rounded-lg bg-muted p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Cost per day:</span>
                      <span>${COST_PER_DAY}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total cost:</span>
                      <span>${totalCost}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Duration:</span>
                      <span>{duration} days</span>
                    </div>
                  </div>
                </div>

                <Button type="submit" size={'lg'} className="w-full">
                  Run Ads
                </Button>
              </form>
            </Form>
          </div>

          <div className="order-first lg:order-last">
            <PromotionPreview data={formData} />
          </div>

          {showSuccess && (
            <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
              <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="rounded-full bg-green-100 p-3">
                    <PartyPopper className="h-6 w-6 text-green-600" />
                  </div>
                  <h2 className="text-lg font-semibold">Ad submitted successfully!</h2>
                  <p className="text-muted-foreground">Your Ads will start running once approved</p>
                  <Button className="h-[40px]" onClick={() => setShowSuccess(false)}>Close</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog >
  )
}

