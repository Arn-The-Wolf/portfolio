import { readJsonAsync } from "@/lib/data-store"
import StarsBackground from "@/components/stars-background"
import ResumeGallery from "@/components/resume-gallery"

export const dynamic = "force-dynamic"

export default async function ResumesPage() {
  const resumes = await readJsonAsync("resumes.json")
  return (
    <div className="relative min-h-screen">
      <StarsBackground />
      <div className="relative z-10">
        <ResumeGallery initialResumes={resumes as Parameters<typeof ResumeGallery>[0]["initialResumes"]} />
      </div>
    </div>
  )
}
