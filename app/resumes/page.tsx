"use client"

import { SpaceHud3D } from "@/components/space-hud-3d"
import ResumeGallery from "@/components/resume-gallery"

export default function ResumesPage() {
  return (
    <div className="relative min-h-screen">
      <SpaceHud3D variant="default" />
      <div className="relative z-10">
        <ResumeGallery />
      </div>
    </div>
  )
}
