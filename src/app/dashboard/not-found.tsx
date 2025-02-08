import Link from "next/link";
import { FileQuestion, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <FileQuestion className="mx-auto h-24 w-24 text-gray-400" />
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-base leading-7 text-gray-600">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <div className="mt-10">
          <Link href="/dashboard" className="">
            <Button size={"lg"}>
              <Home className="mr-2 h-5 w-5" />
              Go back home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
