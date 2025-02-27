import { Star } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

export default function BusinessHeader() {
  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="w-full h-48 bg-gray-200 relative">
        <Image
          src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop"
          alt="Burger and fries"
          className="w-full h-full object-cover"
          width={600}
          height={400}
        />

        {/* Logo */}
        <div className="absolute -bottom-6 left-4 w-12 h-12 rounded-full bg-white p-1">
          <div className="w-full h-full rounded-full bg-red-600 flex items-center justify-center">
            <Image
              src="https://images.unsplash.com/photo-1586816001966-79b736744398?q=80&w=100&auto=format&fit=crop"
              alt="Business logo"
              className="w-8 h-8 rounded-full object-cover"
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>

      {/* Business Info */}
      <div className="pt-8 px-4 pb-4 bg-white">
        <h1 className="text-xl font-bold">Burger King</h1>

        <div className="flex items-center justify-between mt-4">
          <div className="text-center">
            <p className="font-bold">234K</p>
            <p className="text-xs text-gray-500">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-bold">546</p>
            <p className="text-xs text-gray-500">Coupons</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 font-bold">4.8</span>
            </div>
            <p className="text-xs text-gray-500">Rating</p>
          </div>
        </div>

        <div className="flex  justify-center gap-4 p-6 xl:pt-8 ">
          <Link
            href="https://apps.apple.com/us/app/abiplay-movies-shows-more/id6742411238"
            target="_blank"
            className="w-full max-w-[150px] lg:max-w-[250px]"
          >
            <Image
              src="/appstore.svg"
              alt="App Store"
              width={418}
              height={121}
              className="w-full h-auto"
              sizes="(max-width: 640px) 80px, (max-width: 768px) 150px, (max-width: 1920px) 350px, 250px"
            />
          </Link>
          <Link
            href="https://play.google.com/store/apps/details?id=com.abiplay.abiplay"
            target="_blank"
            className="w-full max-w-[150px] lg:max-w-[250px]"
          >
            <Image
              src="/playstore.svg"
              alt="Play Store"
              width={418}
              height={121}
              className="w-full h-auto"
              sizes="(max-width: 640px) 80px, (max-width: 768px) 150px, (max-width: 1920px) 250px, 250px"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
