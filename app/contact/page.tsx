"use client"

import { useTransition } from "react"
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
          <h2 className="page-heading mb-12 text-center">Contact</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl text-primary mb-6">Get in touch</h3>
              <p className="text-muted-foreground mb-8">
                Open to internships, collaborations, and junior developer roles. Send a message or reach out directly.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Mail, title: "Email", value: "ruyangearnold@gmail.com" },
                  { icon: Github, title: "GitHub", value: "Arn-The-Wolf" },
                  { icon: Linkedin, title: "LinkedIn", value: "Coming soon" },
                  { icon: Send, title: "Status", value: "Available" },
                ].map(({ icon: Icon, title, value }) => (
                  <Card key={title} className="surface-card-muted">
                    <CardContent className="p-4 text-center text-card-foreground">
                      <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
                      <p className="text-xs text-primary font-medium">{title}</p>
                      <p className="text-muted-foreground text-xs mt-1">{value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <Card className="surface-card">
              <CardHeader>
                <CardTitle className="text-foreground">Send a message</CardTitle>
                <CardDescription className="text-muted-foreground">All fields are required</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground">Name</label>
                      <input name="name" required className="w-full mt-1 input-surface p-2 text-sm" />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Email</label>
                      <input name="email" type="email" required className="w-full mt-1 input-surface p-2 text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Subject</label>
                    <input name="subject" required className="w-full mt-1 input-surface p-2 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Message</label>
                    <textarea name="message" rows={5} required className="w-full mt-1 input-surface p-2 text-sm" />
                  </div>
                  <Button type="submit" disabled={isPending} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
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
