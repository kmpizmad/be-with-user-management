import { CookieOptions } from 'express';

const cookieConfig: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
};

export default cookieConfig;
