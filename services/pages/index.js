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
                next: '/pages/' + entity.page_id + '?page=2'
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
                pages: '/pages/' + entity.page_id + '/regions',
                aliases: '/pages/' + entity.page_id + '/aliases'
            },
            actions: {
                preview: '/actions/preview/page/' + entity.page_id,
                copy: '/actions/copy/page/' + entity.page_id,
                publish: '/actions/publish/page/' + entity.page_id,
                unpublish: '/actions/unpublish/page/' + entity.page_id
            }
        },
        entity: entity
    };

    return pyl;
};

module.exports = {
  register: function( app ) {
      app.get( { path: '/pages/:id', version: VERSION }, function( req, res, next ){
          data.getPage( req.params.id, function( err, page ){
              if ( err ) {
                  return returnError( err, res );
              }
              res.json( 200, formatEntityPayload( page ) );
              next();
          });
  	});

    app.get( { path: '/pages/:id/aliases', version: VERSION }, function( req, res, next ){
        data.getAliases( req.params.id, 'page', function( err, aliases ){
            if ( err ) {
                return returnError( err, res );
            }
            res.json( 200, formatListPayload( aliases ) );
            next();
        });
    });

	app.get( { path: '/pages', version: VERSION }, function( req, res, next ){
        data.getAllPages( function( err, pages ){
            if ( err ) {
                return returnError( err, res );
            }
            res.json( 200, formatListPayload( pages ) );
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
            res.json( 200, formatEntityPayload( page ) );
            next();
        });
	});

	app.put( { path: '/pages/:id', version: VERSION }, function( req, res, next ){
        data.updatePage( req.params.id, req.body, function( err, page ){
            if ( err ) {
                return returnError( err, res );
            }
            res.send( 200, formatEntityPayload( page ) );
            next();
        });
	});

	app.del( { path: '/pages/:id', version: VERSION }, function( req, res, next ){
        res.send( 'DELETE /pages/:id' );
        return next();
	});
  }
};
