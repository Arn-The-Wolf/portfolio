"use client"

import { useEffect } from "react"
import { Languages } from "lucide-react"

declare global {
  interface Window {
    googleTranslateElementInit?: () => void
  }
}

export default function GoogleTranslate() {
  useEffect(() => {
    if (document.getElementById("google-translate-script")) return

    window.googleTranslateElementInit = () => {
      const google = (window as Window & { google?: { translate: { TranslateElement: new (
        options: Record<string, unknown>,
        elementId: string,
      ) => void; TranslateElement: { InlineLayout: { SIMPLE: number } } } } }).google
      if (!google?.translate?.TranslateElement) return
      new google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,fr,es,de,it,pt,zh-CN,ja,ko,ru,ar,sw,hi,nl,pl",
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element",
      )
    }

    const script = document.createElement("script")
    script.id = "google-translate-script"
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Languages className="h-4 w-4 text-primary/70 hidden sm:block" aria-hidden />
      <div id="google_translate_element" className="google-translate-widget text-xs" />
    </div>
  )
}
