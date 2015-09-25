var mogul = require( 'mogul-node' );
var accountsService = require( './services/accounts' );
var projectsService = require( './services/projects' );
var config = require( 'config' );

mogul( [ accountsService, projectsService ], config, {
  serviceName: "Mogul API Core",
  api: {
    server: {
      https: false,
      host: '127.0.0.1',
      port: 10001
    },
    routes: {
      '/accounts': [ 'get', 'post' ],
      '/accounts/:id': [ 'get', 'put', 'del' ],
	  '/projects': [ 'get', 'post' ],
      '/projects/:projectId': [ 'get', 'put', 'del' ],
	  '/projects/:projectId/items': [ 'get', 'post' ],
	  '/projects/:projectId/items/:itemId': [ 'get', 'put', 'del' ],
	  '/projects/:projectId/items/:itemId/tasks': [ 'get', 'post' ],
	  '/projects/:projectId/items/:itemId/tasks/:taskId': [ 'get', 'put', 'del' ]
    }
  }
});
