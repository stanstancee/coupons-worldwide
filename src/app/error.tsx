"use client"

import { useEffect } from "react"
import { AlertTriangle, RotateCcw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <AlertTriangle className="mx-auto h-24 w-24 text-red-500" />
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Something went wrong!</h1>
        <p className="mt-4 text-base leading-7 text-gray-600">
          We apologize for the inconvenience. Our team has been notified.
        </p>
        <div className="mt-10">
          <button
            onClick={reset}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Try again
          </button>
        </div>
      </div>
    </div>
  )
}

