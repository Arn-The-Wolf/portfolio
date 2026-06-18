"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Scale, AlertTriangle, Globe, Shield, Users } from "lucide-react"

export default function TermsOfService() {
  return (
    <div className="min-h-screen text-foreground pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6 font-mono">
            <span className="text-primary">{">"}</span> TERMS OF ENGAGEMENT
          </h1>
          <p className="text-xl text-muted-foreground">
            Mission parameters and operational guidelines for using this platform.
          </p>
          <p className="text-sm text-muted-foreground mt-4">Last updated: December 6, 2024</p>
        </div>

        <div className="space-y-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center font-mono text-primary">
                <FileText className="mr-2 h-5 w-5" />
                ACCEPTANCE OF TERMS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using this website (arnold-rho.vercel.app), you accept and agree to be bound by the terms and
                provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                These terms constitute a legally binding agreement between you and RUYANGE Arnold (the "Service
                Provider").
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center font-mono text-primary">
                <Globe className="mr-2 h-5 w-5" />
                USE LICENSE
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-mono text-primary mb-2">Permitted Use</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>View and browse website content for personal or business evaluation</li>
                  <li>Contact the service provider for professional inquiries</li>
                  <li>Share links to the website with proper attribution</li>
                  <li>Download publicly available resources (resume, case studies)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-mono text-primary mb-2">Prohibited Use</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Reproduce, duplicate, copy, or resell any part of the website</li>
                  <li>Use automated systems to access or scrape website content</li>
                  <li>Attempt to gain unauthorized access to any part of the website</li>
                  <li>Use the website for any illegal or unauthorized purpose</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center font-mono text-primary">
                <Scale className="mr-2 h-5 w-5" />
                INTELLECTUAL PROPERTY
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-mono text-primary mb-2">Website Content</h3>
                <p className="text-muted-foreground">
                  All content on this website, including but not limited to text, graphics, logos, images, code, and
                  software, is the property of RUYANGE Arnold and is protected by copyright and other intellectual
                  property laws.
                </p>
              </div>
              <div>
                <h3 className="font-mono text-primary mb-2">Project Showcases</h3>
                <p className="text-muted-foreground">
                  Project descriptions and case studies represent work performed for clients. While the presentation and
                  analysis are original, underlying project ownership may belong to respective clients or employers.
                </p>
              </div>
              <div>
                <h3 className="font-mono text-primary mb-2">Open Source</h3>
                <p className="text-muted-foreground">
                  Some code examples and components may be available under open source licenses. Such content will be
                  clearly marked with appropriate license information.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center font-mono text-primary">
                <AlertTriangle className="mr-2 h-5 w-5" />
                DISCLAIMERS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-mono text-primary mb-2">Professional Information</h3>
                <p className="text-muted-foreground">
                  The information on this website is provided for general informational purposes only. While we strive
                  for accuracy, we make no representations or warranties about the completeness, accuracy, reliability,
                  or suitability of the information.
                </p>
              </div>
              <div>
                <h3 className="font-mono text-primary mb-2">External Links</h3>
                <p className="text-muted-foreground">
                  This website may contain links to external sites. We have no control over the content and nature of
                  these sites and are not responsible for their content or privacy practices.
                </p>
              </div>
              <div>
                <h3 className="font-mono text-primary mb-2">Technical Performance</h3>
                <p className="text-muted-foreground">
                  While we strive to maintain high availability, we do not guarantee that the website will be
                  uninterrupted, timely, secure, or error-free.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center font-mono text-primary">
                <Shield className="mr-2 h-5 w-5" />
                LIMITATION OF LIABILITY
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall RUYANGE Arnold be liable for any indirect, incidental, special, consequential, or
                punitive damages, including without limitation, loss of profits, data, use, goodwill, or other
                intangible losses, resulting from your use of the website or services, even if advised of the
                possibility of such damages.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center font-mono text-primary">
                <Users className="mr-2 h-5 w-5" />
                PROFESSIONAL SERVICES
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-mono text-primary mb-2">Consultation Inquiries</h3>
                <p className="text-muted-foreground">
                  Contact through this website does not establish a client relationship. Formal engagement requires a
                  separate written agreement outlining scope, terms, and compensation.
                </p>
              </div>
              <div>
                <h3 className="font-mono text-primary mb-2">Confidentiality</h3>
                <p className="text-muted-foreground">
                  Initial consultations and project discussions will be treated with appropriate confidentiality.
                  However, formal non-disclosure agreements may be required for detailed technical discussions.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="font-mono text-primary">GOVERNING LAW</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of the State of
                California, United States. Any disputes relating to these terms will be subject to the exclusive
                jurisdiction of the courts of California.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="font-mono text-primary">CONTACT INFORMATION</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">For questions about these terms of service, please contact:</p>
              <div className="bg-black/60 p-4 rounded border border-green-400/20">
                <p className="text-primary font-mono">Email: ruyangearnold@gmail.com</p>
                <p className="text-primary font-mono">Address: 123 Tech Street, San Francisco, CA 94105</p>
                <p className="text-primary font-mono">Response Time: Within 5 business days</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
