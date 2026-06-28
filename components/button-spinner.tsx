import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ButtonSpinnerProps {
  label?: string
  className?: string
}

/** Inline spinner for buttons and form actions. */
export default function ButtonSpinner({
  label = "Loading…",
  className,
}: ButtonSpinnerProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
      <span>{label}</span>
    </span>
  )
}
