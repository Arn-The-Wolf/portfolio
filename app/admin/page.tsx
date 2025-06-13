"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, FileText, Users, BarChart3, Mail, Shield, Plus, Edit, Trash2, Save, Eye } from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-black text-green-400 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold font-mono">
            <span className="text-green-400">{">"}</span> COMMAND CENTER
          </h1>
          <Badge className="bg-green-600 text-black font-mono">ADMIN ACCESS</Badge>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-black/60">
            <TabsTrigger value="overview" className="font-mono">
              OVERVIEW
            </TabsTrigger>
            <TabsTrigger value="content" className="font-mono">
              CONTENT
            </TabsTrigger>
            <TabsTrigger value="projects" className="font-mono">
              PROJECTS
            </TabsTrigger>
            <TabsTrigger value="messages" className="font-mono">
              MESSAGES
            </TabsTrigger>
            <TabsTrigger value="analytics" className="font-mono">
              ANALYTICS
            </TabsTrigger>
            <TabsTrigger value="settings" className="font-mono">
              SETTINGS
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-black/40 border-green-400/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Total Projects</p>
                      <p className="text-2xl font-bold text-green-400">12</p>
                    </div>
                    <FileText className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-black/40 border-green-400/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Blog Posts</p>
                      <p className="text-2xl font-bold text-green-400">8</p>
                    </div>
                    <FileText className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-black/40 border-green-400/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Messages</p>
                      <p className="text-2xl font-bold text-green-400">23</p>
                    </div>
                    <Mail className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-black/40 border-green-400/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Visitors</p>
                      <p className="text-2xl font-bold text-green-400">1,247</p>
                    </div>
                    <Users className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-black/40 border-green-400/20">
              <CardHeader>
                <CardTitle className="font-mono text-green-400">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-black/60 rounded">
                    <span>New contact message from Sarah Johnson</span>
                    <Badge variant="outline" className="border-green-400 text-green-400">
                      2 min ago
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-black/60 rounded">
                    <span>Blog post "React Performance" published</span>
                    <Badge variant="outline" className="border-green-400 text-green-400">
                      1 hour ago
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-black/60 rounded">
                    <span>Project "E-commerce Platform" updated</span>
                    <Badge variant="outline" className="border-green-400 text-green-400">
                      3 hours ago
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold font-mono text-green-400">Content Management</h2>
              <Button className="bg-green-600 hover:bg-green-700 text-black font-mono">
                <Plus className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </div>

            <Card className="bg-black/40 border-green-400/20">
              <CardHeader>
                <CardTitle className="font-mono text-green-400">Blog Posts</CardTitle>
                <CardDescription>Manage your technical articles and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((post) => (
                    <div key={post} className="flex items-center justify-between p-4 bg-black/60 rounded">
                      <div>
                        <h3 className="font-mono text-green-400">Advanced React Performance Optimization</h3>
                        <p className="text-sm text-gray-400">Published on Jan 15, 2024</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="border-green-400 text-green-400">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-green-400 text-green-400">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-400 text-red-400">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold font-mono text-green-400">Project Management</h2>
              <Button className="bg-green-600 hover:bg-green-700 text-black font-mono">
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </div>

            <Card className="bg-black/40 border-green-400/20">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-mono mb-2">Project Title</label>
                    <Input
                      placeholder="Enter project title..."
                      className="bg-black/60 border-green-400/30 text-green-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-mono mb-2">Description</label>
                    <Textarea
                      placeholder="Enter project description..."
                      className="bg-black/60 border-green-400/30 text-green-400"
                      rows={4}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-mono mb-2">GitHub URL</label>
                      <Input
                        placeholder="https://github.com/..."
                        className="bg-black/60 border-green-400/30 text-green-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-mono mb-2">Demo URL</label>
                      <Input
                        placeholder="https://demo.com/..."
                        className="bg-black/60 border-green-400/30 text-green-400"
                      />
                    </div>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700 text-black font-mono">
                    <Save className="mr-2 h-4 w-4" />
                    Save Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <h2 className="text-2xl font-bold font-mono text-green-400">Contact Messages</h2>

            <Card className="bg-black/40 border-green-400/20">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((message) => (
                    <div key={message} className="p-4 bg-black/60 rounded border border-green-400/20">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-mono text-green-400">Sarah Johnson</h3>
                          <p className="text-sm text-gray-400">sarah@techcorp.com</p>
                        </div>
                        <Badge variant="outline" className="border-green-400 text-green-400">
                          2 hours ago
                        </Badge>
                      </div>
                      <h4 className="font-mono text-white mb-2">Project Collaboration Inquiry</h4>
                      <p className="text-gray-300 text-sm">
                        Hi Arnold, I'm interested in discussing a potential collaboration on a fintech project...
                      </p>
                      <div className="flex space-x-2 mt-3">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-black font-mono">
                          Reply
                        </Button>
                        <Button size="sm" variant="outline" className="border-green-400 text-green-400">
                          Mark Read
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold font-mono text-green-400">Analytics Dashboard</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-black/40 border-green-400/20">
                <CardHeader>
                  <CardTitle className="font-mono text-green-400 flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Traffic
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Page Views</span>
                      <span className="text-green-400">3,891</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Unique Visitors</span>
                      <span className="text-green-400">1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bounce Rate</span>
                      <span className="text-green-400">23%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-green-400/20">
                <CardHeader>
                  <CardTitle className="font-mono text-green-400">Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Load Time</span>
                      <span className="text-green-400">0.8s</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Uptime</span>
                      <span className="text-green-400">99.9%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Speed Score</span>
                      <span className="text-green-400">95/100</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-green-400/20">
                <CardHeader>
                  <CardTitle className="font-mono text-green-400">Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Avg. Session</span>
                      <span className="text-green-400">3:42</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Contact Forms</span>
                      <span className="text-green-400">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Downloads</span>
                      <span className="text-green-400">156</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold font-mono text-green-400">System Settings</h2>

            <Card className="bg-black/40 border-green-400/20">
              <CardHeader>
                <CardTitle className="font-mono text-green-400 flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  General Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-mono mb-2">Site Title</label>
                  <Input
                    defaultValue="RUYANGE Arnold - Elite Fullstack Engineer"
                    className="bg-black/60 border-green-400/30 text-green-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-mono mb-2">Site Description</label>
                  <Textarea
                    defaultValue="Professional portfolio of RUYANGE Arnold, elite fullstack engineer"
                    className="bg-black/60 border-green-400/30 text-green-400"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-mono mb-2">Contact Email</label>
                  <Input defaultValue="arnold@operative.dev" className="bg-black/60 border-green-400/30 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-green-400/20">
              <CardHeader>
                <CardTitle className="font-mono text-green-400 flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Two-Factor Authentication</span>
                  <Badge className="bg-green-600 text-black">ENABLED</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>SSL Certificate</span>
                  <Badge className="bg-green-600 text-black">ACTIVE</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Firewall Protection</span>
                  <Badge className="bg-green-600 text-black">ACTIVE</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
