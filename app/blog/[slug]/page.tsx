import { notFound } from "next/navigation"
import Link from "next/link"
import { readJsonAsync } from "@/lib/data-store"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import type { BlogPost } from "@/app/blog/blog-client"

export const dynamic = "force-dynamic"

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const posts = await readJsonAsync<BlogPost[]>("blog.json")
  const post = posts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="relative min-h-screen">
      <article className="relative z-10 pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-primary mb-8 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" className="border-primary/40 text-primary">
              {post.category}
            </Badge>
            {post.featured && <Badge className="btn-primary">Featured</Badge>}
          </div>

          <h1 className="font-display text-3xl md:text-4xl text-primary mb-4">{post.title}</h1>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
            <span>By {post.author}</span>
          </div>

          <div className="glass-card p-8">
            <div className="text-foreground/90 leading-relaxed whitespace-pre-line text-lg">
              {post.content}
            </div>
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs text-primary/70">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
