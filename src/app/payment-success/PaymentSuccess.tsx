"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, Home } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function PaymentSuccess() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/")
    }, 5000)

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-green-50 to-white p-4">
      <Card className="mx-auto max-w-md w-full shadow-lg">
        <CardHeader className="flex flex-col items-center space-y-2 pb-2">
          <div className="rounded-full bg-green-100 p-3 mb-2">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-center">Payment Successful!</h1>
          <p className="text-muted-foreground text-center">Your transaction has been completed successfully</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-green-50 p-4 text-center">
            <p className="text-sm text-green-800">
              Thank you for your purchase! You will be redirected to the home page in {countdown} seconds.
            </p>
          </div>

          <Progress value={(5 - countdown) * 20} className="h-2" />
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault()
                router.push("/")
              }}
            >
              <Home className="mr-2 h-4 w-4" />
              Return to Home Now
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

