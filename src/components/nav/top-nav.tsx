"use client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useDashboard } from "@/context/dashboard-context";

const TopNav = ({ title }: { title: string }) => {
  const { profile } = useDashboard();
  return (
    <section className="p-4 md:pt-4 md:pb-6 md:pl-[1.37rem] md:pr-[1.93rem] bg-white shadow-top-nav sticky top-0 z-30 w-full">
      <div className="flex items-center justify-between gap-2 md:flex-nowrap flex-wrap">
        <h1 className="text-lg lg:text-xl font-bold ml-10 mt-2 md:mt-0 md:ml-0">
          {title}
        </h1>
        <div className="flex items-center gap-2 md:gap-4 xl:gap-6 mt-4 md:mt-0">
          <Link href="/dashboard/campaign/create">
            <Button size={"lg"} className="rounded-[4px] bg-primary-blue">
              <Plus size={16} />
              <span> Create Campaign </span>
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={profile?.profile_image || ""} />
              <AvatarFallback>
                {`${profile?.first_name?.charAt(0)}${profile?.last_name?.charAt(
                  0
                )}`}
              </AvatarFallback>
            </Avatar>
            <article className="flex flex-col">
              <h1 className="text-[#16161D] font-bold text-base ">
                {profile?.first_name} {profile?.last_name}
              </h1>
              <p className="text-xs text-[#6E6E91] capitalize">
                {profile?.account_type}
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopNav;
