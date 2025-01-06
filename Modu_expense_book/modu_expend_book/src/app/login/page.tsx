'use client'

import Link from 'next/link'
import { login, LoginState } from './Actions'
import { useActionState } from 'react'
import { AuthService } from '@/lib/auth/service'

export default function LoginPage() {
  const initialState: LoginState = {
    success: false,
    error: undefined
  }

  const [state, formAction] = useActionState(login, initialState)

  // 각 OAuth 로그인 핸들러
  const handleNaverLogin = () => {
    const authService = new AuthService();
    const naverProvider = authService.getProvider('naver');
    const authUrl = naverProvider.generateAuthUrl();
    console.log('Auth URL:', authUrl); // URL 확인용
    window.location.href = authUrl;
  };

  const handleGoogleLogin = () => {
    const authService = new AuthService();
    const googleProvider = authService.getProvider('google');
    const authUrl = googleProvider.generateAuthUrl();
    window.location.href = authUrl;
  };

  const handleKakaoLogin = () => {
    const authService = new AuthService();
    const kakaoProvider = authService.getProvider('kakao');
    const authUrl = kakaoProvider.generateAuthUrl();
    window.location.href = authUrl;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-[420px] bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">로그인</h1>
        </div>

        <form action={formAction} className="space-y-4">
          {state?.error && (
            <div className="text-red-500 text-sm">{state.error}</div>
          )}

          <div>
            <input
              name="email"
              type="text"
              placeholder="이메일/아이디"
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              aria-label="이메일 또는 아이디"
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              placeholder="비밀번호"
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              aria-label="비밀번호"
            />
          </div>
          <button
            type="submit"
            className="w-full h-12 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
          >
            로그인
          </button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-500 bg-white">다른 계정으로 로그인</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button
              onClick={handleGoogleLogin}
              className="w-full h-12 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-start w-full px-4">
                <div className="w-6 h-6 flex-shrink-0">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </div>
                <span className="text-gray-700 flex-grow text-center">Google로 로그인</span>
              </div>
            </button>

            <button
              onClick={handleKakaoLogin}
              className="w-full h-12 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-start w-full px-4">
                <div className="w-6 h-6 flex-shrink-0">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#FFE812" />
                    <path fill="#000000" fillOpacity="0.9" d="M12 6.5c-3.92 0-7.1 2.508-7.1 5.604 0 1.89 1.267 3.56 3.188 4.514a.48.48 0 0 1 .234.4l-.051 1.468c-.008.15.157.268.295.194l1.673-.909a.619.619 0 0 1 .344-.076c.423.037.857.056 1.297.056 3.92 0 7.1-2.509 7.1-5.605 0-3.096-3.18-5.604-7.1-5.604" />
                  </svg>
                </div>
                <span className="text-gray-700 flex-grow text-center">Kakao로 로그인</span>
              </div>
            </button>

            <button
              onClick={handleNaverLogin}
              className="w-full h-12 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-start w-full px-4">
                <div className="w-6 h-6 flex-shrink-0">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#03C75A" />
                    <path
                      d="M14 16.7L10 11.3V16.7H8V7h2.2l4 5.4V7h2v9.7z"
                      fill="#FFFFFF"
                      stroke="#FFFFFF"
                      strokeWidth="0.7"
                    />
                  </svg>
                </div>
                <span className="text-gray-700 flex-grow text-center">Naver로 로그인</span>
              </div>
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-center space-x-4 text-sm">
          <Link href="/login/search" className="text-gray-600 hover:text-gray-900">
            아이디 / 비밀번호 찾기
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/signup" className="text-gray-600 hover:text-gray-900">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  )
}