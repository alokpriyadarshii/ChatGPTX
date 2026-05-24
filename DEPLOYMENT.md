# Deployment

## Fix Google sign-in on Vercel

Google sign-in uses the NextAuth callback route:

```text
https://your-vercel-domain.vercel.app/api/auth/callback/google
```

If Google shows `Error 400: redirect_uri_mismatch`, the callback URL that Vercel sends is not listed in the Google OAuth client.

For the current Vercel deployment URL from the screenshot, add this exact URI in Google Cloud Console:

```text
https://chat-gptx-oho0lj2v0-alokpriyadarshiis-projects.vercel.app/api/auth/callback/google
```

Also set this Vercel environment variable for Production:

```env
NEXTAUTH_URL=https://chat-gptx-oho0lj2v0-alokpriyadarshiis-projects.vercel.app
```

Keep the local development callback registered too:

```text
http://localhost:3000/api/auth/callback/google
```

After changing Google Cloud Console or Vercel environment variables, redeploy the app.
