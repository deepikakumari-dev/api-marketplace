'use client'

import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center gap-4">
      <AlertTriangle className="w-16 h-16 text-muted-foreground" />
      <h1 className="text-3xl font-bold tracking-tight">Page Not Found</h1>
      <p className="text-muted-foreground max-w-md">
        The page you’re looking for doesn’t exist or has been moved somewhere else :(
      </p>

      <div className="flex gap-3 mt-4">
        <Button onClick={() => router.back()} variant="outline">
          Go Back
        </Button>
        <Button onClick={() => router.push("/")}>
          Return Home
        </Button>
      </div>
    </div>
  )
}
