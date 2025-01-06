import { BaseOAuthProvider } from './base';
import { OAuthUser } from '@/types/auth';

interface GoogleUserResponse {
  sub: string;
  email: string;
  name: string;
  picture?: string;
}

export class GoogleOAuthProvider extends BaseOAuthProvider {
  generateAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: this.config.client_id,
      redirect_uri: this.config.redirect_uri,
      response_type: 'code',
      scope: 'email profile',
      access_type: 'offline',
      prompt: 'consent'
    });

    return `${this.config.auth_url}?${params.toString()}`;
  }

  async getToken(code: string): Promise<string> {
    const response = await fetch(this.config.token_url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: this.config.client_id,
        client_secret: this.config.client_secret,
        redirect_uri: this.config.redirect_uri,
        grant_type: 'authorization_code',
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

    const data: GoogleUserResponse = await response.json();
    
    return {
      id: data.sub,
      email: data.email,
      name: data.name,
      picture: data.picture,
      provider: 'google',
      accessToken: token  // accessToken 추가
    };
  }
}