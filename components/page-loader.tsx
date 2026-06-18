import { Shield } from "lucide-react"
import { cn } from "@/lib/utils"

interface PageLoaderProps {
  label?: string
  className?: string
  fullScreen?: boolean
}

export default function PageLoader({
  label = "Loading secure channel…",
  className,
  fullScreen = false,
}: PageLoaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-5 px-4",
        fullScreen ? "min-h-screen" : "min-h-[60vh]",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="relative h-14 w-14">
        <div className="absolute inset-0 rounded-full border-2 border-primary/15 border-t-primary animate-spin" />
        <div className="absolute inset-2 rounded-full border border-primary/10 border-b-primary/40 animate-spin [animation-duration:2s] [animation-direction:reverse]" />
        <Shield className="absolute inset-0 m-auto h-5 w-5 text-primary/70 animate-pulse" />
      </div>
      <div className="text-center space-y-2">
        <p className="font-display text-sm text-primary tracking-widest uppercase">{label}</p>
        <div className="flex justify-center gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1 w-1 rounded-full bg-primary/60 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
