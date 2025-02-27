"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Home, } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

export default function PaymentError() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-red-50 to-white p-4">
      <Card className="mx-auto max-w-md w-full shadow-lg">
        <CardHeader className="flex flex-col items-center space-y-2 pb-2">
          <div className="rounded-full bg-red-100 p-3 mb-2">
            <AlertCircle className="h-12 w-12 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-center">Payment Failed</h1>
          <p className="text-muted-foreground text-center">
            We couldn&apos;t process your payment
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-red-50 border border-red-200 p-4">
            <h3 className="font-medium text-red-800 mb-3 flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              Common reasons for payment failure:
            </h3>
            <ul className="text-sm text-red-700 space-y-2.5">
              {[
                "Insufficient funds in your account",
                "Card has expired or is invalid",
                "Transaction was declined by your bank",
                "Network or connection issues",
              ].map((reason, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">
              You will be redirected to the home page in {countdown} seconds
            </p>
            <Progress value={(5 - countdown) * 20} className="h-2 mt-4" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              router.push("/");
            }}
          >
            <Button variant={"destructive"} className="w-full h-[40px]">
              <Home className="mr-2 h-4 w-4" />
              Return to Home Now
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
