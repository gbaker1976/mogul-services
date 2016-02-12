var restify = require( 'restify' );
var sitesService = require( './services/sites' );
var pagesService = require( './services/pages' );
// var regionsService = require( './services/regions' );
// var contentsService = require( './services/contents' );
// var componentsService = require( './services/components' );

var server = restify.createServer({
  name: 'Mogul API Core',
  version: '0.1.0'
});

server.use( restify.queryParser() );
server.use( restify.bodyParser() );

[ sitesService, pagesService ].forEach(function( service ){
  service.register( server );
});

server.use( restify.gzipResponse() );

server.listen( 10001, function () {
  console.log( '%s listening at %s', server.name, server.url );
});
