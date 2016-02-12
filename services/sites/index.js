var data = require( '../../lib/data' );
var payloadFormatter = require( '../../lib/payload-formatters' );
var VERSION = '0.1.0';
var returnError = function( err, res ){
    res.send( 500 );
};

module.exports = {
  register: function( app ) {
      app.get( { path: '/sites/:id', version: VERSION }, function( req, res, next ){
          data.getSite( req.params.id, function( err, site ){
              if ( err ) {
                  return returnError( err, res );
              }
              res.json( 200, payloadFormatter.formatSiteEntityPayload( site ) );
              next();
          });
  	});

    app.get( { path: '/sites/:id/aliases', version: VERSION }, function( req, res, next ){
        data.getAliases( req.params.id, 'site', function( err, aliases ){
            if ( err ) {
                return returnError( err, res );
            }
            res.json( 200, payloadFormatter.formatPageAliasListPayload( req.params.id, aliases ) );
            next();
        });
    });

    app.get( { path: '/sites/:id/pages', version: VERSION }, function( req, res, next ){
        data.getPagesBySiteId( req.params.id, function( err, pages ){
            if ( err ) {
                return returnError( err, res );
            }
            res.json( 200, payloadFormatter.formatPageListPayload( pages ) );
            next();
        });
    });

	app.get( { path: '/sites', version: VERSION }, function( req, res, next ){
        data.getAllSites( function( err, sites ){
            if ( err ) {
                return returnError( err, res );
            }
            res.json( 200, payloadFormatter.formatSiteListPayload( sites ) );
            next();
        });
	});

    // app.patch( { path: '/sites/:id', version: VERSION }, function( req, res, next ){
    //     res.send( 'PATCH supported!' );
    //     next();
    // });

	app.post( { path: '/sites', version: VERSION }, function( req, res, next ){
        data.insertSite( req.body, function( err, site ){
            if ( err ) {
                return returnError( err, res );
            }
            res.json( 200, payloadFormatter.formatSiteEntityPayload( site ) );
            next();
        });
	});

	app.put( { path: '/sites/:id', version: VERSION }, function( req, res, next ){
        data.updateSite( req.params.id, req.body, function( err, site ){
            if ( err ) {
                return returnError( err, res );
            }
            res.send( 200, payloadFormatter.formatSiteEntityPayload( site ) );
            next();
        });
	});

	app.del( { path: '/sites/:id', version: VERSION }, function( req, res, next ){
        res.send( 'DELETE /sites/:id' );
        return next();
	});
  }
};
