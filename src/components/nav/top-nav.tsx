"use client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

const TopNav = ({ title }: { title: string }) => {
  return (
    <section className="p-4 md:pt-4 md:pb-6 md:pl-[1.37rem] md:pr-[1.93rem] bg-white shadow-top-nav sticky top-0 z-30 w-full">
      <div className="flex items-center justify-between gap-2 md:flex-nowrap flex-wrap">
        <h1 className="text-lg lg:text-xl font-bold ">{title}</h1>
        <div className="flex items-center gap-2 md:gap-4 xl:gap-6 ">
          <Button size={"lg"} className="rounded-[4px] bg-primary-blue">
            <Plus size={16} />
            <span> Create Campaign </span>
          </Button>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/avatar.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <article className="flex flex-col">
              <h1 className="text-[#16161D] font-bold text-base">Rehan Rose</h1>
              <p className="text-xs text-[#6E6E91]">Admin</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopNav;
