# ChatGPTX

An open source **AI chatbot widget / template** built with **Next.js** + **Tailwind CSS** + **Vercel AI SDK** (streaming) + **Google Gemini**.
This is a **learning/demo project** and a solid base for real flows like customer support, product Q&A, and simple lead capture.

---

## ✨ What’s inside
- Floating chatbot UI (bottom-right) with mobile-friendly full-screen mode
- Streaming responses from Gemini via Vercel AI SDK (`app/api/chat/route.ts`)
- Config-driven chatbot setup (name, welcome message, system prompt, model) in `lib/config.ts`
- Arcjet protection (token-bucket rate limiting + bot detection + shield) in `lib/arcjet.ts`
- Client-side throttling + persisted chat history (`localStorage`)
- Message validation + profanity filter (client + server)
- Clickable quick actions inside replies:
  - `{{choice:Option Name}}` → renders a choice button
  - `{{link:https://example.com|Button Text}}` → renders a link button
- shadcn/ui + Radix UI components, Lucide icons, Motion animations

---

## 🚀 Quick Start (clone + run)

~~~bash
set -euo pipefail
cd "/Users/alok/Desktop"

# Clone your repo (HTTPS or SSH)
git clone <your-repo-url> ChatGPTX
cd "ChatGPTX"

# Install deps (pnpm recommended)
corepack enable
pnpm i
~~~

> Before starting the dev server, create `.env.local` (next section).

---

## 🔐 Create `.env.local` (required)

Create a file named **`.env.local`** in the **project root** (`ChatGPTX/.env.local`).

Required variables:
- `GOOGLE_GENERATIVE_AI_API_KEY` — Gemini API key (used by `@ai-sdk/google`)
- `ARCJET_KEY` — Arcjet site key (used by `@arcjet/next`)
- `NEXT_PUBLIC_APP_URL` — your app origin (used for a simple referer check)

Example:

~~~bash
set -euo pipefail
cd "/Users/alok/Desktop/ChatGPTX"

cat > .env.local <<'ENV_EOF'
# Google Gemini API key
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key

# Arcjet site key
ARCJET_KEY=your_arcjet_key

# App origin (must match where you're serving the site from)
NEXT_PUBLIC_APP_URL=http://localhost:3000
ENV_EOF
~~~

**`NEXT_PUBLIC_APP_URL` note (important):**
- If this doesn’t match your site origin, the chat API will return **403 Forbidden**.
- For production, set it to your deployed domain (including scheme).

---

## 🧩 Start Dev Server

~~~bash
set -euo pipefail
cd "/Users/alok/Desktop/ChatGPTX"
pnpm dev
~~~

Open the site at `localhost:3000` and click the chat button in the bottom-right.

---

## 📦 Production build (optional)

~~~bash
set -euo pipefail
cd "/Users/alok/Desktop/ChatGPTX"
pnpm build
pnpm start
~~~

---

## 📁 Project structure (high level)

~~~text
ChatGPTX/
  app/
    api/
      chat/
        route.ts
    globals.css
    layout.tsx
    page.tsx
  components/
    Chatbot.tsx
    DemoPage.tsx
    ai-elements/
      conversation.tsx
      message.tsx
      prompt-input.tsx
    ui/
      avatar.tsx
      button.tsx
      select.tsx
      textarea.tsx
  lib/
    arcjet.ts
    config.ts
    utils.ts
  components.json
  eslint.config.mjs
  next.config.ts
  package.json
  pnpm-lock.yaml
  postcss.config.mjs
  tsconfig.json
  LICENSE.md
  README.md
  .gitignore
  .env.local
~~~

> If you want an avatar image, add `public/ai-avatar.png` and keep `chatbotConfig.ui.avatarImage` pointing to `/ai-avatar.png`.

---

## 🛠 Customize
- **Bot name / welcome message / system prompt / model**: `lib/config.ts`
- **Rate limiting values** (capacity/refill/interval + client throttle): `lib/config.ts`
- **Arcjet rules** (shield, bot detection, token bucket): `lib/arcjet.ts`
- **Server-side validation** (length, spam pattern, profanity): `app/api/chat/route.ts`
- **Client-side UX** (UI layout, buttons, persistence): `components/Chatbot.tsx`
- **Landing page content**: `components/DemoPage.tsx`

---

## 🧯 Troubleshooting
- **403 Forbidden – Invalid referer**  
  Set `NEXT_PUBLIC_APP_URL` in `.env.local` to match your site origin.
- **429 Too many requests**  
  You hit the Arcjet token bucket limit — tune `chatbotConfig.rateLimit` in `lib/config.ts`.
- **400 Invalid or suspicious message content**  
  Message was blocked by validation/profanity rules — adjust `validateMessages()` in `app/api/chat/route.ts` and/or `validateMessage()` in `components/Chatbot.tsx`.
- **Server error when sending a message**  
  Double-check `GOOGLE_GENERATIVE_AI_API_KEY` and `ARCJET_KEY` are set.


