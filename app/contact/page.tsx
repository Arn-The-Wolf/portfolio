"use client"

import { useTransition } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Github, Linkedin, Send } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { sendContactEmail } from "@/app/actions"
import StarsBackground from "@/components/stars-background"

export default function ContactPage() {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    startTransition(async () => {
      const result = await sendContactEmail(formData)
      if (result.success) {
        toast({ title: "Message sent", description: result.message })
        form.reset()
      } else {
        toast({ title: "Could not send", description: result.message, variant: "destructive" })
      }
    })
  }

  return (
    <div className="relative min-h-screen">
      <StarsBackground />
      <section className="relative z-10 pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-display font-bold mb-12 text-center text-green-400">Contact</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl text-green-400 mb-6">Get in touch</h3>
              <p className="text-gray-400 mb-8">
                Open to internships, collaborations, and junior developer roles. Send a message or reach out directly.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Mail, title: "Email", value: "ruyangearnold@gmail.com" },
                  { icon: Github, title: "GitHub", value: "Arn-The-Wolf" },
                  { icon: Linkedin, title: "LinkedIn", value: "Coming soon" },
                  { icon: Send, title: "Status", value: "Available" },
                ].map(({ icon: Icon, title, value }) => (
                  <Card key={title} className="bg-black/50 border-green-400/20 backdrop-blur-md">
                    <CardContent className="p-4 text-center">
                      <Icon className="h-6 w-6 text-green-400 mx-auto mb-2" />
                      <p className="text-xs text-green-400">{title}</p>
                      <p className="text-gray-400 text-xs mt-1">{value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <Card className="bg-black/50 border-green-400/20 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-green-400">Send a message</CardTitle>
                <CardDescription className="text-gray-500">All fields are required</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-400">Name</label>
                      <input name="name" required className="w-full mt-1 bg-black/60 border border-green-400/30 rounded-md p-2 text-green-400 text-sm focus:outline-none focus:ring-1 focus:ring-green-400" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400">Email</label>
                      <input name="email" type="email" required className="w-full mt-1 bg-black/60 border border-green-400/30 rounded-md p-2 text-green-400 text-sm focus:outline-none focus:ring-1 focus:ring-green-400" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400">Subject</label>
                    <input name="subject" required className="w-full mt-1 bg-black/60 border border-green-400/30 rounded-md p-2 text-green-400 text-sm focus:outline-none focus:ring-1 focus:ring-green-400" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400">Message</label>
                    <textarea name="message" rows={5} required className="w-full mt-1 bg-black/60 border border-green-400/30 rounded-md p-2 text-green-400 text-sm focus:outline-none focus:ring-1 focus:ring-green-400" />
                  </div>
                  <Button type="submit" disabled={isPending} className="w-full bg-green-600 hover:bg-green-500 text-black">
                    {isPending ? "Sending..." : "Send message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
