import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'pawan-portfolio-super-secret-key-2026-fallback-secure'
);

const COOKIE_NAME = 'pawan_admin_session';

export async function createAdminSession(): Promise<string> {
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET_KEY);

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  return token;
}

export async function verifyAdminSession(): Promise<boolean> {
  try {
    const cookie = cookies().get(COOKIE_NAME);
    if (!cookie?.value) return false;

    const { payload } = await jwtVerify(cookie.value, SECRET_KEY);
    return payload.role === 'admin';
  } catch {
    return false;
  }
}

export async function clearAdminSession(): Promise<void> {
  cookies().delete(COOKIE_NAME);
}

export function verifyAdminPassword(password: string): boolean {
  const expectedPassword = process.env.ADMIN_PASSWORD || 'admin';
  return password === expectedPassword;
}
