"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const changePasswordSchema = z
  .object({
    old_password: z.string().min(1, "Old password is required"),
    new_password: z.string().min(8, "Password must be at least 8 characters"),
    confirm_password: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>

export default function ChangePasswordForm() {
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
  })

  function onSubmit(data: ChangePasswordFormValues) {
    console.log("Password change submitted:", data)
    // Here you would typically send the password change request to your backend
    setIsChangingPassword(false)
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-[700px]">
        <FormField
          control={form.control}
          name="old_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal">Old Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} className="h-[48px] bg-[#F9F9F9]" disabled={!isChangingPassword} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="new_password"     
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal">New Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} className="h-[48px] bg-[#F9F9F9]" disabled={!isChangingPassword} />
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
              <FormLabel className="font-normal">Confirm New Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} className="h-[48px] bg-[#F9F9F9]" disabled={!isChangingPassword} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 pt-6">
          <Button
            type="button"
            variant={isChangingPassword ? "outline" : "default"}
            onClick={() => setIsChangingPassword(!isChangingPassword)}
            className="min-w-[94px] min-h-[45px]"
          >
            {isChangingPassword ? "Cancel" : "Change Password"}
          </Button>
          {isChangingPassword && (
            <Button className="min-w-[94px] min-h-[45px]" type="submit">
              Save Password
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}

