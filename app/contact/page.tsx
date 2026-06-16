"use client"

import { useRef, useState, useTransition } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Github, Linkedin, Send, CheckCircle2, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { sendContactEmail } from "@/app/actions"
import StarsBackground from "@/components/stars-background"
import PageHeader from "@/components/page-header"
import { siteConfig } from "@/lib/site-config"

type FormStatus = { type: "success" | "error"; message: string } | null

export default function ContactPage() {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [status, setStatus] = useState<FormStatus>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus(null)
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const result = await sendContactEmail(formData)

      if (result.success) {
        setStatus({ type: "success", message: result.message })
        toast({ title: "Message sent", description: result.message })
        formRef.current?.reset()
      } else {
        setStatus({ type: "error", message: result.message })
        toast({
          title: "Could not send message",
          description: result.message,
          variant: "destructive",
        })
      }
    })
  }

  return (
    <div className="relative min-h-screen">
      <StarsBackground />
      <section className="relative z-10 pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <PageHeader
            title="Contact"
            subtitle="Open to internships, collaborations, and junior developer roles."
          />
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}>
              <h3 className="text-xl text-primary mb-6 font-display">Get in touch</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Send a message through the form or reach out directly using the channels below.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Mail, title: "Email", value: siteConfig.email },
                  { icon: Github, title: "GitHub", value: "Arn-The-Wolf" },
                  { icon: Linkedin, title: "LinkedIn", value: "Coming soon" },
                  { icon: Send, title: "Status", value: "Available" },
                ].map(({ icon: Icon, title, value }) => (
                  <Card key={title} className="glass-card">
                    <CardContent className="p-4 text-center">
                      <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
                      <p className="text-xs text-primary font-medium">{title}</p>
                      <p className="text-muted-foreground text-xs mt-1 break-all">{value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}>
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-primary font-display">Send a message</CardTitle>
                  <CardDescription>All fields are required</CardDescription>
                </CardHeader>
                <CardContent>
                  {status && (
                    <div
                      role="alert"
                      className={`mb-4 flex gap-3 rounded-lg border p-4 text-sm ${
                        status.type === "success"
                          ? "border-green-500/40 bg-green-500/10 text-green-200"
                          : "border-destructive/40 bg-destructive/10 text-red-200"
                      }`}
                    >
                      {status.type === "success" ? (
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-green-400" />
                      ) : (
                        <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />
                      )}
                      <p>{status.message}</p>
                    </div>
                  )}
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-muted-foreground">Name</label>
                        <input name="name" required className="theme-input mt-1" disabled={isPending} />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">Email</label>
                        <input name="email" type="email" required className="theme-input mt-1" disabled={isPending} />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Subject</label>
                      <input name="subject" required className="theme-input mt-1" disabled={isPending} />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Message</label>
                      <textarea
                        name="message"
                        rows={5}
                        required
                        className="theme-input mt-1 resize-y min-h-[120px]"
                        disabled={isPending}
                      />
                    </div>
                    <Button type="submit" disabled={isPending} className="w-full btn-primary">
                      {isPending ? "Sending..." : "Send message"}
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
