/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"

// This is a placeholder for the actual server action you'll implement
async function confirmInvitation(email: string): Promise<{ success: boolean; message: string }> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  // For demonstration, let's randomly succeed or fail
  return Math.random() > 0.5
    ? { success: true, message: "Invitation confirmed successfully!" }
    : { success: false, message: "Error confirming invitation. Please try again." }
}

export default function AcceptInvite() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const email = searchParams.get("email")
    if (!email) {
      setStatus("error")
      setMessage("No email provided in the invitation link.")
      return
    }

    const handleConfirmation = async () => {
      try {
        const result = await confirmInvitation(email)
        if (result.success) {
          setStatus("success")
          setMessage(result.message)
          // Redirect to sign-in page after 3 seconds
          setTimeout(() => {
            router.push("/sign-in")
          }, 3000)
        } else {
          setStatus("error")
          setMessage(result.message)
        }
      } catch (error) {
        setStatus("error")
        setMessage("An unexpected error occurred. Please try again.")
      }
    }

    handleConfirmation()
  }, [searchParams, router])

  const handleRetry = () => {
    setStatus("loading")
    const email = searchParams.get("email")
    if (email) {
      confirmInvitation(email)
        .then((result) => {
          if (result.success) {
            setStatus("success")
            setMessage(result.message)
            setTimeout(() => {
              router.push("/sign-in")
            }, 3000)
          } else {
            setStatus("error")
            setMessage(result.message)
          }
        })
        .catch(() => {
          setStatus("error")
          setMessage("An unexpected error occurred. Please try again.")
        })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          {status === "loading" && <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />}
          {status === "success" && <CheckCircle className="h-12 w-12 text-green-500" />}
          {status === "error" && <AlertCircle className="h-12 w-12 text-red-500" />}
        </div>
        <h1
          className={`text-2xl font-medium mb-4 text-center ${
            status === "success" ? "text-green-600" : status === "error" ? "text-red-600" : "text-gray-800"
          }`}
        >
          {status === "success"
            ? "Invitation Confirmed"
            : status === "error"
              ? "Confirmation Error"
              : "Confirming Invitation"}
        </h1>
        <p
          className={`mb-6 text-center ${
            status === "success" ? "text-green-600" : status === "error" ? "text-red-600" : "text-gray-600"
          }`}
        >
          {status === "loading" ? "Please wait while we confirm your invitation..." : message}
        </p>
        {status === "success" && <p className="text-center text-green-600 mb-6">Redirecting to sign-in page...</p>}
        {status === "error" && (
          <Button
            onClick={handleRetry}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out flex items-center justify-center"
          >
            {/* <Loader2 className="mr-2 h-4 w-4 animate-spin" /> */}
            Retry
          </Button>
        )}
      </div>
    </div>
  )
}

