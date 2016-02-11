var data = require( '../../lib/data' );
var returnError = function( err, res ){
    res.send( 500 );
};

module.exports = {
  register: function( app ) {
	app.get( '/sites', function( req, res, next ){
        res.send( 'GET /sites' );
        return next();
	});

	app.post( '/sites', function( req, res, next ){
        data.saveSite( req.body, function( err, site ){
            if ( err ) {
                return returnError( err, res );
            }
            res.json( 200, site );
            next();
        });
	});

	app.get( '/sites/:host', function( req, res, next ){
        data.getSite( req.params.host, function( err, site ){
            if ( err ) {
                return returnError( err, res );
            }
            res.json( 200, site );
            next();
        });
	});

	app.put( '/sites/:host', function( req, res, next ){
        data.updateSite( req.params.host, req.body, function( err, site ){
            if ( err ) {
                return returnError( err, res );
            }
            res.json( 200, site );
            next();
        });
        return next();
	});

	app.del( '/sites/:host', function( req, res, next ){
        res.send( 'DELETE /sites/:host' );
        return next();
	});
  }
};
