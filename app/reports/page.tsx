import { readJson } from "@/lib/data-store"
import ReportsClient from "./reports-client"

export default function ReportsPage() {
  const testimonials = readJson("testimonials.json")
  return <ReportsClient testimonials={testimonials as any[]} />
}
