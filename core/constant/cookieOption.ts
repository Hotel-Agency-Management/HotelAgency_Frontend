import { authConfig } from "../configs/clientConfig";

export const cookieOptions = {
  path: '/',
  maxAge: authConfig.cookieMaxAge,
  sameSite: authConfig.cookieSameSite.toLowerCase() as 'strict' | 'lax' | 'none',
  secure: authConfig.cookieSecure,
} as const
