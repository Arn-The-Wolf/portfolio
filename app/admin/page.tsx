"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Shield,
  Plus,
  Edit,
  Trash2,
  Save,
  LogOut,
  Mail,
  FileText,
  Wrench,
  History,
  Rocket,
  FolderOpen,
  LayoutDashboard,
  Inbox,
  X,
  ExternalLink,
  BookOpen,
  Quote,
} from "lucide-react"
import { PROFILE_IMAGE } from "@/lib/site-images"
import { cn } from "@/lib/utils"

const DOCUMENT_TYPES = ["Resume", "CV", "Cover Letter", "Portfolio", "Certificate", "Transcript", "Reference Letter", "Other"] as const
const FILE_FORMATS = ["PDF", "DOCX", "LINK", "MD"] as const

const NAV = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "missions", label: "Projects", icon: Rocket },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "cases", label: "Case Studies", icon: FolderOpen },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "history", label: "History", icon: History },
  { id: "blog", label: "Blog", icon: BookOpen },
  { id: "testimonials", label: "Testimonials", icon: Quote },
  { id: "messages", label: "Inbox", icon: Inbox },
] as const

type TabId = (typeof NAV)[number]["id"]

export default function AdminDashboard() {
  const router = useRouter()
  const [tab, setTab] = useState<TabId>("overview")
  const [projects, setProjects] = useState<any[]>([])
  const [resumes, setResumes] = useState<any[]>([])
  const [cases, setCases] = useState<any[]>([])
  const [skills, setSkills] = useState<Record<string, any[]>>({})
  const [history, setHistory] = useState<any>({ experience: [], certifications: [] })
  const [messages, setMessages] = useState<any[]>([])
  const [blogPosts, setBlogPosts] = useState<any[]>([])
  const [testimonialsList, setTestimonialsList] = useState<any[]>([])
  const [editing, setEditing] = useState<any>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [docType, setDocType] = useState<string>("Resume")
  const [docFormat, setDocFormat] = useState<string>("PDF")

  const loadAll = useCallback(async () => {
    const [p, r, c, s, h, m, b, t] = await Promise.all([
      fetch("/api/projects").then((x) => x.json()),
      fetch("/api/resumes").then((x) => x.json()),
      fetch("/api/cases").then((x) => x.json()),
      fetch("/api/skills").then((x) => x.json()),
      fetch("/api/history").then((x) => x.json()),
      fetch("/api/messages").then((x) => x.json()),
      fetch("/api/blog").then((x) => x.json()),
      fetch("/api/testimonials").then((x) => x.json()),
    ])
    setProjects(p)
    setResumes(r)
    setCases(c)
    setSkills(s)
    setHistory(h)
    setMessages(m)
    setBlogPosts(b)
    setTestimonialsList(t)
  }, [])

  useEffect(() => { loadAll() }, [loadAll])

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/admin/login")
  }

  const closeForm = () => {
    setFormOpen(false)
    setEditing(null)
  }

  const openCreate = () => {
    setEditing(null)
    setDocType("Resume")
    setDocFormat("PDF")
    setFormOpen(true)
  }

  const openEdit = (item: any, type?: string, format?: string) => {
    setEditing(item)
    if (type) setDocType(type)
    if (format) setDocFormat(format)
    setFormOpen(true)
  }

  const deleteItem = async (type: string, id: number) => {
    if (!confirm("Delete this item?")) return
    await fetch(`/api/${type}/${id}`, { method: "DELETE" })
    loadAll()
  }

  const markRead = async (id: number) => {
    await fetch(`/api/messages/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: true }),
    })
    loadAll()
  }

  const saveProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const body = {
      title: fd.get("title"),
      subtitle: fd.get("subtitle"),
      problem: fd.get("problem"),
      description: fd.get("description"),
      built: fd.get("built"),
      outcome: fd.get("outcome"),
      github: fd.get("github"),
      demo: fd.get("demo"),
      technologies: (fd.get("technologies") as string).split(",").map((t) => t.trim()).filter(Boolean),
      longDescription: fd.get("built") || fd.get("description"),
      status: "Active",
      featured: false,
    }
    const url = editing ? `/api/projects/${editing.id}` : "/api/projects"
    await fetch(url, { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
    closeForm()
    loadAll()
  }

  const saveDocument = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const body = {
      title: fd.get("title"),
      subtitle: fd.get("subtitle"),
      description: fd.get("description"),
      documentType: docType,
      format: docFormat,
      fileUrl: fd.get("fileUrl") || "/api/resume",
      version: fd.get("version"),
      language: fd.get("language"),
      updatedAt: new Date().toISOString().slice(0, 10),
      tags: (fd.get("tags") as string).split(",").map((t) => t.trim()).filter(Boolean),
    }
    const url = editing ? `/api/resumes/${editing.id}` : "/api/resumes"
    await fetch(url, { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
    closeForm()
    loadAll()
  }

  const saveCase = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const body = {
      title: fd.get("title"),
      client: fd.get("client"),
      industry: fd.get("industry"),
      duration: fd.get("duration"),
      team: fd.get("team"),
      challenge: fd.get("challenge"),
      solution: fd.get("solution"),
      technologies: (fd.get("technologies") as string).split(",").map((t) => t.trim()).filter(Boolean),
      image: fd.get("image") || "/images/profile.png",
      testimonial: fd.get("testimonial"),
      testimonialAuthor: fd.get("testimonialAuthor"),
      results: [],
    }
    const url = editing ? `/api/cases/${editing.id}` : "/api/cases"
    await fetch(url, { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
    closeForm()
    loadAll()
  }

  const saveSkills = async () => {
    await fetch("/api/skills", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(skills) })
    alert("Skills saved")
  }

  const saveHistory = async () => {
    await fetch("/api/history", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(history) })
    alert("History saved")
  }

  const saveBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const body = {
      title: fd.get("title"),
      slug: fd.get("slug"),
      excerpt: fd.get("excerpt"),
      content: fd.get("content"),
      author: fd.get("author") || "RUYANGE Arnold",
      date: fd.get("date") || new Date().toISOString().slice(0, 10),
      readTime: fd.get("readTime") || "5 min read",
      category: fd.get("category"),
      tags: (fd.get("tags") as string).split(",").map((t) => t.trim()).filter(Boolean),
      featured: fd.get("featured") === "on",
    }
    const url = editing ? `/api/blog/${editing.id}` : "/api/blog"
    await fetch(url, { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
    closeForm()
    loadAll()
  }

  const saveTestimonial = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const body = {
      name: fd.get("name"),
      role: fd.get("role"),
      company: fd.get("company"),
      content: fd.get("content"),
      project: fd.get("project"),
      date: fd.get("date"),
      rating: parseInt(fd.get("rating") as string, 10) || 5,
    }
    const url = editing ? `/api/testimonials/${editing.id}` : "/api/testimonials"
    await fetch(url, { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
    closeForm()
    loadAll()
  }

  const unread = messages.filter((m) => !m.read).length

  const stats = [
    { label: "Projects", value: projects.length, icon: Rocket, color: "from-green-500/20 to-green-600/5" },
    { label: "Documents", value: resumes.length, icon: FileText, color: "from-blue-500/20 to-blue-600/5" },
    { label: "Case Studies", value: cases.length, icon: FolderOpen, color: "from-purple-500/20 to-purple-600/5" },
    { label: "Skills", value: Object.values(skills).flat().length, icon: Wrench, color: "from-amber-500/20 to-amber-600/5" },
    { label: "Blog", value: blogPosts.length, icon: BookOpen, color: "from-cyan-500/20 to-cyan-600/5" },
    { label: "Testimonials", value: testimonialsList.length, icon: Quote, color: "from-pink-500/20 to-pink-600/5" },
    { label: "Unread", value: unread, icon: Mail, color: "from-red-500/20 to-red-600/5" },
  ]

  const renderListItem = (item: any, type: string, primary: string, secondary?: string, onEdit?: () => void) => (
    <div key={item.id} className="flex justify-between items-center p-4 rounded-xl bg-card/70 border border-border hover:border-border transition-colors group">
      <div className="min-w-0 flex-1">
        <p className="font-mono text-primary truncate">{primary}</p>
        {secondary && <p className="text-xs text-muted-foreground truncate mt-0.5">{secondary}</p>}
      </div>
      <div className="flex gap-1 ml-3 opacity-70 group-hover:opacity-100">
        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-primary" onClick={() => (onEdit ? onEdit() : (setEditing(item), setFormOpen(true)))}>
          <Edit className="h-3.5 w-3.5" />
        </Button>
        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-400" onClick={() => deleteItem(type, item.id)}>
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )

  const panelTitle: Record<string, string> = {
    missions: "Projects",
    documents: "Documents & CVs",
    cases: "Case Studies",
    skills: "Skills",
    history: "Experience & Certifications",
    blog: "Blog Posts",
    testimonials: "Testimonials",
    messages: "Contact Inbox",
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {sidebarOpen && (
        <button className="fixed inset-0 bg-card/80 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close menu" />
      )}

      <aside className={cn(
        "fixed lg:sticky top-0 left-0 z-50 h-screen w-64 border-r border-border bg-background/95 backdrop-blur-xl flex flex-col transition-transform lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-primary/40 shrink-0">
              <Image src={PROFILE_IMAGE} alt="Admin" fill className="object-cover object-top" sizes="40px" />
            </div>
            <div>
              <p className="font-display text-sm text-primary">COMMAND CENTER</p>
              <p className="text-[10px] font-mono text-muted-foreground">ARNOLD.DEV</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { setTab(id); setSidebarOpen(false); closeForm() }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-mono transition-all",
                tab === id
                  ? "bg-primary/15 text-primary border border-border"
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
              {id === "messages" && unread > 0 && (
                <Badge className="ml-auto btn-primary text-[10px] h-5 px-1.5">{unread}</Badge>
              )}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-border space-y-2">
          <Button variant="outline" size="sm" className="w-full border-border text-primary font-mono text-xs" asChild>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3 w-3 mr-2" /> VIEW SITE
            </a>
          </Button>
          <Button variant="outline" size="sm" onClick={logout} className="w-full border-red-400/30 text-red-400 font-mono text-xs">
            <LogOut className="h-3 w-3 mr-2" /> LOGOUT
          </Button>
        </div>
      </aside>

      <main className="flex-1 min-w-0 pt-16 lg:pt-0">
        <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="lg:hidden text-primary" onClick={() => setSidebarOpen(true)}>
                <Shield className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-display text-xl md:text-2xl text-primary">
                  {tab === "overview" ? "Dashboard Overview" : panelTitle[tab]}
                </h1>
                <p className="text-xs font-mono text-muted-foreground hidden sm:block">Secure content management</p>
              </div>
            </div>
            <Badge className="btn-primary font-mono text-xs shrink-0">AUTHENTICATED</Badge>
          </div>
        </header>

        <div className="p-4 lg:p-8 max-w-6xl">
          {tab === "overview" && (
            <div className="space-y-8">
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                {stats.map(({ label, value, icon: Icon, color }) => (
                  <Card key={label} className={cn("bg-gradient-to-br border-border overflow-hidden", color)}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{label}</p>
                          <p className="text-3xl font-display font-bold mt-1">{value}</p>
                        </div>
                        <Icon className="h-5 w-5 text-primary/40" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-card/60 border-border">
                <CardHeader>
                  <CardTitle className="font-display text-primary">Quick Actions</CardTitle>
                  <CardDescription className="text-muted-foreground font-mono text-xs">Jump to any content section</CardDescription>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {NAV.filter((n) => n.id !== "overview").map(({ id, label, icon: Icon }) => (
                    <Button
                      key={id}
                      variant="outline"
                      className="justify-start border-border text-primary hover:bg-green-400/10 font-mono text-xs h-auto py-3"
                      onClick={() => setTab(id)}
                    >
                      <Icon className="h-4 w-4 mr-2 shrink-0" />
                      Manage {label}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {unread > 0 && (
                <Card className="bg-green-400/5 border-border">
                  <CardContent className="p-4 flex items-center justify-between">
                    <p className="font-mono text-sm">{unread} unread message{unread !== 1 ? "s" : ""} awaiting review</p>
                    <Button size="sm" className="btn-primary" onClick={() => setTab("messages")}>Open Inbox</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {tab === "missions" && (
            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground font-mono">{projects.length} project{projects.length !== 1 ? "s" : ""}</p>
                <Button size="sm" className="btn-primary font-mono" onClick={openCreate}>
                  <Plus className="h-4 w-4 mr-1" /> Add Mission
                </Button>
              </div>
              {formOpen && tab === "missions" && (
                <Card className="bg-card/80 border-border">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-sm font-mono text-primary">{editing ? "Edit Mission" : "New Mission"}</CardTitle>
                      <Button variant="ghost" size="sm" onClick={closeForm}><X className="h-4 w-4" /></Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={saveProject} className="space-y-3">
                    <Input name="title" defaultValue={editing?.title} placeholder="Title" className="bg-card/80 border-border text-primary" required />
                    <Input name="subtitle" defaultValue={editing?.subtitle} placeholder="Subtitle" className="bg-card/80 border-border text-primary" />
                    <Textarea name="problem" defaultValue={editing?.problem} placeholder="Problem" className="bg-card/80 border-border text-primary" required />
                    <Textarea name="built" defaultValue={editing?.built} placeholder="What you built" className="bg-card/80 border-border text-primary" required />
                    <Textarea name="description" defaultValue={editing?.description} placeholder="Short summary" className="bg-card/80 border-border text-primary" required />
                    <Textarea name="outcome" defaultValue={editing?.outcome} placeholder="Outcome / results" className="bg-card/80 border-border text-primary" />
                    <Input name="github" defaultValue={editing?.github} placeholder="GitHub URL" className="bg-card/80 border-border text-primary" />
                    <Input name="demo" defaultValue={editing?.demo} placeholder="Demo URL" className="bg-card/80 border-border text-primary" />
                    <Input name="technologies" defaultValue={editing?.technologies?.join(", ")} placeholder="Technologies (comma separated)" className="bg-card/80 border-border text-primary" />
                    <Button type="submit" className="btn-primary"><Save className="h-4 w-4 mr-1" /> Save Project</Button>
                    </form>
                  </CardContent>
                </Card>
              )}
              <div className="space-y-2">
                {projects.map((p) => renderListItem(p, "projects", p.title, p.subtitle))}
              </div>
            </section>
          )}

          {tab === "documents" && (
            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground font-mono">Resumes, CVs, cover letters & more</p>
                <Button size="sm" className="btn-primary font-mono" onClick={openCreate}>
                  <Plus className="h-4 w-4 mr-1" /> Add Document
                </Button>
              </div>
              {formOpen && tab === "documents" && (
                <Card className="bg-card/80 border-border">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-sm font-mono text-primary">{editing ? "Edit Document" : "New Document"}</CardTitle>
                      <Button variant="ghost" size="sm" onClick={closeForm}><X className="h-4 w-4" /></Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={saveDocument} className="grid sm:grid-cols-2 gap-3">
                      <Input name="title" defaultValue={editing?.title} placeholder="Document title" className="bg-card/80 border-border text-primary sm:col-span-2" required />
                      <Input name="subtitle" defaultValue={editing?.subtitle} placeholder="Subtitle" className="bg-card/80 border-border text-primary sm:col-span-2" />
                      <div>
                        <label className="text-xs font-mono text-muted-foreground mb-1 block">Document Type</label>
                        <Select value={docType} onValueChange={setDocType}>
                          <SelectTrigger className="bg-card/80 border-border text-primary">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border-border">
                            {DOCUMENT_TYPES.map((t) => (
                              <SelectItem key={t} value={t} className="font-mono text-primary">{t}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-xs font-mono text-muted-foreground mb-1 block">Format</label>
                        <Select value={docFormat} onValueChange={setDocFormat}>
                          <SelectTrigger className="bg-card/80 border-border text-primary">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border-border">
                            {FILE_FORMATS.map((f) => (
                              <SelectItem key={f} value={f} className="font-mono text-primary">{f}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Input name="fileUrl" defaultValue={editing?.fileUrl || "/api/resume"} placeholder="File URL or /api/resume" className="bg-card/80 border-border text-primary sm:col-span-2" />
                      <Input name="version" defaultValue={editing?.version} placeholder="Version (e.g. 2026)" className="bg-card/80 border-border text-primary" />
                      <Input name="language" defaultValue={editing?.language || "English"} placeholder="Language" className="bg-card/80 border-border text-primary" />
                      <Textarea name="description" defaultValue={editing?.description} placeholder="Description" className="bg-card/80 border-border text-primary sm:col-span-2" />
                      <Input name="tags" defaultValue={editing?.tags?.join(", ")} placeholder="Tags (comma separated)" className="bg-card/80 border-border text-primary sm:col-span-2" />
                      <div className="sm:col-span-2">
                        <Button type="submit" className="btn-primary"><Save className="h-4 w-4 mr-1" /> Save Document</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
              <div className="space-y-2">
                {resumes.map((r) => renderListItem(r, "resumes", r.title, `${r.documentType || r.format} · ${r.fileUrl}`, () => openEdit(r, r.documentType || "Resume", r.format || "PDF")))}
              </div>
            </section>
          )}

          {tab === "cases" && (
            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground font-mono">{cases.length} case stud{cases.length !== 1 ? "ies" : "y"}</p>
                <Button size="sm" className="btn-primary font-mono" onClick={openCreate}>
                  <Plus className="h-4 w-4 mr-1" /> Add Case Study
                </Button>
              </div>
              {formOpen && tab === "cases" && (
                <Card className="bg-card/80 border-border">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-sm font-mono text-primary">{editing ? "Edit Case Study" : "New Case Study"}</CardTitle>
                      <Button variant="ghost" size="sm" onClick={closeForm}><X className="h-4 w-4" /></Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={saveCase} className="space-y-3">
                      <Input name="title" defaultValue={editing?.title} placeholder="Title" className="bg-card/80 border-border text-primary" required />
                      <div className="grid sm:grid-cols-2 gap-3">
                        <Input name="client" defaultValue={editing?.client} placeholder="Client" className="bg-card/80 border-border text-primary" />
                        <Input name="industry" defaultValue={editing?.industry} placeholder="Industry" className="bg-card/80 border-border text-primary" />
                        <Input name="duration" defaultValue={editing?.duration} placeholder="Duration" className="bg-card/80 border-border text-primary" />
                        <Input name="team" defaultValue={editing?.team} placeholder="Team size" className="bg-card/80 border-border text-primary" />
                      </div>
                      <Textarea name="challenge" defaultValue={editing?.challenge} placeholder="Challenge" className="bg-card/80 border-border text-primary" />
                      <Textarea name="solution" defaultValue={editing?.solution} placeholder="Solution" className="bg-card/80 border-border text-primary" />
                      <Input name="technologies" defaultValue={editing?.technologies?.join(", ")} placeholder="Technologies" className="bg-card/80 border-border text-primary" />
                      <Input name="image" defaultValue={editing?.image || "/images/profile.png"} placeholder="Image path" className="bg-card/80 border-border text-primary" />
                      <Input name="testimonial" defaultValue={editing?.testimonial} placeholder="Testimonial quote" className="bg-card/80 border-border text-primary" />
                      <Input name="testimonialAuthor" defaultValue={editing?.testimonialAuthor} placeholder="Testimonial author" className="bg-card/80 border-border text-primary" />
                      <Button type="submit" className="btn-primary"><Save className="h-4 w-4 mr-1" /> Save Case Study</Button>
                    </form>
                  </CardContent>
                </Card>
              )}
              <div className="space-y-2">
                {cases.map((c) => renderListItem(c, "cases", c.title, c.client))}
              </div>
            </section>
          )}

          {tab === "skills" && (
            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground font-mono">Edit skills JSON directly</p>
                <Button size="sm" className="btn-primary font-mono" onClick={saveSkills}>
                  <Save className="h-4 w-4 mr-1" /> Save All
                </Button>
              </div>
              <Textarea
                value={JSON.stringify(skills, null, 2)}
                onChange={(e) => { try { setSkills(JSON.parse(e.target.value)) } catch { /* typing */ } }}
                rows={24}
                className="bg-card/80 border-border text-primary font-mono text-xs"
              />
            </section>
          )}

          {tab === "history" && (
            <section className="space-y-6">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">Education, work, hackathons, freelance — add entries below</p>
                <Button size="sm" className="btn-primary" onClick={saveHistory}>
                  <Save className="h-4 w-4 mr-1" /> Save All
                </Button>
              </div>

              <Card className="bg-card/60 border-border">
                <CardHeader><CardTitle className="text-sm text-primary">Experience</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {history.experience?.map((exp: any, idx: number) => (
                    <div key={exp.id ?? idx} className="p-3 border border-border rounded-lg space-y-2">
                      <div className="grid sm:grid-cols-2 gap-2">
                        <Input value={exp.role} onChange={(e) => { const ex = [...history.experience]; ex[idx] = { ...exp, role: e.target.value }; setHistory({ ...history, experience: ex }) }} placeholder="Role" className="bg-card/80 border-border text-primary text-sm" />
                        <Input value={exp.company} onChange={(e) => { const ex = [...history.experience]; ex[idx] = { ...exp, company: e.target.value }; setHistory({ ...history, experience: ex }) }} placeholder="Company / School" className="bg-card/80 border-border text-primary text-sm" />
                        <Input value={exp.period} onChange={(e) => { const ex = [...history.experience]; ex[idx] = { ...exp, period: e.target.value }; setHistory({ ...history, experience: ex }) }} placeholder="Period" className="bg-card/80 border-border text-primary text-sm" />
                        <Input value={exp.location} onChange={(e) => { const ex = [...history.experience]; ex[idx] = { ...exp, location: e.target.value }; setHistory({ ...history, experience: ex }) }} placeholder="Location" className="bg-card/80 border-border text-primary text-sm" />
                      </div>
                      <Textarea value={exp.description} onChange={(e) => { const ex = [...history.experience]; ex[idx] = { ...exp, description: e.target.value }; setHistory({ ...history, experience: ex }) }} placeholder="Description" className="bg-card/80 border-border text-primary text-sm" />
                      <Input value={exp.technologies?.join(", ")} onChange={(e) => { const ex = [...history.experience]; ex[idx] = { ...exp, technologies: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) }; setHistory({ ...history, experience: ex }) }} placeholder="Technologies (comma separated)" className="bg-card/80 border-border text-primary text-sm" />
                      <Button size="sm" variant="outline" className="border-red-400/30 text-red-400 text-xs" onClick={() => setHistory({ ...history, experience: history.experience.filter((_: any, i: number) => i !== idx) })}>Remove</Button>
                    </div>
                  ))}
                  <Button size="sm" variant="outline" className="border-border text-primary" onClick={() => setHistory({ ...history, experience: [...(history.experience || []), { id: Date.now(), role: "", company: "", location: "", period: "", description: "", technologies: [] }] })}>
                    <Plus className="h-3 w-3 mr-1" /> Add experience
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-card/60 border-border">
                <CardHeader><CardTitle className="text-sm text-primary">Certifications & learning</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {history.certifications?.map((cert: any, idx: number) => (
                    <div key={cert.id ?? idx} className="p-3 border border-border rounded-lg space-y-2">
                      <div className="grid sm:grid-cols-2 gap-2">
                        <Input value={cert.name} onChange={(e) => { const c = [...history.certifications]; c[idx] = { ...cert, name: e.target.value }; setHistory({ ...history, certifications: c }) }} placeholder="Name" className="bg-card/80 border-border text-primary text-sm" />
                        <Input value={cert.issuer} onChange={(e) => { const c = [...history.certifications]; c[idx] = { ...cert, issuer: e.target.value }; setHistory({ ...history, certifications: c }) }} placeholder="Issuer" className="bg-card/80 border-border text-primary text-sm" />
                        <Input value={cert.year} onChange={(e) => { const c = [...history.certifications]; c[idx] = { ...cert, year: e.target.value }; setHistory({ ...history, certifications: c }) }} placeholder="Year" className="bg-card/80 border-border text-primary text-sm" />
                      </div>
                      <Textarea value={cert.description} onChange={(e) => { const c = [...history.certifications]; c[idx] = { ...cert, description: e.target.value }; setHistory({ ...history, certifications: c }) }} placeholder="Description" className="bg-card/80 border-border text-primary text-sm" />
                      <Button size="sm" variant="outline" className="border-red-400/30 text-red-400 text-xs" onClick={() => setHistory({ ...history, certifications: history.certifications.filter((_: any, i: number) => i !== idx) })}>Remove</Button>
                    </div>
                  ))}
                  <Button size="sm" variant="outline" className="border-border text-primary" onClick={() => setHistory({ ...history, certifications: [...(history.certifications || []), { id: Date.now(), name: "", issuer: "", year: "", description: "" }] })}>
                    <Plus className="h-3 w-3 mr-1" /> Add certification
                  </Button>
                </CardContent>
              </Card>
            </section>
          )}

          {tab === "blog" && (
            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">{blogPosts.length} posts</p>
                <Button size="sm" className="btn-primary" onClick={openCreate}>
                  <Plus className="h-4 w-4 mr-1" /> Add Post
                </Button>
              </div>
              {formOpen && tab === "blog" && (
                <Card className="bg-card/80 border-border">
                  <CardContent className="p-6">
                    <form onSubmit={saveBlog} className="space-y-3">
                      <Input name="title" defaultValue={editing?.title} placeholder="Title" className="bg-card/80 border-border text-primary" required />
                      <Input name="slug" defaultValue={editing?.slug} placeholder="url-slug" className="bg-card/80 border-border text-primary" required />
                      <Input name="category" defaultValue={editing?.category} placeholder="Category" className="bg-card/80 border-border text-primary" />
                      <Textarea name="excerpt" defaultValue={editing?.excerpt} placeholder="Excerpt" className="bg-card/80 border-border text-primary" required />
                      <Textarea name="content" defaultValue={editing?.content} placeholder="Full content" rows={8} className="bg-card/80 border-border text-primary" required />
                      <div className="grid sm:grid-cols-2 gap-3">
                        <Input name="date" defaultValue={editing?.date} placeholder="Date YYYY-MM-DD" className="bg-card/80 border-border text-primary" />
                        <Input name="readTime" defaultValue={editing?.readTime} placeholder="5 min read" className="bg-card/80 border-border text-primary" />
                      </div>
                      <Input name="tags" defaultValue={editing?.tags?.join(", ")} placeholder="Tags (comma separated)" className="bg-card/80 border-border text-primary" />
                      <label className="flex items-center gap-2 text-sm text-muted-foreground">
                        <input type="checkbox" name="featured" defaultChecked={editing?.featured} /> Featured post
                      </label>
                      <Button type="submit" className="btn-primary"><Save className="h-4 w-4 mr-1" /> Save Post</Button>
                    </form>
                  </CardContent>
                </Card>
              )}
              {blogPosts.map((post) => renderListItem(post, "blog", post.title, post.category))}
            </section>
          )}

          {tab === "testimonials" && (
            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">{testimonialsList.length} testimonials</p>
                <Button size="sm" className="btn-primary" onClick={openCreate}>
                  <Plus className="h-4 w-4 mr-1" /> Add Testimonial
                </Button>
              </div>
              {formOpen && tab === "testimonials" && (
                <Card className="bg-card/80 border-border">
                  <CardContent className="p-6">
                    <form onSubmit={saveTestimonial} className="space-y-3">
                      <Input name="name" defaultValue={editing?.name} placeholder="Name" className="bg-card/80 border-border text-primary" required />
                      <Input name="role" defaultValue={editing?.role} placeholder="Role" className="bg-card/80 border-border text-primary" />
                      <Input name="company" defaultValue={editing?.company} placeholder="Company" className="bg-card/80 border-border text-primary" />
                      <Textarea name="content" defaultValue={editing?.content} placeholder="Quote" className="bg-card/80 border-border text-primary" required />
                      <Input name="project" defaultValue={editing?.project} placeholder="Related project" className="bg-card/80 border-border text-primary" />
                      <div className="grid sm:grid-cols-2 gap-3">
                        <Input name="date" defaultValue={editing?.date} placeholder="Date" className="bg-card/80 border-border text-primary" />
                        <Input name="rating" type="number" min={1} max={5} defaultValue={editing?.rating || 5} placeholder="Rating 1-5" className="bg-card/80 border-border text-primary" />
                      </div>
                      <Button type="submit" className="btn-primary"><Save className="h-4 w-4 mr-1" /> Save Testimonial</Button>
                    </form>
                  </CardContent>
                </Card>
              )}
              {testimonialsList.map((t) => renderListItem(t, "testimonials", t.name, t.role))}
            </section>
          )}

          {tab === "messages" && (
            <section className="space-y-4">
              <p className="text-sm text-muted-foreground font-mono">{messages.length} total · {unread} unread</p>
              {messages.length === 0 && <p className="text-muted-foreground font-mono text-sm py-8 text-center">No messages yet</p>}
              {messages.map((msg) => (
                <Card key={msg.id} className={cn("bg-card/70 border-border", msg.read && "opacity-60")}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <CardTitle className="text-sm font-mono text-primary">{msg.name}</CardTitle>
                        <CardDescription className="text-xs">{msg.email} · {new Date(msg.createdAt).toLocaleString()}</CardDescription>
                      </div>
                      {!msg.read && <Badge className="btn-primary text-xs shrink-0">NEW</Badge>}
                    </div>
                    <p className="text-xs font-mono text-muted-foreground mt-1">RE: {msg.subject}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80 text-sm mb-4 leading-relaxed">{msg.message}</p>
                    <div className="flex gap-2">
                      {!msg.read && (
                        <Button size="sm" variant="outline" className="border-border text-xs font-mono" onClick={() => markRead(msg.id)}>
                          Mark Read
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="border-red-400/30 text-red-400 text-xs" onClick={() => deleteItem("messages", msg.id)}>
                        <Trash2 className="h-3 w-3 mr-1" /> Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </section>
          )}
        </div>
      </main>
    </div>
  )
}
