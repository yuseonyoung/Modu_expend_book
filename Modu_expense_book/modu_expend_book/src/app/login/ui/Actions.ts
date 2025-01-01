'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export type LoginState = {
  success: boolean;
  error?: string;
}

export async function login(prevState: LoginState | null, formData: FormData): Promise<LoginState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    // Here you would typically validate the credentials against your database
    if (email === 'user@example.com' && password === 'password') {
      const cookieStore = await cookies()
      cookieStore.set('auth', 'true', { secure: true, httpOnly: true })
      redirect('/dashboard') // 로그인 성공시 리다이렉트
    } else {
      return {
        success: false,
        error: '이메일 또는 비밀번호가 올바르지 않습니다.'
      }
    }
  } catch (error) {
    return {
      success: false,
      error: '로그인 중 오류가 발생했습니다.'
    }
  }
}