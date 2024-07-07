import 'dotenv/config';
import { server } from '@www';
import config from '@config';

server.start(config.PORT);
