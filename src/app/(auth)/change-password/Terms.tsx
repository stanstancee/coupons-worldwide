"use client";

import { Circle as ToggleLeft, Disc2 as ToggleRight } from "lucide-react";

interface TermsProps {
  staySignedIn: boolean;
  setStaySignedIn: (value: boolean) => void;
}

const TermsToggle: React.FC<TermsProps> = ({
  staySignedIn,
  setStaySignedIn,
}) => {
  const toggleStaySignedIn = () => {
    setStaySignedIn(!staySignedIn);
  };

  return (
    <div className="flex items-center  w-full gap-2">
      <div
        className="flex items-center  cursor-pointer font-bold text-[.94rem]"
        onClick={toggleStaySignedIn}
      >
        {staySignedIn ? (
          <ToggleRight size={24} className="text-primary" />
        ) : (
          <ToggleLeft size={24} className="text-[#A4B9C6]" />
        )}

      </div>
      {/* Forgot Password */}
      <div className="flex flex-col text-sm">
        <p>I have read and agree to oTask</p>
        <a
          href="/forgot-password"
          className="text-primary underline hover:no-underline"
        >
          Privacy Policy, Terms of Use, and Cookies Policy.
        </a>
      </div>

      {/* Stay Signed In */}
    </div>
  );
};

export default TermsToggle;
