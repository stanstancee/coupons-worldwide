"use client";

import React from "react";
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

const Container = () => {
  const formSchema = z.object({
    email: z.string().email(),
  });

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });


  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    router.push("/forgot-password/otp");
  }
  return (
    <div className="grid place-items-center h-full place-content-center pt-8">
      <div className="flex flex-col gap-6 xl:gap-8 w-[25rem]">
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

            <Button className="font-bold" type="submit" size={"lg"}>
              Reset Password
            </Button>

            <div className="text-center mt-[25%]">
              <p className="text-sm text-[#4A4A4A] mb-4">
                Didnt received the reset password link?
              </p>
              <p className="text-primary text-[.94rem] font-bold  hover:underline cursor-pointer">
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
