# ChatGPTX

ChatGPTX is a clean, full stack AI chat application built with Next.js. It includes Google login, saved conversations, dark/light mode, a responsive chat UI, and OpenAI powered answers using the user's own API key or a server-side environment key.

## Preview

<img src="./images/ChatGPT Image May 23, 2026, 02_29_11 AM (3).png" alt="ChatGPTX landing page" width="100%" />

<img src="./images/ChatGPT Image May 23, 2026, 02_29_10 AM (2).png" alt="ChatGPTX greeting screen" width="100%" />

<img src="./images/ChatGPT Image May 23, 2026, 02_29_10 AM (1).png" alt="ChatGPTX dark chat screen" width="100%" />

<img src="./images/ChatGPT Image May 23, 2026, 02_29_11 AM (4).png" alt="ChatGPTX light chat screen" width="100%" />

## Features

- Google authentication with NextAuth
- AI chat powered by the OpenAI API
- OpenAI API key support through Vercel environment variables
- Optional user-provided OpenAI API key saved in the browser
- Saved chat conversations with Prisma and PostgreSQL
- Conversation history panel
- New chat flow with optimistic UI updates
- Dark and light theme support
- Responsive, minimal interface built with Tailwind CSS and shadcn/ui components

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui and Radix UI
- Prisma ORM
- PostgreSQL
- NextAuth.js
- OpenAI SDK

## Project Structure

```text
ChatGPTX/
├── actions/              
├── app/                  
├── components/          
├── images/               
├── lib/                 
├── prisma/               
├── types/               
├── .env.example          
├── package.json         
└── README.md            
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create your environment file

```bash
cp .env.example .env
```

Fill in the required values:

```env
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
NEXTAUTH_SECRET=
GOOGLE_ID=
GOOGLE_SECRET=
OPENAI_API_KEY=
NEXTAUTH_URL=http://localhost:3000
```

### 3. Set up the database

```bash
npx prisma generate
npx prisma db push
```

### 4. Run the development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Usage

1. Register or log in with Google.
2. Add `OPENAI_API_KEY` to your environment, or go to **My account** and enter a user-specific key.
3. Start a new chat and ask a question.
4. Previous conversations will appear in the conversation panel.

## Vercel Setup

Add this environment variable in Vercel before deploying:

```env
OPENAI_API_KEY=your_openai_api_key
```

Set it for Production, Preview, and Development if you want all deployments to use the same server-side key. For `NEXTAUTH_URL`, put only the URL in the Vercel value field, for example `https://chat-gptx-sigma.vercel.app`, not `NEXTAUTH_URL=https://chat-gptx-sigma.vercel.app`. The app redirects Vercel deployment URLs back to this canonical URL before Google sign-in, so Google OAuth does not break on every redeploy. After saving environment variables, redeploy the project so the app can read the new values.

## Available Scripts

```bash
npm run dev      
npm run build    
npm run start    
npm run lint     
```

## Environment Variables

| Variable | Description |
|---|---|
| `POSTGRES_PRISMA_URL` | PostgreSQL database connection URL used by Prisma |
| `POSTGRES_URL_NON_POOLING` | Direct PostgreSQL connection URL for Prisma |
| `NEXTAUTH_SECRET` | Secret key used by NextAuth |
| `GOOGLE_ID` | Google OAuth client ID |
| `GOOGLE_SECRET` | Google OAuth client secret |
| `OPENAI_API_KEY` | Server-side OpenAI API key used when the account key field is empty |
| `NEXTAUTH_URL` | Base URL of the app, such as `http://localhost:3000` |

For Google OAuth, the authorized redirect URI must be `${NEXTAUTH_URL}/api/auth/callback/google`. For the production deployment above, add `https://chat-gptx-sigma.vercel.app/api/auth/callback/google` to the Google Cloud OAuth client.

## Notes

- The app uses `OPENAI_API_KEY` from the server environment when the account key field is empty.
- A user can still enter an OpenAI API key inside the app to override the server environment key for their session.
- Conversations are stored in PostgreSQL through Prisma.
- The default chat model in the source code is `gpt-3.5-turbo`; you can update it in `actions/chat.ts`.
