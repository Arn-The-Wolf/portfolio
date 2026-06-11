import { cn } from "@/lib/utils"
import Image from "next/image"
import { PROFILE_IMAGE } from "@/lib/site-images"

function initialsFromName(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

interface PersonAvatarProps {
  name: string
  src?: string
  className?: string
  useProfileFallback?: boolean
}

export default function PersonAvatar({ name, src, className, useProfileFallback }: PersonAvatarProps) {
  const resolved = src && !src.includes("placeholder") ? src : useProfileFallback ? PROFILE_IMAGE : undefined

  if (resolved) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image src={resolved} alt={name} fill className="object-cover" sizes="48px" />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center bg-gradient-to-br from-green-400/30 to-green-600/10 text-green-400 font-mono font-bold border border-green-400/30",
        className
      )}
      aria-hidden
    >
      {initialsFromName(name)}
    </div>
  )
}
