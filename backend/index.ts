import { config } from 'dotenv';
import { server } from '@hapi/hapi';
import AuthPlugin from './src/auth';
import routes from './src/routes';
import 'reflect-metadata';

config();

const port = process.env.PORT;

const init = async () => {
  const app = server({
    port,
    host: 'localhost',
    debug: {
      request: ['error'],
    },
  });

  // await app.register(AuthPlugin);
  // app.auth.default('session');
  app.route(routes);


  await app.start();

  // eslint-disable-next-line no-console
  console.log(`Server running on ${app.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  // eslint-disable-next-line no-console
  console.log(err);
  process.exit(1);
});

init();
