const SESSION_KEY = 'er-helper:auth:v1';

function getEnvCredentials(): { username: string; password: string } {
  return {
    username: import.meta.env.VITE_AUTH_USERNAME ?? '',
    password: import.meta.env.VITE_AUTH_PASSWORD ?? '',
  };
}

export function checkCredentials(username: string, password: string): boolean {
  const env = getEnvCredentials();
  return username === env.username && password === env.password;
}

export function saveSession(): void {
  sessionStorage.setItem(SESSION_KEY, '1');
}

export function isSessionValid(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === '1';
}

export function clearSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
}
