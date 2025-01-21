/* eslint-disable @next/next/no-img-element */
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import React from "react";
import { Separator } from "./ui/separator";

type ResponsiveWrapperProps = {
  children: React.ReactNode;
};



const AuthWrapper: React.FC<ResponsiveWrapperProps> = ({ children }) => {
  return (
    <div className="min-h-screen  flex flex-col lg:flex-row">
      {/* Left Image Section */}
      <div className="hidden lg:block lg:w-1/2   bg-[url('/auth-coupons-worldwide.png')] bg-slate-100 bg-center bg-cover ">
        {/* <img
          src="/auth-coupons-worldwide.png"
          alt="Team"
          className="h-full w-full object-contain"
        /> */}
      </div>

      {/* Right Content Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 lg:p-12 lg:relative  ">
        <main className="flex-grow ">
          {children}
          <footer className="absolute bottom-4 left-0 right-0 text-center text-[#4A4A4A] text-xs ">
            © 2025 Appylite.
          </footer>
        </main>
      </div>
    </div>
  );
};

export default AuthWrapper;

export const ProfileRegWrapper: React.FC<ResponsiveWrapperProps> = ({
  children,
}) => {
  return (
    <div className="min-h-screen  flex flex-col lg:flex-row">
      {/* Left Image Section */}
      <div className="hidden lg:block lg:w-1/2   bg-[url('/auth-coupons-worldwide.png')] bg-slate-100 bg-center bg-cover ">
        {/* <img
          src="/auth-coupons-worldwide.png"
          alt="Team"
          className="h-full w-full object-contain"
        /> */}
      </div>

      {/* Right Content Section */}
      <div className="w-full lg:w-1/2 lg:relative ">
        <div className="flex justify-end items-center p-4 md:px-5 md:py-6">
          <div className="flex gap-3 items-center">
            <Avatar className="md:h-12 md:w-12">
              <AvatarImage src="/avatar.png" />
              <AvatarFallback>S1</AvatarFallback>
            </Avatar>
            <p className="text-sm text-[#4A4A4A]">Stanley Ifeoha</p>
          </div>
        </div>
        <Separator />

        <div className="flex flex-col justify-between p-6 lg:p-12 lg:max-w-[750px] my-0 mx-auto">
          <main className="flex-grow w-full">
            {children}
            <footer className="absolute bottom-4 left-0 right-0 text-center text-[#4A4A4A] text-xs ">
              © 2025 Appylite.
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
};
