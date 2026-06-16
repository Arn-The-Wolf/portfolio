import { readJsonAsync } from "@/lib/data-store"
import HistoryClient from "./history-client"

export const dynamic = "force-dynamic"

export default async function HistoryPage() {
  const history = await readJsonAsync<{ experience: any[]; certifications: any[] }>("history.json")
  return <HistoryClient initialHistory={history} />
}
