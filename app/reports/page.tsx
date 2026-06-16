import { readJsonAsync } from "@/lib/data-store"
import ReportsClient from "./reports-client"

export const dynamic = "force-dynamic"

export default async function ReportsPage() {
  const testimonials = await readJsonAsync("testimonials.json")
  return <ReportsClient testimonials={testimonials as any[]} />
}
