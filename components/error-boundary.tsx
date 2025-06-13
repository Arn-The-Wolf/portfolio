"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-green-400 flex items-center justify-center p-4">
          <Card className="bg-black/40 border-green-400/20 max-w-md w-full">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
              <CardTitle className="font-mono text-red-400">SYSTEM ERROR</CardTitle>
              <CardDescription className="text-gray-300">
                A critical error has occurred in the mission system.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
                <p className="text-sm font-mono text-red-300">ERROR CODE: {this.state.error?.name || "UNKNOWN"}</p>
                <p className="text-xs text-red-400 mt-1">
                  {this.state.error?.message || "An unexpected error occurred"}
                </p>
              </div>
              <div className="flex space-x-4">
                <Button
                  onClick={() => window.location.reload()}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-black font-mono"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  RESTART
                </Button>
                <Button
                  onClick={() => (window.location.href = "/")}
                  variant="outline"
                  className="flex-1 border-green-400 text-green-400 hover:bg-green-400 hover:text-black font-mono"
                >
                  <Home className="mr-2 h-4 w-4" />
                  HOME BASE
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
