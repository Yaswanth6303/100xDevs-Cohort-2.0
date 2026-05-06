import { sign, verify } from 'hono/jwt';

export interface JwtPayload {
  sub: string;
  exp: number;
  [key: string]: unknown;
}

export const generateToken = async (
  userId: string,
  secret: string,
  expiresInDays: number = 7,
): Promise<string> => {
  const payload: JwtPayload = {
    sub: userId,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * expiresInDays,
  };
  return sign(payload, secret);
};

export const verifyToken = async (token: string, secret: string): Promise<JwtPayload> => {
  const payload = await verify(token, secret);
  return payload as JwtPayload;
};

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = JSON.parse(atob(parts[1]));
    return payload as JwtPayload;
  } catch {
    return null;
  }
};
