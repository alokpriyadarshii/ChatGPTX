function stripEnvName(value: string, name: string) {
  const trimmed = value.trim();
  const prefix = `${name}=`;

  return trimmed.startsWith(prefix) ? trimmed.slice(prefix.length).trim() : trimmed;
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
