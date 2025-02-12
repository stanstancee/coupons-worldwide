/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { countries } from "@/lib/countries"
import { profileFormSchema, type ProfileFormValues } from "@/lib/schema"
import ChangePasswordForm from "./change-password-form"
import { useDashboard } from "@/context/dashboard-context"
import { useToast } from "@/hooks/use-toast"
import { updateProfileAction } from "@/actions/profile"
import { mutate } from "swr"

export default function ProfileForm() {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { profile } = useDashboard()
  const { toast } = useToast()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      first_name: profile?.first_name || "",
      last_name: profile?.last_name || "",
      gender: profile?.gender || "",
      country: profile?.country || "",
    },
  })

  useEffect(() => {
    if (profile) {
      form.reset({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        gender: profile.gender || "",
        country: profile.country || "",
      })
    }
  }, [profile, form])

  const onSubmit = async (data: ProfileFormValues) => {
    const formData = new FormData()
    formData.append("first_name", data.first_name as string)
    formData.append("last_name", data.last_name as string)
    formData.append("gender", data.gender as string)
    formData.append("country", data.country as string)


    try {
      setIsLoading(true)
      const response = await updateProfileAction(formData)
      if (response?.status) {
        await  mutate("/profile/info")
        toast({
          title: "Success",
          description: response?.message,
        })
     
      } else {
        toast({
          title: "Error",
          description: response?.message,
          variant: "destructive",
        })
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setIsEditing(false)
    }
  }

  const getCountryFlag = (code: string) => {
    return `https://flagcdn.com/24x18/${code.toLowerCase()}.png`
  }

  return (
    <div className="p-4 md:px-5 md:my-8 md:min-h-[760px] ">
      <div className="flex flex-col md:flex-row gap-6 items-start mb-8 md:items-center">
        <div className="relative w-20 h-20 rounded-full overflow-hidden">
          <Image
            src={profile?.profile_image || `/placeholder.jpg`}
            alt="Profile picture"
            className="object-cover"
            width={100}
            height={100}
          />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-medium">
            {profile?.first_name} {profile?.last_name}
          </h2>
          <p className="text-muted-foreground">{profile?.email}</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-[1304px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">First Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!isEditing} className="h-[48px] bg-[#F9F9F9] " />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!isEditing} className="h-[48px] bg-[#F9F9F9] " />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Gender</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled={!isEditing}>
                    <FormControl>
                      <SelectTrigger className="h-[48px] bg-[#F9F9F9] ">
                        <SelectValue placeholder="Select gender">{field.value || "Select gender"}</SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Country</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled={!isEditing}>
                    <FormControl>
                      <SelectTrigger className="h-[48px] bg-[#F9F9F9] ">
                        <SelectValue placeholder="Select country">
                          {field.value ? (
                            <div className="flex items-center gap-2">
                              <Image
                                src={
                                  getCountryFlag(countries.find((c) => c.name === field.value)?.code || "") ||
                                  "/placeholder.svg"
                                }
                                alt=""
                                width={24}
                                height={18}
                                className="rounded-sm"
                              />
                              {field.value}
                            </div>
                          ) : (
                            "Select country"
                          )}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.name}>
                          <div className="flex items-center gap-2">
                            <Image
                              src={getCountryFlag(country.code) || "/placeholder.svg"}
                              alt=""
                              width={24}
                              height={18}
                              className="rounded-sm"
                            />
                            {country.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-4 pt-6">
            <Button
              type="button"
              variant={isEditing ? "outline" : "default"}
              onClick={() => setIsEditing(!isEditing)}
              className="min-w-[94px] min-h-[45px]"
            >
              {isEditing ? "Cancel" : "Edit"}
            </Button>
            {isEditing && (
              <Button className="min-w-[94px] min-h-[45px]" type="submit" isLoading={isLoading}>
                Save Changes
              </Button>
            )}
          </div>
        </form>
      </Form>
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">Change Password</h2>
        <ChangePasswordForm />
      </div>
    </div>
  )
}

