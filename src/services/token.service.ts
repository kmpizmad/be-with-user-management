import * as jwt from 'jsonwebtoken';
import config from '../config';

type JwtVerify = {
  userId?: string;
  token: string;
  secret: string;
};

const tokenService = {
  createToken: (
    type: 'access' | 'refresh',
    payload: string | Buffer | Record<string, unknown>,
    options?: Omit<jwt.SignOptions, 'expiresIn'>,
  ) => {
    const secret = type === 'access' ? config.ACCESS_TOKEN_SECRET : config.REFRESH_TOKEN_SECRET;
    const expiresIn = type === 'access' ? config.ACCESS_TOKEN_TTL : config.REFRESH_TOKEN_TTL;

    return jwt.sign(payload, secret, { ...options, expiresIn });
  },
  verify: (payload: JwtVerify) => {
    const decodedToken = jwt.verify(payload.token, payload.secret) as jwt.JwtPayload;
    if (!!payload.userId && payload.userId !== decodedToken.sub) {
      throw new Error('Invalid token');
    }

    return decodedToken;
  },
};

export default tokenService;
