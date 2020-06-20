import * as hapiPino from 'hapi-pino';

const hidedHeaders = [
  'req.headers.cookie',
];

export async function registerLogger(server) {
  await server.register({
    plugin: hapiPino,
    options: {
      prettyPrint: true,
      level: 'info',
      redact: hidedHeaders,
      logPayload: true,
    },
  });
}
