"use client"

import { useState, useTransition } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Github, Linkedin, Terminal, Send } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { sendContactEmail } from "@/app/actions"
import { SpaceHud3D } from "@/components/space-hud-3d"

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
        toast({ title: "Transmission Successful", description: result.message })
        form.reset()
      } else {
        toast({ title: "Transmission Error", description: result.message, variant: "destructive" })
      }
    })
  }

  return (
    <div className="relative min-h-screen">
      <SpaceHud3D />
      <section className="relative z-10 pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-display font-bold mb-12 text-center text-green-400"
          >
            <span className="text-green-500">{">"}</span> ESTABLISH CONTACT
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h3 className="font-display text-xl text-green-400 mb-6">TRANSMISSION DETAILS</h3>
              <p className="text-gray-400 mb-8">
                Ready to deploy on your next mission? Establish secure communications below or use direct channels.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Mail, title: "EMAIL", value: "arnwolfie5@gmail.com" },
                  { icon: Github, title: "GITHUB", value: "Arn-The-Wolf" },
                  { icon: Linkedin, title: "LINKEDIN", value: "linkedin.com" },
                  { icon: Terminal, title: "STATUS", value: "Available" },
                ].map(({ icon: Icon, title, value }) => (
                  <Card key={title} className="bg-black/50 border-green-400/20 backdrop-blur-md">
                    <CardContent className="p-4 text-center">
                      <Icon className="h-6 w-6 text-green-400 mx-auto mb-2" />
                      <p className="font-mono text-xs text-green-400">{title}</p>
                      <p className="text-gray-400 text-xs mt-1">{value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Card className="bg-black/50 border-green-400/20 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="font-display text-green-400">SECURE TRANSMISSION</CardTitle>
                  <CardDescription className="text-gray-500">Encrypted channel — all fields required</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono text-green-400/70">CODENAME</label>
                        <input name="name" required className="w-full mt-1 bg-black/60 border border-green-400/30 rounded-md p-2 text-green-400 text-sm focus:outline-none focus:ring-1 focus:ring-green-400" />
                      </div>
                      <div>
                        <label className="text-xs font-mono text-green-400/70">EMAIL</label>
                        <input name="email" type="email" required className="w-full mt-1 bg-black/60 border border-green-400/30 rounded-md p-2 text-green-400 text-sm focus:outline-none focus:ring-1 focus:ring-green-400" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-mono text-green-400/70">SUBJECT</label>
                      <input name="subject" required className="w-full mt-1 bg-black/60 border border-green-400/30 rounded-md p-2 text-green-400 text-sm focus:outline-none focus:ring-1 focus:ring-green-400" />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-green-400/70">MESSAGE</label>
                      <textarea name="message" rows={5} required className="w-full mt-1 bg-black/60 border border-green-400/30 rounded-md p-2 text-green-400 text-sm focus:outline-none focus:ring-1 focus:ring-green-400" />
                    </div>
                    <Button type="submit" disabled={isPending} className="w-full bg-green-600 hover:bg-green-500 text-black font-mono">
                      {isPending ? "TRANSMITTING..." : <><Send className="mr-2 h-4 w-4" /> TRANSMIT MESSAGE</>}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
