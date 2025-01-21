import { Textarea } from "@/components/ui/textarea";
import React from "react";
import cn from "classnames";
import Image from "next/image";

interface TextareaProps {
  className?: string;
  type?: string;
  label?: string;
  leftIcon?: string;
  rightIcon?: string;
  error?: string;

}


export function CustomTextarea({
  className,
  label,
  leftIcon,
  rightIcon,
  error,
  ...props
}: TextareaProps) {

  const [isFocused, setIsFocused] = React.useState(false);
  const [hasValue, setHasValue] = React.useState(false);

  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);



  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    setHasValue(!!e.target.value);
  };

  // Check if the textarea has a value on mount (for autofill)
  React.useEffect(() => {
    if (textareaRef.current) {
      setHasValue(!!textareaRef.current.value);
    }
  }, []);

  return (
    <div className="w-full">
      <div className="relative">
        {label && (
          <label
            className={cn(
              "absolute  left-6 text-xs text-[#1A4F6E]/40 transition-all duration-200 ease-in-out bg-white px-1",
              isFocused || hasValue
                ? "-top-2 text-xs text-[#1A4F6E]/40  "
                : "top-1/4 -translate-y-1/4 ",
              leftIcon && (!isFocused || hasValue) && "pl-5"
            )}
          >
            {label}
          </label>
        )}
        <Textarea
          ref={textareaRef}
          className={cn(
            "flex w-full text-[#1A4F6E] font-bold border border-[#E8E8E8] bg-white px-4 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-0 focus:border-primary focus-visible:ring-gray-50 disabled:cursor-not-allowed disabled:opacity-50",
            leftIcon && "pl-10",
            (rightIcon ) && "pr-10",
            className
          )}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => setHasValue(!!e.target.value)}
          {...props}
        />
        {
          rightIcon &&
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Image src={rightIcon} alt="icon" width={20} height={20} />
            </div>

        }
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Image
              src={leftIcon}
              alt="icon"
              className="w-6 h-6"
              width={24}
              height={24}
            />
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
