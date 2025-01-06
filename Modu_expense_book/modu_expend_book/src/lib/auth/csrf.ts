import { cookies } from 'next/headers';
import crypto from 'crypto';

export class CSRFProtection {
  private static CSRF_SECRET = process.env.CSRF_SECRET || crypto.randomBytes(32).toString('hex');
  private static COOKIE_NAME = 'csrf-token';

  static generateToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  static async setToken(): Promise<string> {
    const token = this.generateToken();
    const cookieStore = await cookies();
    
    cookieStore.set(this.COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });

    return token;
  }

  static async validateToken(token: string): Promise<boolean> {
    const cookieStore = await cookies();
    const storedToken = cookieStore.get(this.COOKIE_NAME);
    
    if (!storedToken) return false;
    
    try {
      return crypto.timingSafeEqual(
        Buffer.from(token),
        Buffer.from(storedToken.value)
      );
    } catch {
      return false;
    }
  }

  static async clearToken(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(this.COOKIE_NAME);
  }

  static async rotateToken(): Promise<string> {
    await this.clearToken();
    return await this.setToken();
  }
}