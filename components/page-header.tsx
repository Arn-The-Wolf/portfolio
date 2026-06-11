import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface PageHeaderProps {
  title: string
  subtitle?: string
  eyebrow?: string
  icon?: LucideIcon
  className?: string
  centered?: boolean
}

export default function PageHeader({
  title,
  subtitle,
  eyebrow,
  icon: Icon,
  className,
  centered = true,
}: PageHeaderProps) {
  return (
    <header className={cn(centered && "text-center", "mb-12", className)}>
      {(eyebrow || Icon) && (
        <div className={cn("page-eyebrow mb-4", centered && "mx-auto w-fit")}>
          {Icon && <Icon className="h-4 w-4 text-primary" />}
          {eyebrow && <span>{eyebrow}</span>}
        </div>
      )}
      <h1 className="page-title mb-3">{title}</h1>
      {subtitle && <p className="page-subtitle">{subtitle}</p>}
    </header>
  )
}
