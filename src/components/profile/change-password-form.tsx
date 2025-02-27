/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updatePasswordAction } from "@/actions/profile";
import { useToast } from "@/hooks/use-toast";

const changePasswordSchema = z
  .object({
    old_password: z.string().min(1, "Old password is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirmation: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  });

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordForm() {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const  {toast } = useToast();

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      old_password: "",
      password: "",
      password_confirmation: "",
    },
  });

  async function onSubmit(data: ChangePasswordFormValues) {
    const payload = {
      password: data.password,
      password_confirmation: data.password_confirmation,
    };

    try {
      setIsLoading(true);
      const res = await updatePasswordAction(payload);

      toast({
        title: res?.status ? "Success" : "Error",
        description: res.message,
        variant: res?.status ? "default" : "destructive",
      });
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error?.message || "Something went wrong. Please try again later.",
      });
    } finally {
      setIsLoading(false);
      setIsChangingPassword(false);
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-[700px]"
      >
        <FormField
          control={form.control}
          name="old_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal">Old Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  className="h-[48px] bg-[#F9F9F9]"
                  disabled={!isChangingPassword}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal">New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  className="h-[48px] bg-[#F9F9F9]"
                  disabled={!isChangingPassword}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password_confirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal">
                Confirm New Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  className="h-[48px] bg-[#F9F9F9]"
                  disabled={!isChangingPassword}
                />
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
            <Button
              className="min-w-[94px] min-h-[45px]"
              type="submit"
              isLoading={isLoading}
            >
              {isLoading ? "Saving Password..." : "Save Password"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
