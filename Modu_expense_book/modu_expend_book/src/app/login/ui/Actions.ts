'use server'

export type LoginState = {
  success: boolean;
  error?: string;
}

export async function login(prevState: LoginState | null, formData: FormData): Promise<LoginState> {
  // 임시로 항상 에러를 반환하는 더미 함수
  return {
    success: false,
    error: '로그인 기능이 아직 구현되지 않았습니다.'
  }
}