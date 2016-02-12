var data = require( '../../lib/data' );
var payloadFormatter = require( '../../lib/payload-formatters' );
var VERSION = '0.1.0';
var returnError = function( err, res ){
    res.send( 500 );
};

module.exports = {
  register: function( app ) {
      app.get( { path: '/pages/:id', version: VERSION }, function( req, res, next ){
          data.getPage( req.params.id, function( err, page ){
              if ( err ) {
                  return returnError( err, res );
              }
              res.json( 200, payloadFormatter.formatPageEntityPayload( page ) );
              next();
          });
  	});

    app.get( { path: '/pages/:id/aliases', version: VERSION }, function( req, res, next ){
        data.getAliases( req.params.id, 'page', function( err, aliases ){
            if ( err ) {
                return returnError( err, res );
            }
            res.json( 200, payloadFormatter.formatPageAliasListPayload( req.params.id, aliases ) );
            next();
        });
    });

    app.get( { path: '/pages/:id/regions', version: VERSION }, function( req, res, next ){
        data.getRegionsByPageId( req.params.id, function( err, regions ){
            if ( err ) {
                return returnError( err, res );
            }
            res.json( 200, payloadFormatter.formatRegionListPayload( req.params.id, regions ) );
            next();
        });
    });

	app.get( { path: '/pages', version: VERSION }, function( req, res, next ){
        data.getAllPages( function( err, pages ){
            if ( err ) {
                return returnError( err, res );
            }
            res.json( 200, payloadFormatter.formatPageListPayload( pages ) );
            next();
        });
	});

    // app.patch( { path: '/pages/:id', version: VERSION }, function( req, res, next ){
    //     res.send( 'PATCH supported!' );
    //     next();
    // });

	app.post( { path: '/pages', version: VERSION }, function( req, res, next ){
        data.insertPage( req.body, function( err, page ){
            if ( err ) {
                return returnError( err, res );
            }
            res.json( 200, payloadFormatter.formatPageEntityPayload( page ) );
            next();
        });
	});

	app.put( { path: '/pages/:id', version: VERSION }, function( req, res, next ){
        data.updatePage( req.params.id, req.body, function( err, page ){
            if ( err ) {
                return returnError( err, res );
            }
            res.send( 200, payloadFormatter.formatPageEntityPayload( page ) );
            next();
        });
	});

	app.del( { path: '/pages/:id', version: VERSION }, function( req, res, next ){
        res.send( 'DELETE /pages/:id' );
        return next();
	});
  }
};
