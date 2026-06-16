import { readJsonAsync } from "@/lib/data-store"
import BlogClient, { type BlogPost } from "./blog-client"

export const dynamic = "force-dynamic"

export default async function BlogPage() {
  const posts = await readJsonAsync<BlogPost[]>("blog.json")
  return <BlogClient posts={posts} />
}
