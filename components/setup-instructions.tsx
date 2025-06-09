"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, ExternalLink, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function SetupInstructions() {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="border-yellow-500/20 bg-yellow-50 dark:bg-yellow-900/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
          <AlertCircle className="w-5 h-5" />
          EmailOctopus Setup Required
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-yellow-700 dark:text-yellow-300">
          To activate the newsletter subscription, you need to set up your EmailOctopus list ID:
        </p>

        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium mb-2">1. Get your List ID from EmailOctopus:</p>
            <Button
              variant="outline"
              size="sm"
              className="text-yellow-700 border-yellow-300 hover:bg-yellow-100"
              onClick={() => window.open("https://emailoctopus.com/lists", "_blank")}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open EmailOctopus Dashboard
            </Button>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">2. Update the list ID in your code:</p>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg font-mono text-sm relative">
              <code>const listId = "your-list-id" // Replace with your actual list ID</code>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2 h-6 w-6 p-0"
                onClick={() => copyToClipboard('const listId = "your-actual-list-id"')}
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
            {copied && <p className="text-xs text-green-600 mt-1">Copied to clipboard!</p>}
          </div>

          <div>
            <p className="text-sm font-medium mb-2">3. File location:</p>
            <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">app/actions/newsletter.ts</code>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
          <p className="text-xs text-blue-700 dark:text-blue-300">
            <strong>Note:</strong> Your EmailOctopus API key is already configured in your environment variables. You
            just need to add your specific list ID to start collecting subscribers.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
