/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */

const user = {
  username: 'john',
  password: 'test',
  name: 'John Doe',
  cookieId: '154',
};

async function register(server) {
  await server.register(require('@hapi/cookie'));

  server.auth.strategy('session', 'cookie', {
    cookie: {
      name: process.env.COOKIE_NAME,
      password: process.env.AUTH_COOKIE_PASSWORD,
      isSecure: process.env.NODE_ENV !== 'development',
      path: '/',
    },
    validateFunc: async (request, session) => {
      if (session.cookieId !== user.cookieId) {
        return { valid: false };
      }

      return { valid: true, credentials: user };

      // const user = await getRepository(User).findOne(session.id);

      // if (!user) {
      //   return {
      //     valid: false,
      //   };
      // }

      // return {
      //   valid: true,
      //   credentials: {
      //     user: session.id,
      //   },
      // };
    },
  });
  server.log('info', 'Plugin registered: authentication with Cookie');
}

export default {
  register,
  name: 'authentication',
  version: '1.0.0',
  once: true,
};
