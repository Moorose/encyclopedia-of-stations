import { config } from 'dotenv';
import { server } from '@hapi/hapi';
import { createConnection } from 'typeorm';
import AuthPlugin from './src/auth';
import routes from './src/routes';
import { setAdmin, setStations, setTestUsers } from './src/helper';
import 'reflect-metadata';
import { preResponse } from './src/intercepter';

config();

const port = process.env.PORT;

const init = async () => {
  const app = server({
    port,
    host: 'localhost',
    debug: {
      request: ['error'],
    },
    routes: {
      cors: {
        origin: ['*'],
        credentials: true,
        headers: ['Accept', 'Content-Type', 'Access-Control-Allow-Credentials'],
        additionalHeaders: ['X-Requested-With'],
      },
    },
  });

  await app.register(AuthPlugin);
  app.auth.default('session');
  app.route(routes);

  app.ext('onPreResponse', preResponse);


  await createConnection();
  await setAdmin();
  await setTestUsers();
  await setStations();
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
