/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback,  useRef  , useState} from "react";
import { cn } from "@/lib/utils";

import { EyeClosed, Eye } from "lucide-react";
import Image from "next/image";
import { Input } from "./input";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
}

interface ProfileInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  leftIcon?: string;
  rightIcon?: string;
  error?: string;
}

export function CustomInput({
  className,
  type = "text",
  label,
  leftIcon,
  rightIcon,
  error,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [hasValue, setHasValue] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(!!e.target.value);
  };

  // Check if the input has a value on mount (for autofill)
  React.useEffect(() => {
    if (inputRef.current) {
      setHasValue(!!inputRef.current.value);
    }
  }, []);

  return (
    <div className="w-full">
      <div className="relative">
        {label && (
          <label
            onClick={() => {
              setIsFocused(true);
              inputRef.current?.focus();
            }}
            className={cn(
              "absolute left-3 text-xs text-[#1A4F6E]/40 transition-all duration-200 ease-in-out bg-white px-1",
              isFocused || hasValue
                ? "-top-2 text-xs text-[#1A4F6E]/40  "
                : "top-1/2 -translate-y-1/2 "
            )}
          >
            {label}
          </label>
        )}
        <input
          ref={inputRef}
          type={showPassword ? "text" : type}
          className={cn(
            "flex w-full text-[#1A4F6E] h-12 font-bold border border-[#E8E8E8] bg-white px-4 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-0 focus:border-primary focus-visible:ring-gray-50 disabled:cursor-not-allowed disabled:opacity-50",
            leftIcon && "pl-10",
            (rightIcon || type === "password") && "pr-10",
            className
          )}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => setHasValue(!!e.target.value)}
          {...props}
        />
        {type === "password" ? (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <Eye className="h-6 w-6 text-[#1A4F6E]" />
            ) : (
              <EyeClosed className="h-6 w-6 text-[#1A4F6E]" />
            )}
          </button>
        ) : (
          rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {rightIcon}
            </div>
          )
        )}
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            {leftIcon}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export function ProfileInput({
  className,
  type = "text",
  label,
  leftIcon,
  rightIcon,
  error,

  ...props
}: ProfileInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [hasValue, setHasValue] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(!!e.target.value);
  };

  // Check if the input has a value on mount (for autofill)
  React.useEffect(() => {
    if (inputRef.current) {
      setHasValue(!!inputRef.current.value);
    }
  }, []);

  return (
    <div className="w-full">
      <div className="relative">
        {label && (
          <label
            onClick={() => {
              setIsFocused(true);
              inputRef.current?.focus();
            }}
            className={cn(
              "absolute left-6 text-xs text-[#1A4F6E]/40 transition-all duration-200 ease-in-out bg-white px-1",
              isFocused || hasValue
                ? "-top-2 text-xs text-[#1A4F6E]/40  "
                : "top-1/2 -translate-y-1/2 ",
              leftIcon && (!isFocused || hasValue) && "pl-5"
            )}
          >
            {label}
          </label>
        )}
        <Input
          autoComplete="hello"
          ref={inputRef}
          type={showPassword ? "text" : type}
          className={cn(
            "flex w-full text-[#1A4F6E] h-14 font-bold border border-[#E8E8E8] bg-white px-4 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-0 focus:border-primary focus-visible:ring-gray-50 disabled:cursor-not-allowed disabled:opacity-50",
            leftIcon && "pl-10",
            (rightIcon || type === "password") && "pr-10",
            className
          )}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => setHasValue(!!e.target.value)}
          {...props}
        />
        {type === "password" ? (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <Eye className="h-6 w-6 text-[#1A4F6E]" />
            ) : (
              <EyeClosed className="h-6 w-6 text-[#1A4F6E]" />
            )}
          </button>
        ) : (
          rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Image src={rightIcon} alt="icon" width={20} height={20} />
            </div>
          )
        )}
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



interface GoogleAddressInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onAddressSelect: (address: any) => void
  placeholder?: string
  leftIcon?: string
  rightIcon?: string
  error?: string
  apiKey: string
}

export function GoogleAddressInput({
  className,
  placeholder,
  leftIcon,
  rightIcon,
  error,
  onAddressSelect,
  apiKey,
  ...props
}: GoogleAddressInputProps) {
  const [inputValue, setInputValue] = useState("")
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)

  const onLoad = useCallback((autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete
  }, [])

  const onPlaceChanged = useCallback(() => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace()
      const address = {
        address: place?.formatted_address,
        lat:
          typeof place?.geometry?.location?.lat === "function"
            ? place.geometry.location.lat()
            : place?.geometry?.location?.lat,
        lng:
          typeof place?.geometry?.location?.lng === "function"
            ? place.geometry.location.lng()
            : place?.geometry?.location?.lng,
        url: place?.url,
        place_id: place?.place_id,
        address_components: place?.address_components,
      }
      
      setInputValue(place?.formatted_address || "")
      onAddressSelect(address)
    
    }
  }, [onAddressSelect])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
      <div className="w-full">
        <div className="relative">
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <Input
              type="text"
              className={cn(
                "flex w-full text-[#1A4F6E] h-14 font-bold border border-[#E8E8E8] bg-white px-4 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-0 focus:border-primary focus-visible:ring-gray-50 disabled:cursor-not-allowed disabled:opacity-50",
                leftIcon && "pl-10",
                rightIcon && "pr-10",
                className,
              )}
              {...props}
              placeholder={placeholder}
              value={inputValue}
              onChange={handleInputChange}
             
            />
          </Autocomplete>
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Image src={rightIcon || "/placeholder.svg"} alt="icon" width={20} height={20} />
            </div>
          )}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Image src={leftIcon || "/placeholder.svg"} alt="icon" className="w-6 h-6" width={24} height={24} />
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    </LoadScript>
  )
}

