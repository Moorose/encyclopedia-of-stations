/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import UserService from './service/UserService';

async function register(server) {
  await server.register(require('@hapi/cookie'));

  server.auth.strategy('session', 'cookie', {
    cookie: {
      name: process.env.COOKIE_NAME,
      password: process.env.AUTH_COOKIE_PASSWORD,
      // isSecure: process.env.NODE_ENV !== 'development',
      isSecure: false,
      path: '/',
    },
    validateFunc: async (request, session) => {
      const account = await UserService.getById({ userId: session.id });

      if (!account) {
        return { valid: false };
      }

      return { valid: true, credentials: account };
    },
  });
  server.logger.info('Plugin registered: authentication with Cookie');
}

export default {
  register,
  name: 'authentication',
  version: '1.0.0',
  once: true,
};
