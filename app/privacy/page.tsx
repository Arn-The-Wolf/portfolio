"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Eye, Lock, Database, Users, Mail } from "lucide-react"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-green-400 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6 font-mono">
            <span className="text-green-400">{">"}</span> PRIVACY PROTOCOL
          </h1>
          <p className="text-xl text-gray-300">
            Your data security is our mission priority. This document outlines our data protection protocols.
          </p>
          <p className="text-sm text-gray-400 mt-4">Last updated: December 6, 2024</p>
        </div>

        <div className="space-y-8">
          <Card className="bg-black/40 border-green-400/20">
            <CardHeader>
              <CardTitle className="flex items-center font-mono text-green-400">
                <Eye className="mr-2 h-5 w-5" />
                INFORMATION WE COLLECT
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-mono text-green-400 mb-2">Personal Information</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Name and contact information when you reach out via contact forms</li>
                  <li>Email address for newsletter subscriptions</li>
                  <li>Professional information shared in communications</li>
                </ul>
              </div>
              <div>
                <h3 className="font-mono text-green-400 mb-2">Technical Information</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>IP address and browser information</li>
                  <li>Pages visited and time spent on site</li>
                  <li>Device and operating system information</li>
                  <li>Referral sources and search terms</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-green-400/20">
            <CardHeader>
              <CardTitle className="flex items-center font-mono text-green-400">
                <Database className="mr-2 h-5 w-5" />
                HOW WE USE YOUR DATA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Respond to your inquiries and provide requested information</li>
                <li>Send newsletters and updates (with your explicit consent)</li>
                <li>Analyze website usage to improve user experience</li>
                <li>Ensure website security and prevent fraud</li>
                <li>Comply with legal obligations and protect our rights</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-green-400/20">
            <CardHeader>
              <CardTitle className="flex items-center font-mono text-green-400">
                <Lock className="mr-2 h-5 w-5" />
                DATA PROTECTION MEASURES
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-mono text-green-400 mb-2">Security Protocols</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>SSL/TLS encryption for all data transmission</li>
                  <li>Secure hosting infrastructure with regular security updates</li>
                  <li>Access controls and authentication for data access</li>
                  <li>Regular security audits and vulnerability assessments</li>
                </ul>
              </div>
              <div>
                <h3 className="font-mono text-green-400 mb-2">Data Retention</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Contact form data: Retained for 2 years or until deletion requested</li>
                  <li>Analytics data: Anonymized and retained for 26 months</li>
                  <li>Newsletter subscriptions: Until unsubscribed</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-green-400/20">
            <CardHeader>
              <CardTitle className="flex items-center font-mono text-green-400">
                <Users className="mr-2 h-5 w-5" />
                YOUR RIGHTS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 mb-4">Under GDPR and CCPA, you have the following rights:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>
                  <strong>Access:</strong> Request a copy of your personal data
                </li>
                <li>
                  <strong>Rectification:</strong> Correct inaccurate or incomplete data
                </li>
                <li>
                  <strong>Erasure:</strong> Request deletion of your personal data
                </li>
                <li>
                  <strong>Portability:</strong> Receive your data in a machine-readable format
                </li>
                <li>
                  <strong>Objection:</strong> Object to processing of your personal data
                </li>
                <li>
                  <strong>Restriction:</strong> Request limitation of data processing
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-green-400/20">
            <CardHeader>
              <CardTitle className="flex items-center font-mono text-green-400">
                <Shield className="mr-2 h-5 w-5" />
                THIRD-PARTY SERVICES
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-mono text-green-400 mb-2">Analytics</h3>
                <p className="text-gray-300">
                  We use Google Analytics and Vercel Analytics to understand website usage. These services may collect
                  anonymized data about your visit.
                </p>
              </div>
              <div>
                <h3 className="font-mono text-green-400 mb-2">Email Services</h3>
                <p className="text-gray-300">
                  Contact form submissions are processed through Resend. Your email and message content are transmitted
                  securely.
                </p>
              </div>
              <div>
                <h3 className="font-mono text-green-400 mb-2">Hosting</h3>
                <p className="text-gray-300">
                  This website is hosted on Vercel, which may collect technical information for service provision and
                  security.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-green-400/20">
            <CardHeader>
              <CardTitle className="flex items-center font-mono text-green-400">
                <Mail className="mr-2 h-5 w-5" />
                CONTACT INFORMATION
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                For any privacy-related questions or to exercise your rights, contact our Data Protection Officer:
              </p>
              <div className="bg-black/60 p-4 rounded border border-green-400/20">
                <p className="text-green-400 font-mono">Email: ruyangearnold@gmail.com</p>
                <p className="text-green-400 font-mono">Address: 123 Tech Street, San Francisco, CA 94105</p>
                <p className="text-green-400 font-mono">Response Time: Within 30 days</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-green-400/20">
            <CardHeader>
              <CardTitle className="font-mono text-green-400">POLICY UPDATES</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                This privacy policy may be updated periodically to reflect changes in our practices or legal
                requirements. We will notify users of significant changes via email or website notice. Continued use of
                our services after updates constitutes acceptance of the revised policy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
