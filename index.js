var mogul = require( 'mogul-node' );
var accountsService = require( './services/accounts' );

mogul( [ accountsService ], {
  serviceName: "Mogul API Core",
  api: {
    server: {
      https: false,
      host: '127.0.0.1',
      port: 10001
    },
    routes: {
      '/accounts': [ 'get', 'post' ],
      '/accounts/:id': [ 'get', 'put', 'del' ]
    }
  }
});
