import { config } from 'dotenv';
import { server } from '@hapi/hapi';
import { createConnection } from 'typeorm';
import AuthPlugin from './src/auth';
import routes from './src/routes';
import { setAdmin, setStations, setTestUsers } from './src/helper';
import 'reflect-metadata';
import Interceptors from './src/interceptors';
import { registerLogger } from './src/logger';

config();

const port = process.env.PORT;

let app;
const init = async () => {
  app = server({
    port,
    host: 'localhost',
    debug: false,
    routes: {
      cors: {
        origin: ['*'],
        credentials: true,
        headers: ['Accept', 'Content-Type', 'Access-Control-Allow-Credentials'],
        additionalHeaders: ['X-Requested-With'],
      },
    },
  });

  await registerLogger(app);
  app.logger.info('Plugin registered: logger hapi-pino enabled');
  await app.register(AuthPlugin);
  app.auth.default('session');
  app.route(routes);

  // app.ext('onRequest', Interceptors.onRequest);
  // app.ext('onPreAuth', Interceptors.onPreAuth);
  // app.ext('onCredentials', Interceptors.onCredentials);
  // app.ext('onPostAuth', Interceptors.onPostAuth);
  // app.ext('onPreHandler', Interceptors.onPreHandler);
  // app.ext('onPostHandler', Interceptors.onPostHandler);
  // app.ext('onPreResponse', Interceptors.onPreResponse);
  // app.logger.info('Set interceptors');

  await createConnection();
  app.logger.info('TypeOrm create connection');
  await setAdmin();
  app.logger.info('Set administrator');
  await setTestUsers();
  app.logger.info('Set users for test');
  await setStations();
  app.logger.info('Set station for test');
  await app.start();
  app.logger.info(`Server running on ${app.info.uri}`);
};

init().catch((err) => {
  app.logger.error(err);
  // eslint-disable-next-line no-console
  console.log(err);
  process.exit(1);
});
