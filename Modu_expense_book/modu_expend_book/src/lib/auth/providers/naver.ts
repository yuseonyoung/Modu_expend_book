import { BaseOAuthProvider } from './base';
import { OAuthUser } from '@/types/auth';

interface NaverUserResponse {
  response: {
    id: string;
    email: string;
    name: string;
    profile_image?: string;
  };
}

export class NaverOAuthProvider extends BaseOAuthProvider {
  generateAuthUrl(): string {
    const state = Buffer.from(Date.now().toString()).toString('base64');
    const params = new URLSearchParams({
      client_id: this.config.client_id,
      redirect_uri: this.config.redirect_uri,
      response_type: 'code',
      state
    });

    return `${this.config.auth_url}?${params.toString()}`;
  }

  async getToken(code: string): Promise<string> {
    const state = Buffer.from(Date.now().toString()).toString('base64');
    const response = await fetch(this.config.token_url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: this.config.client_id,
        client_secret: this.config.client_secret,
        code,
        state,
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
      headers: { Authorization: `Bearer ${token}` }
    });
  
    if (!response.ok) {
      throw new Error('Failed to get user info');
    }
  
    const data: NaverUserResponse = await response.json();
    
    return {
      id: data.response.id,
      email: data.response.email,
      name: data.response.name,
      picture: data.response.profile_image,
      provider: 'naver',
      accessToken: token  // accessToken 추가
    };
  }
}