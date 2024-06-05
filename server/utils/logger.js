import pino from 'pino';
import 'dotenv/config';
const { BETTERSTACK_SOURCE_TOKEN } = process.env;

const transports = pino.transport({
  targets: [
    {
      target: 'pino-pretty',
      options: {
        translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
        ignore: 'pid,hostname',
      },
    },

    {
      target: '@logtail/pino',
      options: { sourceToken: BETTERSTACK_SOURCE_TOKEN },
    },
  ],
});
const logger = pino(
  {
    redact: {
      paths: ['email', 'password', 'address', 'dob', 'confirmPassword'],
      remove: true,
    },
  },
  transports,
);

export default logger;
