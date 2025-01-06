/*  OAuth 제공자별 설정과 세션 설정을 관리  */
export const OAUTH_CONFIG = {
    naver: {
      client_id: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID!,
      client_secret: process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET!,
      redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/naver/callback`,
      auth_url: 'https://nid.naver.com/oauth2.0/authorize',
      token_url: 'https://nid.naver.com/oauth2.0/token',
      userinfo_url: 'https://openapi.naver.com/v1/nid/me'
    },
    kakao: {
      client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!,
      client_secret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET!,
      redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/kakao/callback`,
      auth_url: 'https://kauth.kakao.com/oauth/authorize',
      token_url: 'https://kauth.kakao.com/oauth/token',
      userinfo_url: 'https://kapi.kakao.com/v2/user/me'
    },
    google: {
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
      redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google/callback`,
      auth_url: 'https://accounts.google.com/o/oauth2/v2/auth', 
      token_url: 'https://oauth2.googleapis.com/token',
      userinfo_url: 'https://www.googleapis.com/oauth2/v3/userinfo'
    }
  } as const;
  
  export const SESSION_CONFIG = {
    cookieName: 'auth_session',
    password: process.env.SESSION_SECRET!, // 최소 32자리
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'lax' as const
    }
  };