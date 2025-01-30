/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { resendOTP, verifyAction } from "./action";
import { useToast } from "@/hooks/use-toast";
import Loading from "@/components/loading";

const Container = ({ email }: { email: string }) => {
  const router = useRouter();
  const [loadingResendOTP, setLoadingResendOTP] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const formSchema = z.object({
    otp: z
      .string()
      .min(4, { message: "OTP must be at least 4 characters" })
      .max(4, { message: "OTP must not be greater than 4 characters" })
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
    if (form.watch("otp").length === 4) {
      form.handleSubmit(onSubmit)(); // Trigger form submission when OTP is filled correctly
    }
  }, [form.watch("otp")]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // router.push("/welcome");
    try {
      setIsLoading(true);
      const res = await verifyAction({ email, otp: values.otp });
      if (res.status) {
        router.push("/welcome");
      } else {
        toast({
          description: res.message,
          variant: "destructive",
        });
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const onResendOTP = async () => {
    try {
      setLoadingResendOTP(true);
      const res = await resendOTP({ email });
      if (res.status) {
        toast({
          description: res.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: res.message,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoadingResendOTP(false);
    }
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
          <span>Email Verification</span>
        </h1>
        <section className=" w-full">
          <p className="text-[#1A4F6E]/50 text-sm text-center">
            We have sent a verification code to
          </p>
          <p className="text-primary text-sm text-center font-bold mt-2">
            {email}
          </p>
        </section>
        <Form {...form}>
          <form className="flex flex-col gap-6 justify-center items-center">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormControl>
                    <InputOTP {...field} maxLength={4}>
                      <InputOTPGroup className="gap-3">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-center mt-[25%]">
              <p className="text-sm text-[#4A4A4A] mb-4">
                Didn&apos;t receive the verification link?
              </p>
              <Button
                isLoading={loadingResendOTP}
                onClick={onResendOTP}
                variant={"ghost"}
                className="text-primary text-[.94rem] font-bold hover:underline cursor-pointer"
              >
                Resend Again
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <Loading loading={isLoading} />
    </div>
  );
};

export default Container;
