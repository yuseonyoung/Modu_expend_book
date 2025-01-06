import { IronSession, IronSessionData, getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { SESSION_CONFIG } from './config';
import { SessionUser } from '@/types/auth';

// IronSessionData 인터페이스 확장
declare module 'iron-session' {
  interface IronSessionData {
    user?: SessionUser;
    save(): Promise<void>;
    destroy(): Promise<void>;
  }
}

export async function getSession(): Promise<IronSession<IronSessionData>> {
  const cookieStore = await cookies();
  return getIronSession(cookieStore, SESSION_CONFIG);
}

export async function setUserSession(user: SessionUser) {
  const session = await getSession();
  session.user = user;
  await session.save();
}

export async function clearSession() {
  const session = await getSession();
  await session.destroy();
}

export async function getUser(): Promise<SessionUser | null> {
  const session = await getSession();
  return session.user ?? null;
}