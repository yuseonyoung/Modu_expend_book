import { OAuthUser, OAuthProvider } from '@/types/auth';
import { OAUTH_CONFIG } from './config';
import { GoogleOAuthProvider, NaverOAuthProvider, KakaoOAuthProvider } from './providers';
/* OAuth 인증 로직을 통합 관리 */
export class AuthService {
  private providers: Record<OAuthProvider, any>;

  constructor() {
    this.providers = {
      google: new GoogleOAuthProvider(OAUTH_CONFIG.google),
      naver: new NaverOAuthProvider(OAUTH_CONFIG.naver),
      kakao: new KakaoOAuthProvider(OAUTH_CONFIG.kakao)
    };
  }

  getProvider(name: OAuthProvider) {
    const provider = this.providers[name];
    if (!provider) {
      throw new Error(`Unknown provider: ${name}`);
    }
    return provider;
  }

  async authenticateUser(provider: OAuthProvider, code: string): Promise<OAuthUser> {
    const oauthProvider = this.getProvider(provider);
    const token = await oauthProvider.getToken(code);
    const userInfo = await oauthProvider.getUserInfo(token);
    return userInfo;
  }
}