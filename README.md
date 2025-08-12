# freetypingcamp.com — Typing Test App (Remix Refactor)

## A production-grade typing test platform refactored from a React SPA to **Remix** for server-first rendering, predictable SEO, and zero hydration flicker.

The final repo for the live version of my appliaction is stored in a separate repo. This repo serves as a building block for the final version.

---

## 🚀 Why the Refactor

**Problem in the React SPA:**

- JWT-based layout toggle for logged-in vs guest routes caused hydration mismatch and layout shifts.
- Conditional rendering after token verification created noticeable FOUC and CLS.

**Solution with Remix:**

- Server first. Layout state is resolved in **loaders** before render, so the correct UI is sent on first paint.
- Session is read on the server and injected into the route tree.
- Better redirects and data boundaries through nested routes.

Result: Stable first paint, improved Core Web Vitals, and simpler auth flows.

---

## 🧰 Tech Stack

- **App**: Remix.run + TypeScript, Tailwind CSS
- **Server**: Node.js with **Remix Express adapter**
- **API**: Express middleware for health checks and webhooks under `/api`
- **Auth**: JWT + HttpOnly cookies, CSRF token for unsafe methods
- **DB**: PostgreSQL (managed on DigitalOcean)
- **Object Storage**: Cloudflare R2 (S3 compatible)
- **CDN**: Cloudflare CDN in front of Nginx
- **Web Server**: Nginx reverse proxy
- **Process Manager**: PM2
- **Hosting**: DigitalOcean Droplet
- **CI/CD**: GitHub Actions to build, test, and deploy
- **Metrics/Logs**: pino for app logs, Prometheus scrape endpoint, Grafana

---

## 🧱 Architecture Overview

```
Browser ⇄ Cloudflare CDN ⇄ Nginx ⇄ Node/Express (Remix server)
                                 ├─ PostgreSQL (DigitalOcean Managed DB)
                                 └─ Cloudflare R2 (S3 compatible)
```

**Routing**

- Public pages: `/`, `/learn`, `/about`
- Auth: `/login`, `/signup`, `/logout`
- App: `/test`, `/results/:id`, `/profile`

---

## 🔐 Authentication and Session Model

- **JWT** signed with HS256. Short-lived access token in HttpOnly cookie.
- **Refresh** handled by a rotating refresh token stored server side.
- Session fetched in `root.tsx` loader and passed as context.
- CSRF double submit cookie for POST, PUT, DELETE.

**Cookie flags**: `HttpOnly; Secure; SameSite=Lax; Path=/`.

---

## 📈 Performance and SEO

- Server render with data from loaders, avoids hydration mismatch.
- Cache static assets at Cloudflare, HTML at Nginx with `Cache-Control: no-store` for authed pages.
- Tailwind JIT for minimal CSS.
- Robots and sitemap from server, canonical links per route.

---

## 🧪 Testing Strategy

- **Unit**: Vitest + React Testing Library
- **E2E**: Playwright
- **Contract**: Zod schemas for API payloads

---

## 🦺 Security Hardening

- Helmet middleware on Express adapter
- Input validation with Zod
- Rate limiting on `/api` auth endpoints
- CSP default src 'self', allow CDN assets only

---

## 🗄️ Database and ORM

**Prisma** models excerpt:

```prisma
model User {
  id        String  @id @default(cuid())
  email     String  @unique
  password  String
  createdAt DateTime @default(now())
  results   Result[]
}

model Result {
  id        String  @id @default(cuid())
  userId    String
  wpm       Int
  accuracy  Float
  mode      String
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
}
```

---

## 🧪 Typing Engine Notes

- Runs client side for low input latency.
- Deterministic word lists.
- Anti-cheat checks for paste and programmatic key events.

---

## 🧵 Styling

- Tailwind CSS with preflight and a small design system.
- Dark mode via `prefers-color-scheme`.

---

## 🧑‍💻 Local Development

**Requirements**: Node 20+

```bash
npm install
cp .env.example .env
# configure JWT secrets, DB URL, R2 creds
npx prisma migrate dev
npx prisma db seed
npm run dev
```

---

## 🧭 Roadmap

- Social sign in
- Public result sharing with signed URLs
- Real-time multiplayer typing races
- Offline PWA mode
- WCAG accessibility testing

### Icons

Some icons in this project are derived from Material Design icons © Google, used under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).
