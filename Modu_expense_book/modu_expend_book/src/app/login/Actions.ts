'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export type LoginState = {
  success: boolean;
  error?: string;
}

export async function login(prevState: LoginState | null, formData: FormData): Promise<LoginState> {
  const email = String(formData.get('email')).trim()
  const password = String(formData.get('password')).trim()

  if (!email || !password) {
    return {
      success: false,
      error: '이메일과 비밀번호를 입력해주세요.'
    }
  }

  // 우선 테스트로해놈
  if (email.toLowerCase() === 'ysy@naver.com' && password === '7487') {
    const cookieStore = await cookies()
    cookieStore.set('auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/'
    })

    // 리다이렉션 수행
    redirect('/dashboard')
  }

  return {
    success: false,
    error: '이메일 또는 비밀번호가 올바르지 않습니다.'
  }
}