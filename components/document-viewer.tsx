"use client"

import { Download, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface DocumentViewerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  viewUrl: string
  downloadUrl: string
  fileName?: string
}

export default function DocumentViewer({
  open,
  onOpenChange,
  title,
  viewUrl,
  downloadUrl,
  fileName,
}: DocumentViewerProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-[95vw] h-[92vh] p-0 gap-0 flex flex-col overflow-hidden border-primary/20 bg-background/95 backdrop-blur-sm">
        <DialogHeader className="px-4 py-3 border-b border-border shrink-0">
          <div className="flex items-center justify-between gap-3 pr-8">
            <div className="min-w-0">
              <DialogTitle className="font-display text-primary truncate">{title}</DialogTitle>
              <DialogDescription className="sr-only">Document preview</DialogDescription>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button asChild size="sm" variant="outline" className="border-primary/40 text-primary">
                <a href={downloadUrl} download={fileName || undefined}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </a>
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-muted-foreground hover:text-primary"
                onClick={() => onOpenChange(false)}
              >
                <X className="mr-2 h-4 w-4" />
                Close
              </Button>
            </div>
          </div>
        </DialogHeader>
        <div className="flex-1 min-h-0 bg-black/40">
          <iframe
            src={viewUrl}
            title={title}
            className="w-full h-full border-0"
            allow="fullscreen"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
