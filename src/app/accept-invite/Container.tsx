/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
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

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { useToast } from "@/hooks/use-toast";

import { inviteTeamAction } from "@/actions/team";

const Container = ({ email }: { email: string }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const formSchema = z.object({
    invitation_code: z
      .string()
      .min(8, { message: "Invitation code must be at least 8 characters" })
      .max(8, {
        message: "Invitation code must not be greater than 8 characters",
      }),
    email: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invitation_code: "",
      email: email,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // router.push("/welcome");
    try {
      setIsLoading(true);
      const res = await inviteTeamAction({
        email,
        invitation_code: values.invitation_code,
      });
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid place-items-center h-full place-content-center pt-8 px-4">
      <div className="flex flex-col gap-6 xl:gap-8 w-full md:w-[25rem]">
        <div className="flex justify-center align-middle items-center ml-8 ">
          <Image
            height={36}
            width={228}
            src={"/coupons-worldwide.svg"}
            alt="coupons-worldwide logo"
          />
        </div>
        <h1 className="font-semibold text-[#4A4A4A] text-center flex items-center justify-center">
          <span>Accept Invite</span>
        </h1>
        <section className=" w-full">
          <p className="text-[#1A4F6E]/50 text-sm text-center">
            Please enter the 8-character invitation code sent to your email.
          </p>
          <p className="text-primary text-sm text-center font-bold mt-2">
            {email}
          </p>
        </section>
        <Form {...form}>
          <form
            className="flex flex-col gap-6 justify-center items-center"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="invitation_code"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormControl>
                    <InputOTP {...field} maxLength={8}>
                      <InputOTPGroup className="gap-1 md:gap-3">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                        <InputOTPSlot index={6} />
                        <InputOTPSlot index={7} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Note */}
            {/* The invitation code is your password and you can change it later  */}
            <p className="text-[#1A4F6E]/50 text-sm text-center">
              Your invitation code is your initial password and can be changed
              later.
            </p>

            <Button
              type="submit"
              className="w-full bg-primary text-white h-12 rounded-lg"
              isLoading={isLoading}
            >
              Accept Invite
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Container;
