import { OAuthUser } from '@/types/auth';

export interface OAuthConfig {
  client_id: string;
  client_secret: string;
  redirect_uri: string;
  auth_url: string;
  token_url: string;
  userinfo_url: string;
}

export abstract class BaseOAuthProvider {
  protected config: OAuthConfig;

  constructor(config: OAuthConfig) {
    this.config = config;
  }

  abstract generateAuthUrl(): string;
  abstract getToken(code: string): Promise<string>;
  abstract getUserInfo(token: string): Promise<OAuthUser>;
}