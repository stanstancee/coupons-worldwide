import React from "react";
import Confetti from "@/components/confetti";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Container = () => {
  return (
    <div className="relative">
      <div className="grid place-items-center place-content-center absolute top-1/4 left-0 right-0 ">
        <Image
          height={36}
          width={228}
          src={"/coupons-worldwide.svg"}
          alt="coupons-worldwide logo"
        />
      </div>
      <Image
        src="/confetti.svg"
        alt="confetti"
        width={1021}
        height={300}
        className="w-full h-[200px] md:h-[350px] 2xl:h-[20%]"
      />

      <div className="grid place-items-center h-full place-content-center gap-8">
        <p className="text-[#1A4F6E] text-sm text-center w-full md:w-[80%] 2xl:w-[578px] leading-[30px]">
          We’re thrilled to welcome you to Coupons Worldwide! Our mission is to
          help businesses like yours boost sales and attract more customers with
          ease. With our powerful platform offering access to a global network
          of deals and discounts, growing your business has never been simpler
          or faster. The Coupons Worldwide platform is packed with all the tools
          you need to streamline your sales and marketing efforts, including
          customizable coupon campaigns, advanced analytics, customer engagement
          tools, and much more. Start exploring and take the step toward
          maximizing your business’s potential! 🚀
        </p>
        <p className="text-[#4A4A4A] font-semibold">To continue you have to:</p>

        <div className="w-full md:w-[360px] grid gap-5">
          <Link href="/profile/create">
            <Button
              variant={"outline"}
              size="lg"
              className="w-full border-primary text-primary font-bold"
            >
              Setup Company Profile
            </Button>
          </Link>
          <Button size="lg" className="font-bold">
            Logout & Complete Later
          </Button>
        </div>
      </div>
      <Confetti />
    </div>
  );
};

export default Container;
