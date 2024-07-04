import cookieConfig from './cookie';
import envConfig from './env';

const config = {
  ...envConfig,
  COOKIE_OPTIONS: cookieConfig,
};

export default config;
