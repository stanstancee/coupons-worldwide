/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { useRouter } from "next/navigation";
import { forgotPasswordAction } from "@/actions/auth";
import { useToast } from "@/hooks/use-toast";
import Cookies from "js-cookie";

const Container = () => {
  const formSchema = z.object({
    email: z.string().email(),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("email", values.email);
    try {
      setIsLoading(true);

      const response = await forgotPasswordAction(formData);
      if (response.status) {
        toast({
          variant: "default",
          title: "Success",
          description: response.message,
        });
        Cookies.set("forgotPasswordEmail", values.email);
        router.push("/forgot-password/otp");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid place-items-center h-full place-content-center pt-8">
      <div className="flex flex-col gap-6 xl:gap-8 md:w-[25rem] w-full">
        <div className="grid place-items-center place-content-center">
          <Image
            height={36}
            width={228}
            src={"/coupons-worldwide.svg"}
            alt="coupons-worldwide logo"
          />
        </div>
        <h1 className="font-semibold text-[#4A4A4A] ">Forget password?</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" grid gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInput
                      {...field}
                      type="email"
                      label="Enter your email to reset password"
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-[#1A4F6E]/50 text-xs ">
                    We will send an email to reset your password.
                  </p>
                </FormItem>
              )}
            />

            <Button
              isLoading={isLoading}
              className="font-bold mt-4"
              type="submit"
              size={"lg"}
            >
              Reset Password
            </Button>

            {/* <div className="text-center mt-[25%]">
              <p className="text-sm text-[#4A4A4A] mb-4">
                Didnt received the reset password link?
              </p>
              <p className="text-primary text-[.94rem] font-bold  hover:underline cursor-pointer">
                Resend Again
              </p>
            </div> */}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Container;
