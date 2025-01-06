import { BaseOAuthProvider } from './base';
import { OAuthUser } from '@/types/auth';

interface KakaoUserResponse {
  id: number;
  kakao_account: {
    email: string;
    profile: {
      nickname: string;
      profile_image_url?: string;
    };
  };
}

export class KakaoOAuthProvider extends BaseOAuthProvider {
  generateAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: this.config.client_id,
      redirect_uri: this.config.redirect_uri,
      response_type: 'code',
    });

    return `${this.config.auth_url}?${params.toString()}`;
  }

  async getToken(code: string): Promise<string> {
    const response = await fetch(this.config.token_url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: this.config.client_id,
        client_secret: this.config.client_secret,
        code,
        redirect_uri: this.config.redirect_uri,
      })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to get token');
    }

    return data.access_token;
  }

  async getUserInfo(token: string): Promise<OAuthUser> {
    const response = await fetch(this.config.userinfo_url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to get user info');
    }

    const data: KakaoUserResponse = await response.json();
    
    return {
      id: String(data.id),
      email: data.kakao_account.email,
      name: data.kakao_account.profile.nickname,
      picture: data.kakao_account.profile.profile_image_url,
      provider: 'kakao',
      accessToken: token  // accessToken 추가
    };
  }
}