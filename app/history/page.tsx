import { readJson } from "@/lib/data-store"
import HistoryClient from "./history-client"

export default function HistoryPage() {
  const history = readJson<{ experience: any[]; certifications: any[] }>("history.json")
  return <HistoryClient initialHistory={history} />
}
