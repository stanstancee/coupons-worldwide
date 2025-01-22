"use client";

import { useState } from "react";
import {
  BarChart,
  Users,
  BadgeCheck,
  Settings,
  User,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

import { Campaign } from "@/components/icons/nav-icons";
import { usePathname } from "next/navigation";

import Link from "next/link";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    current: true,
  },
  { name: "Campaign", href: "/dashboard/campaign", icon: Campaign },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart },
  { name: "Promote", href: "/dashboard/promote", icon: BadgeCheck },
  { name: "Team", href: "/dashboard/team", icon: Users },
  { name: "Line", href: "#", icon: Users },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function NavSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const getActive = (href: string) => {
    if (
      href === "/dashboard" &&
      pathname === "/dashboard" &&
      !pathname.includes("/dashboard/")
    ) {
      return true;
    } else {
      return pathname.startsWith(href) && href !== "/dashboard";
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        className="fixed left-4 top-4 z-50 rounded-md  p-2 md:hidden bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed shadow-nav-bar inset-y-0 left-0 z-40 flex h-screen  w-[286px] bg-white flex-col   transition-transform duration-300 ease-in-out md:sticky md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="pt-[.875rem] pl-6 pb-4 md:pb-[44px]">
          <Image
            src="/coupons-worldwide.svg"
            alt="Logo"
            width={195}
            height={72}
          />
        </div>
        <nav className="px-4 md:px-6 flex flex-col gap-3">
          {navigation.map((item, index) =>
            item.name === "Line" ? (
              <Separator key={index} />
            ) : (
              <Link
                key={index}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "py-3 px-6 flex gap-2 text-[#0C0C0D] md:text-lg hover:text-[#1A2B88] hover:font-bold hover:transition-all hover:animate-out",
                  getActive(item.href)
                    ? "font-bold text-[#1A2B88] shadow-nav-item border border-[#EFEEEB] rounded-[1rem]"
                    : ""
                )}
              >
                <item.icon />
                {item.name}
              </Link>
            )
          )}
        </nav>
      </div>
    </>
  );
}
