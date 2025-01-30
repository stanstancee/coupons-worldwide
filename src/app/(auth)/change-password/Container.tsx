"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CustomInput } from "@/components/ui/custom-input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordAction } from "@/actions/auth";
import Cookies from "js-cookie";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const Container = () => {
  const otp = Cookies.get("otp");
  const email = Cookies.get("forgotPasswordEmail");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const formSchema = z
    .object({
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(20, {
          message: "Password must not be greater than 20 characters",
        }),

      confirm_password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(20, {
          message: "Password must not be greater than 20 characters",
        }),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.confirm_password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password and Confirm Password must be the same",
          path: ["confirm_password"],
        });
      }
    });

  type RegisterSchema = z.infer<typeof formSchema>;

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // router.push("/welcome");
    const { password, confirm_password } = values;
    const formData = new FormData();
    formData.append("otp", otp as string);
    formData.append("email", email as string);
    formData.append("password", password as string);
    formData.append("password_confirmation", confirm_password);

    try {
      setIsLoading(true);
      const res = await changePasswordAction(formData);
      if (res.status) {
        toast({
          description: res.message,
        });

        router.push("/sign-in");
      } else {
        toast({
          description: res.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid place-items-center h-full place-content-center pt-8">
      <div className="flex flex-col gap-6 xl:gap-12 w-[25rem]">
        <div className="grid place-items-center place-content-center ml-8">
          <Image
            height={36}
            width={228}
            src={"/coupons-worldwide.svg"}
            alt="coupons-worldwide logo"
          />
        </div>
        <h1 className="font-semibold text-[#4A4A4A] text-center">
          Set a New Password
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" grid gap-6 md:gap-8"
          >
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
                    <CustomInput
                      {...field}
                      type="password"
                      label="Confirm Password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              isLoading={isLoading}
              className="font-bold"
              type="submit"
              size={"lg"}
            >
              Set New Password
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Container;
