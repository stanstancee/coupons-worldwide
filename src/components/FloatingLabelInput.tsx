"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export default function FloatingLabelInput({ label, className, ...props }: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  return (
    <div className="relative">
      <input
        {...props}
        className={cn(
          "peer w-full rounded-lg border bg-white px-3 py-4 outline-none transition-all",
          "placeholder-transparent",
          isFocused ? "border-gray-800" : "border-gray-200",
          className,
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false)
          setHasValue(e.target.value.length > 0)
        }}
        onChange={(e) => setHasValue(e.target.value.length > 0)}
        placeholder={label}
      />
      <label
        className={cn(
          "absolute left-3 top-4 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-150",
          "peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100",
          "peer-focus:-translate-y-6 peer-focus:scale-75",
          isFocused && "text-gray-800",
          (isFocused || hasValue) && "-translate-y-6 scale-75",
        )}
      >
        {label}
      </label>
    </div>
  )
}

