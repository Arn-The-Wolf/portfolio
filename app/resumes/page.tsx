import { getResumes } from "@/lib/resumes-store"
import StarsBackground from "@/components/stars-background"
import ResumeGallery from "@/components/resume-gallery"

export const dynamic = "force-dynamic"

export default async function ResumesPage() {
  const resumes = await getResumes()
  return (
    <div className="relative min-h-screen">
      <StarsBackground />
      <div className="relative z-10">
        <ResumeGallery initialResumes={resumes} />
      </div>
    </div>
  )
}
