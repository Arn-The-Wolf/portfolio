# ARNOLD.DEV — Portfolio of RUYANGE Arnold

Personal portfolio and project showcase for **RUYANGE Arnold**, a full-stack developer working with **Java, Python, AI/ML, and cybersecurity**. Built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

**Live site:** [arnold-rho.vercel.app](https://arnold-rho.vercel.app)

## What's inside

- Project portfolio with GitHub links — **strongest work first** (Clause Lens, Ingoboka, ArcFace, WASAC billing, BestBuy, ANPR, AviaServe)
- Skills, experience timeline, and downloadable CVs
- Blog, testimonials, and contact form
- Admin dashboard for full content management
- Dark & light theme with starfield backgrounds

## Tech stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui
- React Three Fiber (hero + star backgrounds)
- JSON file storage for CMS data

## Quick start

```bash
npm install --legacy-peer-deps
cp .env.example .env.local   # set ADMIN_PASSWORD, optional RESEND_API_KEY
npm run dev                  # http://localhost:3000
```

## Deploy (Vercel Hobby)

1. Push `main` to GitHub — Vercel auto-deploys when the repo is linked.
2. Set environment variables in the Vercel project dashboard:
   - `ADMIN_PASSWORD`, `ADMIN_SECRET` (required for admin)
   - `NEXT_PUBLIC_BASE_URL` → `https://arnold-rho.vercel.app`
   - `RESEND_API_KEY` (optional, for contact form email)
3. Production URL: **https://arnold-rho.vercel.app**

Build uses `npm install --legacy-peer-deps` (see `vercel.json` and `.npmrc`).

## Admin

- Login: `/admin/login`
- Manage projects, documents, case studies, skills, history, blog, testimonials, and messages

## Author

**RUYANGE Arnold** — [@Arn-The-Wolf](https://github.com/Arn-The-Wolf) · ruyangearnold@gmail.com
