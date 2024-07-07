import * as jwt from 'jsonwebtoken';
import config from '@config';

type VerifyPayload = {
  userId?: string;
  token: string;
  secret: string;
};

type TokenOptions = Omit<jwt.SignOptions, 'expiresIn'> & {
  payload?: string | Buffer | Record<string, unknown>;
};

const tokenService = {
  createToken: (type: 'access' | 'refresh', options: TokenOptions) => {
    const { payload = {}, ...rest } = options;
    const secret = type === 'access' ? config.ACCESS_TOKEN_SECRET : config.REFRESH_TOKEN_SECRET;
    const expiresIn = type === 'access' ? config.ACCESS_TOKEN_TTL : config.REFRESH_TOKEN_TTL;

    return jwt.sign(payload, secret, { ...rest, expiresIn });
  },
  verify: (payload: VerifyPayload) => {
    const decodedToken = jwt.verify(payload.token, payload.secret) as jwt.JwtPayload;
    if (!!payload.userId && payload.userId !== decodedToken.sub) {
      throw new Error('Invalid token');
    }

    return decodedToken;
  },
};

export default tokenService;
