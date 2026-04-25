import { vi, beforeEach, describe, it, expect } from 'vitest';
import { checkCredentials, saveSession, isSessionValid, clearSession } from '../auth';

beforeEach(() => {
  vi.stubEnv('VITE_AUTH_USERNAME', 'arzt');
  vi.stubEnv('VITE_AUTH_PASSWORD', 'geheim');
  sessionStorage.clear();
});

describe('checkCredentials', () => {
  it('returns true for correct username and password', () => {
    expect(checkCredentials('arzt', 'geheim')).toBe(true);
  });

  it('returns false for wrong password', () => {
    expect(checkCredentials('arzt', 'wrong')).toBe(false);
  });

  it('returns false for wrong username', () => {
    expect(checkCredentials('wrong', 'geheim')).toBe(false);
  });

  it('is case-sensitive', () => {
    expect(checkCredentials('Arzt', 'geheim')).toBe(false);
    expect(checkCredentials('arzt', 'Geheim')).toBe(false);
  });
});

describe('session lifecycle', () => {
  it('isSessionValid returns false when nothing stored', () => {
    expect(isSessionValid()).toBe(false);
  });

  it('isSessionValid returns true after saveSession', () => {
    saveSession();
    expect(isSessionValid()).toBe(true);
  });

  it('isSessionValid returns false after clearSession', () => {
    saveSession();
    clearSession();
    expect(isSessionValid()).toBe(false);
  });
});
