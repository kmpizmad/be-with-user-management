import { sign, verify } from 'jsonwebtoken';
import { generateId, createIdFormat, getCharset } from '../../lib/utils/id-generation';
import { Dictionary } from '../../lib/interfaces';
import createController from '../../lib/server/createController';

const appCredentials = createController<{ appId: string; appSecret: string; apiKey: string }>((_, res) => {
  const appId = generateId({
    format: createIdFormat(32, { delimiter: '-', delimiterPositions: [16] }),
    charset: getCharset({ lowercase: true, numbers: true }),
  });
  const appSecret = generateId({ length: 32 });
  const apiKey = generateId({
    length: 32,
    charset: getCharset({ lowercase: true, uppercase: true, numbers: true }),
  });

  res.status(201).json({ status: 201, message: 'Generated credentials', data: { appId, appSecret, apiKey } });
});

const tokenCredentials = createController<
  Dictionary,
  { appId: string; appSecret: string },
  { accessToken: string; refreshToken: string }
>((req, res) => {
  const accessToken = sign({ appId: req.body.appId }, 'mysecret', { expiresIn: '5m' });
  const refreshToken = sign({ appId: req.body.appId, appSecret: req.body.appSecret }, 'mysecret', { expiresIn: '7d' });

  res.status(201).json({ status: 201, message: 'Generated access tokens', data: { accessToken, refreshToken } });
});

const refreshTokenCredentials = createController<Dictionary, { refreshToken: string }, { accessToken: string }>(
  (req, res) => {
    const refreshToken: any = verify(req.body.refreshToken, 'mysecret');
    if (!refreshToken.appSecret) throw new Error('Invalid token');

    const accessToken = sign({ appId: refreshToken.appId }, 'mysecret', { expiresIn: '5m' });
    res.status(201).json({ status: 201, message: 'Refreshed access token', data: { accessToken } });
  },
  (err: Error) => {
    return [
      err.message.toLowerCase().includes('invalid'),
      { status: 400, name: 'INVALID_TOKEN', message: err.message, stack: err.stack },
    ];
  },
);

export default { appCredentials, tokenCredentials, refreshTokenCredentials };

// AppId -> publikus
// AppSecret -> privát
// Api Key -> AppId-hoz tartozik (tartalmaz: appId, appSecret)
