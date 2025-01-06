import { BaseOAuthProvider } from './base';
import { GoogleOAuthProvider } from './google';
import { KakaoOAuthProvider } from './kakao';
import { NaverOAuthProvider } from './naver';

export {
  BaseOAuthProvider,
  GoogleOAuthProvider,
  KakaoOAuthProvider,
  NaverOAuthProvider
};

export const createOAuthProvider = (
  provider: 'google' | 'kakao' | 'naver',
  config: any
): BaseOAuthProvider => {
  switch (provider) {
    case 'google':
      return new GoogleOAuthProvider(config);
    case 'kakao':
      return new KakaoOAuthProvider(config);
    case 'naver':
      return new NaverOAuthProvider(config);
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
};