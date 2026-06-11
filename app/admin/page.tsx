"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Plus, Edit, Trash2, Save, LogOut, Mail, FileText, Wrench, History, Rocket } from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()
  const [tab, setTab] = useState("missions")
  const [projects, setProjects] = useState<any[]>([])
  const [resumes, setResumes] = useState<any[]>([])
  const [skills, setSkills] = useState<Record<string, any[]>>({})
  const [history, setHistory] = useState<any>({ experience: [], certifications: [] })
  const [messages, setMessages] = useState<any[]>([])
  const [editing, setEditing] = useState<any>(null)
  const [formOpen, setFormOpen] = useState(false)

  const loadAll = useCallback(async () => {
    const [p, r, s, h, m] = await Promise.all([
      fetch("/api/projects").then((x) => x.json()),
      fetch("/api/resumes").then((x) => x.json()),
      fetch("/api/skills").then((x) => x.json()),
      fetch("/api/history").then((x) => x.json()),
      fetch("/api/messages").then((x) => x.json()),
    ])
    setProjects(p)
    setResumes(r)
    setSkills(s)
    setHistory(h)
    setMessages(m)
  }, [])

  useEffect(() => { loadAll() }, [loadAll])

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/admin/login")
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
      description: fd.get("description"),
      github: fd.get("github"),
      demo: fd.get("demo"),
      technologies: (fd.get("technologies") as string).split(",").map((t) => t.trim()).filter(Boolean),
      longDescription: fd.get("description"),
      status: "ACTIVE",
      featured: false,
    }
    const url = editing ? `/api/projects/${editing.id}` : "/api/projects"
    await fetch(url, { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
    setFormOpen(false)
    setEditing(null)
    loadAll()
  }

  const saveResume = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const body = {
      title: fd.get("title"),
      subtitle: fd.get("subtitle"),
      description: fd.get("description"),
      format: "PDF",
      fileUrl: fd.get("fileUrl") || "/api/resume",
      version: fd.get("version"),
      language: fd.get("language"),
      tags: (fd.get("tags") as string).split(",").map((t) => t.trim()).filter(Boolean),
    }
    const url = editing ? `/api/resumes/${editing.id}` : "/api/resumes"
    await fetch(url, { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
    setFormOpen(false)
    setEditing(null)
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

  return (
    <div className="min-h-screen bg-black text-green-400 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl flex items-center gap-2">
            <Shield className="h-8 w-8" /> COMMAND CENTER
          </h1>
          <div className="flex gap-2">
            <Badge className="bg-green-600 text-black">AUTHENTICATED</Badge>
            <Button variant="outline" size="sm" onClick={logout} className="border-red-400/50 text-red-400">
              <LogOut className="h-4 w-4 mr-1" /> LOGOUT
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: "Missions", value: projects.length, icon: Rocket },
            { label: "Resumes", value: resumes.length, icon: FileText },
            { label: "Skills", value: Object.values(skills).flat().length, icon: Wrench },
            { label: "History", value: history.experience?.length || 0, icon: History },
            { label: "Messages", value: messages.filter((m) => !m.read).length, icon: Mail },
          ].map(({ label, value, icon: Icon }) => (
            <Card key={label} className="bg-black/40 border-green-400/20">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">{label}</p>
                  <p className="text-2xl font-display font-bold">{value}</p>
                </div>
                <Icon className="h-6 w-6 text-green-400/50" />
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="bg-black/60 border border-green-400/20 flex flex-wrap h-auto gap-1 p-1">
            {["missions", "resumes", "skills", "history", "messages"].map((t) => (
              <TabsTrigger key={t} value={t} className="font-mono text-xs uppercase">{t}</TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="missions" className="mt-6 space-y-4">
            <div className="flex justify-between">
              <h2 className="font-display text-xl">Missions</h2>
              <Button size="sm" className="bg-green-600 text-black" onClick={() => { setEditing(null); setFormOpen(true) }}>
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
            {formOpen && tab === "missions" && (
              <Card className="bg-black/40 border-green-400/20">
                <CardContent className="p-6">
                  <form onSubmit={saveProject} className="space-y-3">
                    <Input name="title" defaultValue={editing?.title} placeholder="Title" className="bg-black/60 border-green-400/30 text-green-400" required />
                    <Input name="subtitle" defaultValue={editing?.subtitle} placeholder="Subtitle" className="bg-black/60 border-green-400/30 text-green-400" />
                    <Textarea name="description" defaultValue={editing?.description} placeholder="Description" className="bg-black/60 border-green-400/30 text-green-400" required />
                    <Input name="github" defaultValue={editing?.github} placeholder="GitHub URL" className="bg-black/60 border-green-400/30 text-green-400" />
                    <Input name="technologies" defaultValue={editing?.technologies?.join(", ")} placeholder="Tech (comma separated)" className="bg-black/60 border-green-400/30 text-green-400" />
                    <div className="flex gap-2">
                      <Button type="submit" className="bg-green-600 text-black"><Save className="h-4 w-4 mr-1" /> Save</Button>
                      <Button type="button" variant="ghost" onClick={() => setFormOpen(false)}>Cancel</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
            {projects.map((p) => (
              <div key={p.id} className="flex justify-between items-center p-4 bg-black/40 border border-green-400/10 rounded-lg">
                <div>
                  <p className="font-mono text-green-400">{p.title}</p>
                  <p className="text-xs text-gray-500">{p.subtitle}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-green-400/30" onClick={() => { setEditing(p); setFormOpen(true) }}><Edit className="h-3 w-3" /></Button>
                  <Button size="sm" variant="outline" className="border-red-400/30 text-red-400" onClick={() => deleteItem("projects", p.id)}><Trash2 className="h-3 w-3" /></Button>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="resumes" className="mt-6 space-y-4">
            <div className="flex justify-between">
              <h2 className="font-display text-xl">Resumes / CVs</h2>
              <Button size="sm" className="bg-green-600 text-black" onClick={() => { setEditing(null); setFormOpen(true) }}>
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
            {formOpen && tab === "resumes" && (
              <Card className="bg-black/40 border-green-400/20">
                <CardContent className="p-6">
                  <form onSubmit={saveResume} className="space-y-3">
                    <Input name="title" defaultValue={editing?.title} placeholder="Title" className="bg-black/60 border-green-400/30 text-green-400" required />
                    <Input name="subtitle" defaultValue={editing?.subtitle} placeholder="Subtitle" className="bg-black/60 border-green-400/30 text-green-400" />
                    <Textarea name="description" defaultValue={editing?.description} placeholder="Description" className="bg-black/60 border-green-400/30 text-green-400" />
                    <Input name="fileUrl" defaultValue={editing?.fileUrl || "/api/resume"} placeholder="Download URL" className="bg-black/60 border-green-400/30 text-green-400" />
                    <Input name="version" defaultValue={editing?.version} placeholder="Version" className="bg-black/60 border-green-400/30 text-green-400" />
                    <Input name="tags" defaultValue={editing?.tags?.join(", ")} placeholder="Tags (comma separated)" className="bg-black/60 border-green-400/30 text-green-400" />
                    <div className="flex gap-2">
                      <Button type="submit" className="bg-green-600 text-black"><Save className="h-4 w-4 mr-1" /> Save</Button>
                      <Button type="button" variant="ghost" onClick={() => setFormOpen(false)}>Cancel</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
            {resumes.map((r) => (
              <div key={r.id} className="flex justify-between items-center p-4 bg-black/40 border border-green-400/10 rounded-lg">
                <div>
                  <p className="font-mono text-green-400">{r.title}</p>
                  <p className="text-xs text-gray-500">{r.format} · {r.fileUrl}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-green-400/30" onClick={() => { setEditing(r); setFormOpen(true) }}><Edit className="h-3 w-3" /></Button>
                  <Button size="sm" variant="outline" className="border-red-400/30 text-red-400" onClick={() => deleteItem("resumes", r.id)}><Trash2 className="h-3 w-3" /></Button>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="skills" className="mt-6">
            <div className="flex justify-between mb-4">
              <h2 className="font-display text-xl">Skills (JSON)</h2>
              <Button size="sm" className="bg-green-600 text-black" onClick={saveSkills}><Save className="h-4 w-4 mr-1" /> Save All</Button>
            </div>
            <Textarea
              value={JSON.stringify(skills, null, 2)}
              onChange={(e) => { try { setSkills(JSON.parse(e.target.value)) } catch { /* typing */ } }}
              rows={20}
              className="bg-black/60 border-green-400/30 text-green-400 font-mono text-xs"
            />
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <div className="flex justify-between mb-4">
              <h2 className="font-display text-xl">History (JSON)</h2>
              <Button size="sm" className="bg-green-600 text-black" onClick={saveHistory}><Save className="h-4 w-4 mr-1" /> Save All</Button>
            </div>
            <Textarea
              value={JSON.stringify(history, null, 2)}
              onChange={(e) => { try { setHistory(JSON.parse(e.target.value)) } catch { /* typing */ } }}
              rows={20}
              className="bg-black/60 border-green-400/30 text-green-400 font-mono text-xs"
            />
          </TabsContent>

          <TabsContent value="messages" className="mt-6 space-y-4">
            <h2 className="font-display text-xl mb-4">Contact Messages</h2>
            {messages.length === 0 && <p className="text-gray-500 font-mono text-sm">No messages yet</p>}
            {messages.map((msg) => (
              <Card key={msg.id} className={`bg-black/40 border-green-400/20 ${msg.read ? "opacity-60" : ""}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-sm font-mono text-green-400">{msg.name} — {msg.subject}</CardTitle>
                    {!msg.read && <Badge className="bg-green-600 text-black text-xs">NEW</Badge>}
                  </div>
                  <p className="text-xs text-gray-500">{msg.email} · {new Date(msg.createdAt).toLocaleString()}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm mb-3">{msg.message}</p>
                  <div className="flex gap-2">
                    {!msg.read && (
                      <Button size="sm" variant="outline" className="border-green-400/30 text-xs" onClick={() => markRead(msg.id)}>
                        Mark Read
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="border-red-400/30 text-red-400 text-xs" onClick={() => deleteItem("messages", msg.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
