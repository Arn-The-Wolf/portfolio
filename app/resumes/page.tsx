import { readJson } from "@/lib/data-store"
import StarsBackground from "@/components/stars-background"
import ResumeGallery from "@/components/resume-gallery"

export default function ResumesPage() {
  const resumes = readJson("resumes.json")
  return (
    <div className="relative min-h-screen">
      <StarsBackground />
      <div className="relative z-10">
        <ResumeGallery initialResumes={resumes as Parameters<typeof ResumeGallery>[0]["initialResumes"]} />
      </div>
    </div>
  )
}
