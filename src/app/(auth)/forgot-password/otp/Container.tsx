"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS as REGEXP_ONLY_DIGITS_STRING } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from 'next/navigation';

const Container = () => {
  const router = useRouter();

  const formSchema = z.object({
    otp: z
      .string()
      .min(6, { message: "OTP must be at least 6 characters" })
      .max(6, { message: "OTP must not be greater than 6 characters" })
      .regex(new RegExp(REGEXP_ONLY_DIGITS_STRING), {
        message: "OTP must be a number",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Effect to handle OTP auto-submit and navigation when OTP is complete
  useEffect(() => {
    if (form.watch("otp").length === 6) {
      form.handleSubmit(onSubmit)(); // Trigger form submission when OTP is filled correctly
    }
  }, [form.watch("otp")]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // Navigate to the change-password page once OTP is valid
    router.push("/change-password");
  };

  return (
    <div className="grid place-items-center h-full place-content-center pt-8">
      <div className="flex flex-col gap-6 xl:gap-8 w-[25rem]">
        <div className="flex justify-center align-middle items-center ml-8 ">
          <Image
            height={36}
            width={228}
            src={"/coupons-worldwide.svg"}
            alt="coupons-worldwide logo"
          />
        </div>
        <h1 className="font-semibold text-[#4A4A4A] text-center flex items-center justify-center">
          <span>Reset Password Verification</span>
        </h1>
        <section className=" w-full">
          <p className="text-[#1A4F6E]/50 text-sm text-center">
            We have sent a verification code to
          </p>
          <p className="text-primary text-sm text-center font-bold mt-2">
            Johnsmith@gmail.com
          </p>
        </section>
        <Form {...form}>
          <form className="flex flex-col gap-6 justify-center items-center">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormControl>
                    <InputOTP {...field} maxLength={6}>
                      <InputOTPGroup className="gap-3">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-center mt-[25%]">
              <p className="text-sm text-[#4A4A4A] mb-4">
                Didn&apos;t receive the reset password link?
              </p>
              <p className="text-primary text-[.94rem] font-bold hover:underline cursor-pointer">
                Resend Again
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Container;
