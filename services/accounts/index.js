module.exports = {
  register: function( app ) {
    app.get( '/accounts', function( req, res, next ){
      res.send( 'GET /accounts' );
      return next();
    });

    app.post( '/accounts', function( req, res, next ){
      res.send( 201, 'POST /accounts' );
      return next();
    });

    app.get( '/accounts/:id', function( req, res, next ){
      res.send( 'GET /accounts/:id' );
      return next();
    });

    app.put( '/accounts/:id', function( req, res, next ){
      res.send( 'PUT /accounts/:id' );
      return next();
    });

    app.del( '/accounts/:id', function( req, res, next ){
      res.send( 'DELETE /accounts/:id' );
      return next();
    });
  }
};
