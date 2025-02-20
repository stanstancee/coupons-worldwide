"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { LogOut, Plus, Settings, User } from "lucide-react";
import Link from "next/link";
import { useDashboard } from "@/context/dashboard-context";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const TopNav = ({ title }: { title: string }) => {
  const { profile } = useDashboard();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const router = useRouter();
  const clearAllCookies = () => {
    const cookies = Cookies.get(); // Get all cookies as an object
    Object.keys(cookies).forEach((cookie) => {
      Cookies.remove(cookie, { path: "/" }); // Remove each cookie
    });
  };

  const handleLogout = () => {
    // Clear all storage
    localStorage.clear();
    sessionStorage.clear();
    clearAllCookies();

    // Redirect to sign-in
    router.refresh();
  };

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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-3 cursor-pointer">
                <Avatar>
                  <AvatarImage src={profile?.profile_image || ""} />
                  <AvatarFallback>{`${profile?.first_name?.charAt(
                    0
                  )}${profile?.last_name?.charAt(0)}`}</AvatarFallback>
                </Avatar>
                <article className="flex flex-col">
                  <h1 className="text-[#16161D] font-bold text-base text-left">
                    {profile?.first_name} {profile?.last_name}
                  </h1>
                  <p className="text-xs text-[#6E6E91] capitalize">
                    {profile?.account_type}
                  </p>
                </article>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <Link href="/dashboard/profile">
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/dashboard/settings">
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={() => setShowLogoutDialog(true)}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog
            open={showLogoutDialog}
            onOpenChange={setShowLogoutDialog}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to logout?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  You will be redirected to the sign-in page.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleLogout}
                  className="bg-destructive hover:bg-destructive/90"
                >
                  Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </section>
  );
};

export default TopNav;
