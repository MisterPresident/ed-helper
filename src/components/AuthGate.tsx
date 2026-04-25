import { useState } from 'react';
import { checkCredentials, saveSession, isSessionValid, clearSession } from '../lib/auth';
import { AuthContext } from '../lib/authContext';

export function AuthGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState<boolean>(() => isSessionValid());
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkCredentials(username, password)) {
      saveSession();
      setAuthed(true);
    } else {
      setError('Benutzername oder Passwort falsch.');
      setPassword('');
    }
  };

  const handleLogout = () => {
    clearSession();
    setAuthed(false);
  };

  if (!authed) {
    return (
      <div className="h-screen grid place-items-center bg-slate-50">
        <div className="card w-full max-w-sm">
          <h1 className="text-base font-semibold mb-4">ER Helper — Anmelden</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-600" htmlFor="username">
                Benutzername
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-slate-300 rounded-md px-3 py-2 text-sm outline-none focus:border-slate-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-600" htmlFor="password">
                Passwort
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-slate-300 rounded-md px-3 py-2 text-sm outline-none focus:border-slate-500"
              />
            </div>
            {error && <p className="text-danger-600 text-sm">{error}</p>}
            <button type="submit" className="btn-primary mt-1">
              Anmelden
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}
