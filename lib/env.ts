const DEFAULT_PRODUCTION_URL = "https://chat-gptx-sigma.vercel.app";
const URL_ENV_NAMES = [
  "NEXTAUTH_URL",
  "NEXT_PUBLIC_APP_URL",
  "NEXT_PUBLIC_SITE_URL",
  "APP_URL",
  "SITE_URL",
  "VERCEL_PROJECT_PRODUCTION_URL",
];

function stripEnvName(value: string, name: string) {
  const trimmed = value.trim();
  const prefix = `${name}=`;

  return trimmed.startsWith(prefix) ? trimmed.slice(prefix.length).trim() : trimmed;
}

function stripTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

function withProtocol(value: string) {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

function normalizeUrlValue(value: string) {
  return stripTrailingSlash(withProtocol(value.trim()));
}

export function normalizeEnvValue(name: string) {
  const value = process.env[name];

  return value ? stripEnvName(value, name) : value;
}

export function normalizeProcessEnv(name: string) {
  const value = normalizeEnvValue(name);

  if (value) {
    process.env[name] = value;
  }

  return value;
}

export function getCanonicalAppUrl(requestOrigin?: string) {
  for (const name of URL_ENV_NAMES) {
    const value = normalizeEnvValue(name);

    if (value) {
      return normalizeUrlValue(value);
    }
  }

  if (process.env.VERCEL || process.env.NODE_ENV === "production") {
    return DEFAULT_PRODUCTION_URL;
  }

  return requestOrigin ? normalizeUrlValue(requestOrigin) : undefined;
}

export function bootstrapAuthEnv() {
  const canonicalUrl = getCanonicalAppUrl();

  if (canonicalUrl) {
    process.env.NEXTAUTH_URL = canonicalUrl;
  }

  return canonicalUrl;
}
