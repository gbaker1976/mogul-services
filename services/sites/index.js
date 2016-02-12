var data = require( '../../lib/data' );
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
              res.json( 200, site );
              next();
          });
  	});

	app.get( { path: '/sites', version: VERSION }, function( req, res, next ){
        data.getAllSites( function( err, sites ){
            if ( err ) {
                return returnError( err, res );
            }
            res.json( 200, sites );
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
            res.json( 200, site );
            next();
        });
	});

	app.put( { path: '/sites/:id', version: VERSION }, function( req, res, next ){
        data.updateSite( req.params.id, req.body, function( err, site ){
            if ( err ) {
                return returnError( err, res );
            }
            res.send( 200, site );
            next();
        });
	});

	app.del( { path: '/sites/:id', version: VERSION }, function( req, res, next ){
        res.send( 'DELETE /sites/:id' );
        return next();
	});
  }
};
