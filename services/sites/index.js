var data = require( '../../lib/data' );
var VERSION = '0.1.0';
var returnError = function( err, res ){
    res.send( 500 );
};
var formatListPayload = function( list ){
    var pyl = {
        meta: {
            count: list.length,
            page: 1,
            pageSize: 50,
            links: {
                next: '/sites/' + entity.site_id + '?page=2'
            }
        },
        entities: list
    };

    return pyl;
};
var formatEntityPayload = function( entity ){
    var pyl = {
        meta: {
            rels: {
                pages: '/sites/' + entity.site_id + '/pages',
                aliases: '/sites/' + entity.site_id + '/aliases'
            },
            actions: {
                preview: '/actions/preview/site/' + entity.site_id,
                copy: '/actions/copy/site/' + entity.site_id,
                publish: '/actions/publish/site/' + entity.site_id,
                unpublish: '/actions/unpublish/site/' + entity.site_id
            }
        },
        entity: entity
    };

    return pyl;
};

module.exports = {
  register: function( app ) {
      app.get( { path: '/sites/:id', version: VERSION }, function( req, res, next ){
          data.getSite( req.params.id, function( err, site ){
              if ( err ) {
                  return returnError( err, res );
              }
              res.json( 200, formatEntityPayload( site ) );
              next();
          });
  	});

    app.get( { path: '/sites/:id/aliases', version: VERSION }, function( req, res, next ){
        data.getAliases( req.params.id, 'site', function( err, aliases ){
            if ( err ) {
                return returnError( err, res );
            }
            res.json( 200, formatListPayload( aliases ) );
            next();
        });
    });

	app.get( { path: '/sites', version: VERSION }, function( req, res, next ){
        data.getAllSites( function( err, sites ){
            if ( err ) {
                return returnError( err, res );
            }
            res.json( 200, formatListPayload( sites ) );
            next();
        });
	});

    app.get( { path: '/sites/:id/aliases', version: VERSION }, function( req, res, next ){
        data.getAliases( req.params.id, 'site', function( err, aliases ){
            if ( err ) {
                return returnError( err, res );
            }
            res.json( 200, formatListPayload( aliases ) );
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
            res.json( 200, formatEntityPayload( site ) );
            next();
        });
	});

	app.put( { path: '/sites/:id', version: VERSION }, function( req, res, next ){
        data.updateSite( req.params.id, req.body, function( err, site ){
            if ( err ) {
                return returnError( err, res );
            }
            res.send( 200, formatEntityPayload( site ) );
            next();
        });
	});

	app.del( { path: '/sites/:id', version: VERSION }, function( req, res, next ){
        res.send( 'DELETE /sites/:id' );
        return next();
	});
  }
};
