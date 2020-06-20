export default {
  server: null,
  onRequest: (request, h) => {
    this.server.logger.info('onRequest was called');

    return h.continue;
  },
  onPreAuth: (request, h) => {
    request.logger.info('onPreAuth was called');

    return h.continue;
  },
  onCredentials: (request, h) => {
    request.logger.info('onCredentials was called');

    return h.continue;
  },
  onPostAuth: (request, h) => {
    request.logger.info('onPostAuth was called');

    return h.continue;
  },
  onPreHandler: (request, h) => {
    request.logger.info('onPreHandler was called');

    return h.continue;
  },
  onPostHandler: (request, h) => {
    request.logger.info('onPostHandler was called');

    return h.continue;
  },
  onPreResponse: (request, h) => {
    request.logger.info('onPreResponse was called');

    return h.continue;
  },
};
