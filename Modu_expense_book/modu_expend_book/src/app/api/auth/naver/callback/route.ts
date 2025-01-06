import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth/service';
// import { setUserSession } from '@/lib/auth/session';
// import { CSRFProtection } from '@/lib/auth/csrf';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=no_code', request.url));
  }

  try {
    // TODO: 서버 구현 후 활성화
    // CSRF 토큰 검증
    // if (state) {
    //   const isValidCSRF = await CSRFProtection.validateToken(state);
    //   if (!isValidCSRF) {
    //     return NextResponse.redirect(new URL('/login?error=invalid_state', request.url));
    //   }
    // }

    const authService = new AuthService();
    const naverProvider = authService.getProvider('naver');
    
    // 토큰 획득
    const token = await naverProvider.getToken(code);
    const userInfo = await naverProvider.getUserInfo(token);
    
    // TODO: 서버 구현 시 추가할 기능
    // 1. DB에 사용자 정보 저장 또는 업데이트
    // await saveUserToDatabase(userInfo);
    
    // 2. 세션 설정
    // await setUserSession(userInfo);
    
    // 3. JWT 토큰 생성 및 쿠키 설정
    // const jwtToken = generateJWT(userInfo);
    // setCookie('auth_token', jwtToken);

    // 개발 단계에서 사용자 정보 확인용 로그
    console.log('Naver Login Success:', userInfo);

    // 성공시 대시보드로 리다이렉트
    return NextResponse.redirect(new URL('/dashboard', request.url));
  } catch (error) {
    console.error('Naver auth error:', error);
    return NextResponse.redirect(new URL('/login?error=auth_failed', request.url));
  }
}