declare module '@/types/auth' {
    // OAuth 제공자 타입
    export type OAuthProvider = 'google' | 'kakao' | 'naver';
  
    // OAuth 사용자 정보 인터페이스
    export interface OAuthUser {
      id: string;
      email: string;
      name: string;
      picture?: string;
      provider: OAuthProvider;
      accessToken: string;  // accessToken 추가
    }
  
    // OAuth 토큰 응답 인터페이스
   
    export interface SessionUser extends OAuthUser {}

    export interface OAuthConfig {
    client_id: string;
    client_secret: string;
    redirect_uri: string;
    auth_url: string;
    token_url: string;
    userinfo_url: string;
    }

    export interface OAuthTokenResponse {
    access_token: string;
    token_type: string;
    refresh_token?: string;
    expires_in?: number;
    }
    
    // 세션 사용자 정보 인터페이스
    export interface SessionUser {
      id: string;
      email: string;
      name: string;
      picture?: string;
      provider: OAuthProvider;
      accessToken: string;
    }
  
    // 인증 상태 인터페이스
    export interface AuthState {
      user: SessionUser | null;
      isAuthenticated: boolean;
      isLoading: boolean;
    }
  
    // OAuth 에러 타입
    export interface OAuthError {
      error: string;
      error_description?: string;
      state?: string;
    }
  }