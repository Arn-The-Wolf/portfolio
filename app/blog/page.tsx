import { readJson } from "@/lib/data-store"
import BlogClient, { type BlogPost } from "./blog-client"

export default function BlogPage() {
  const posts = readJson<BlogPost[]>("blog.json")
  return <BlogClient posts={posts} />
}
