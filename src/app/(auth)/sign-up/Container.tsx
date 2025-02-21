"use client"

import React, { useState } from "react"
import Image from "next/image"
import { CustomInput } from "@/components/ui/custom-input"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import TermsToggle from "./Terms"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { countries } from "@/lib/countries"
import{ signUpAction }from "@/actions/auth"
import { useToast } from "@/hooks/use-toast"
import { SuccessModal } from "@/components/success-modal"

const Container = () => {
  const [staySignedIn, setStaySignedIn] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  
  const { toast } = useToast()

  const formSchema = z
    .object({
      email: z.string().email(),
      password: z.string().min(6, { message: "Password must be at least 6 characters" }).max(20, {
        message: "Password must not be greater than 20 characters",
      }),
      first_name: z.string().min(2, { message: "First name is required" }).max(20, {
        message: "First name must not be greater than 20 characters",
      }),
      last_name: z.string().min(2, { message: "Last name is required" }).max(20, {
        message: "Last name must not be greater than 20 characters",
      }),
      country: z.string().min(2, { message: "Country is required" }),
      account_type: z.string().min(2, { message: "Account type is required" }),
      confirm_password: z.string().min(6, { message: "Password must be at least 6 characters" }).max(20, {
        message: "Password must not be greater than 20 characters",
      }),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.confirm_password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password and Confirm Password must be the same",
          path: ["confirm_password"],
        })
      }
    })

  type RegisterSchema = z.infer<typeof formSchema>

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
      first_name: "",
      last_name: "",
      country: "",
      account_type: "vendor",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData()
    Object.entries(values).forEach(([key, value]) => {
      if (key !== "confirm_password") {
        formData.append(key, value)
      }
    })

    try {
      setLoading(true)
      const response = await signUpAction(formData)


      if (response.status) {
        setIsSuccessModalOpen(true)
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.message,
        })
      }
    

    } catch (error) {
      console.log(error)

      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again later.",
      })
      setIsSuccessModalOpen(false)
    } finally {
      setLoading(false)
    }
  }

  const getCountryFlag = (code: string) => {
    return `https://flagcdn.com/24x18/${code.toLowerCase()}.png`
  }

  return (
    <div className="grid place-items-center h-full place-content-center pt-8">
      <div className="flex flex-col gap-6 xl:gap-8 md:w-[25rem] w-full">
        <div className="grid place-items-center place-content-center">
          <Image height={36} width={228} src={"/coupons-worldwide.svg"} alt="coupons-worldwide logo" />
        </div>
        <h1 className="font-semibold text-[#4A4A4A] text-center">Sign Up</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" grid gap-6">
            <div className="flex gap-4 ">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CustomInput {...field} type="text" label="First Name" />
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
                    <FormControl>
                      <CustomInput {...field} type="text" label="Last Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInput {...field} type="email" label="Email" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-[48px] bg-white rounded-none text-primary font-semibold">
                        <SelectValue placeholder="Select country">
                          {field.value && (
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
                          )}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.name}>
                          <div className="flex items-center gap-2">
                            <Image
                              src={getCountryFlag(country.code) || "/placeholder.svg" || "/placeholder.svg"}
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInput {...field} type="password" label="Password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInput {...field} type="password" label="Confirm Password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <TermsToggle staySignedIn={staySignedIn} setStaySignedIn={setStaySignedIn} />
            <Button
              className="font-bold"
              type="submit"
              size={"lg"}
              isLoading={loading}
              disabled={loading || !staySignedIn}
            >
              Submit
            </Button>

            <div className="text-center mt-[25%]">
              <p className="text-sm text-[#4A4A4A] mb-4">Already have an account?</p>
              <a href="/sign-in" className="text-primary text-[.94rem] font-bold  hover:underline">
                Sign in
              </a>
            </div>
          </form>
        </Form>
      </div>
      <SuccessModal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} />
    </div>
  )
}

export default Container

