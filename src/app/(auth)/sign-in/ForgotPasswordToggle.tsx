'use client';

import { Circle as ToggleLeft, Disc2 as ToggleRight } from 'lucide-react';

interface ForgotPasswordProps {
  staySignedIn: boolean;
  setStaySignedIn: (value: boolean) => void;
}

const ForgotPasswordToggle: React.FC<ForgotPasswordProps> = ({ staySignedIn, setStaySignedIn }) => {
  const toggleStaySignedIn = () => {
    setStaySignedIn(!staySignedIn);
  };

  return (
    <div className="flex items-center justify-between w-full">
      {/* Forgot Password */}
      <a
        href="/forgot-password"
        className="text-primary text-[.94rem] font-bold underline hover:no-underline"
      >
        Forgot Password?
      </a>

      {/* Stay Signed In */}
      <div
        className="flex items-center gap-2 cursor-pointer font-bold text-[.94rem]"
        onClick={toggleStaySignedIn}
      >
        {staySignedIn ? (
          <ToggleRight size={24} className="text-primary" />
        ) : (
          <ToggleLeft size={24} className="text-[#A4B9C6]" />
        )}
        <span
          className={`font-medium ${
            staySignedIn ? 'text-blue-900' : 'text-gray-500'
          }`}
        >
          Stay Signed in
        </span>
      </div>
    </div>
  );
};

export default ForgotPasswordToggle;
