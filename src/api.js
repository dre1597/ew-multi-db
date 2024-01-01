const Hapi = require('@hapi/hapi');

const app = Hapi.server({
  port: 3000,
  host: 'localhost'
});

const init = async () => {

  app.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {

      return 'Hello World!';
    }
  });

  await app.start();
  console.log('Server running on %s', app.info.uri);

  return app;
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

module.exports = init();
