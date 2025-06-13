"use client"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Award, GraduationCap } from "lucide-react"
import { professionalData } from "@/lib/professional-data"

export default function ProfessionalResume() {
  const { personal, bio, experience, skills, certifications, awards, education } = professionalData

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-gray-900 print:p-0">
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-gray-200 pb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{personal.name}</h1>
        <h2 className="text-xl text-gray-600 mb-4">{personal.title}</h2>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-1" />
            {personal.email}
          </div>
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-1" />
            {personal.phone}
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {personal.location}
          </div>
          <div className="flex items-center">
            <Globe className="h-4 w-4 mr-1" />
            {personal.website}
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <div className="flex items-center text-sm text-gray-600">
            <Github className="h-4 w-4 mr-1" />
            {personal.github}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Linkedin className="h-4 w-4 mr-1" />
            {personal.linkedin}
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      <section className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">PROFESSIONAL SUMMARY</h3>
        <p className="text-gray-700 leading-relaxed">{bio.long}</p>
      </section>

      {/* Core Competencies */}
      <section className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">CORE COMPETENCIES</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Frontend Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {skills.frontend.slice(0, 6).map((skill) => (
                <Badge key={skill.name} variant="secondary" className="text-xs">
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Backend Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {skills.backend.slice(0, 6).map((skill) => (
                <Badge key={skill.name} variant="secondary" className="text-xs">
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">DevOps & Cloud</h4>
            <div className="flex flex-wrap gap-2">
              {skills.devops.slice(0, 6).map((skill) => (
                <Badge key={skill.name} variant="secondary" className="text-xs">
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Mobile Development</h4>
            <div className="flex flex-wrap gap-2">
              {skills.mobile.map((skill) => (
                <Badge key={skill.name} variant="secondary" className="text-xs">
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Experience */}
      <section className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">PROFESSIONAL EXPERIENCE</h3>
        <div className="space-y-6">
          {experience.map((exp, index) => (
            <div key={index} className="border-l-2 border-gray-300 pl-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{exp.role}</h4>
                  <p className="text-gray-700 font-medium">
                    {exp.company} • {exp.location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 font-medium">{exp.period}</p>
                  <p className="text-sm text-gray-500">{exp.duration}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-3">{exp.description}</p>
              <div className="mb-3">
                <h5 className="font-semibold text-gray-900 mb-2">Key Achievements:</h5>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-sm">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
          CERTIFICATIONS & CREDENTIALS
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {certifications.map((cert, index) => (
            <div key={index} className="border border-gray-200 rounded p-3">
              <h4 className="font-semibold text-gray-900">{cert.name}</h4>
              <p className="text-gray-600">{cert.issuer}</p>
              <p className="text-sm text-gray-500">
                {cert.year} • ID: {cert.credentialId}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">AWARDS & RECOGNITION</h3>
        <div className="space-y-3">
          {awards.map((award, index) => (
            <div key={index} className="flex items-start">
              <Award className="h-5 w-5 text-gray-600 mr-3 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900">{award.title}</h4>
                <p className="text-gray-600">
                  {award.issuer} • {award.year}
                </p>
                <p className="text-sm text-gray-700">{award.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">EDUCATION</h3>
        <div className="flex items-start">
          <GraduationCap className="h-5 w-5 text-gray-600 mr-3 mt-0.5" />
          <div>
            <h4 className="font-semibold text-gray-900">Bachelor of Science in Computer Science</h4>
            <p className="text-gray-600">Stanford University • 2012-2016</p>
            <p className="text-sm text-gray-700">Magna Cum Laude • GPA: 3.8/4.0</p>
            <p className="text-sm text-gray-700">
              Relevant Coursework: Data Structures, Algorithms, Software Engineering, Database Systems
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 border-t border-gray-200 pt-4">
        <p>References available upon request</p>
        <p className="mt-2">This resume is also available online at {personal.website}</p>
      </div>
    </div>
  )
}
