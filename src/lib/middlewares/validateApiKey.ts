import { JwtPayload, verify } from 'jsonwebtoken';
import { AppCredentialSchema } from '../schemas/credentials';
import { Dictionary } from '../interfaces';
import config from '../../config';
import { prisma } from '../../clients';
import createController from '../server/createController';

type Token = JwtPayload & Omit<AppCredentialSchema, 'apiKey'>;

const validateApiKey = createController<{ appId: string }, Dictionary, Dictionary, { apiKey: string }>(
  async (req, _, next) => {
    const token = verify(req.query.apiKey, config.JWT_SECRET) as Token;
    if (token.appId !== req.params.appId) {
      next({ status: 400, name: 'INVALID_KEY', message: 'Invalid API key' });
      return;
    }

    const app = await prisma.app.findUnique({ where: { id: token.appId } });
    if (!app) {
      next({ status: 404, name: 'NOTFOUND', message: "No app found with the given 'appId'" });
      return;
    }

    req.appSecret = app.secret;

    next();
  },
  err => {
    return [
      err.message.toLowerCase().includes('invalid'),
      { status: 400, name: 'INVALID_TOKEN', message: err.message, stack: err.stack },
    ];
  },
);

export default validateApiKey;
