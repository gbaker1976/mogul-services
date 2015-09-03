module.exports = {
  register: function( app ) {

    /* Project Services */
    app.get( '/projects', function( req, res, next ){
      res.send( 'GET projects' );
      return next();
    });

    app.post( '/projects', function( req, res, next ){
      res.send( 201, 'POST projects' );
      return next();
    });

    app.get( '/projects/:projectId', function( req, res, next ){
      res.send( 'GET project' );
      return next();
    });

    app.put( '/projects/:projectId', function( req, res, next ){
      res.send( 'PUT project' );
      return next();
    });

    app.del( '/projects/:projectId', function( req, res, next ){
      res.send( 'DELETE project' );
      return next();
    });

    /* Project Item Services */
    app.get( '/projects/:projectId/items', function( req, res, next ){
      res.send( 'GET items' );
      return next();
    });

    app.post( '/projects/:projectId/items', function( req, res, next ){
      res.send( 201, 'POST items' );
      return next();
    });

    app.get( '/projects/:projectId/items/:itemId', function( req, res, next ){
      res.send( 'GET item' );
      return next();
    });

    app.put( '/projects/:projectId/items/:itemId', function( req, res, next ){
      res.send( 'PUT item' );
      return next();
    });

    app.del( '/projects/:projectId/items/:itemId', function( req, res, next ){
      res.send( 'DELETE item' );
      return next();
    });

    /* Project Item Task Services */
    app.get( '/projects/:projectId/items/:itemId/tasks', function( req, res, next ){
      res.send( 'GET tasks' );
      return next();
    });

    app.post( '/projects/:projectId/items/:itemId/tasks', function( req, res, next ){
      res.send( 201, 'POST tasks' );
      return next();
    });

    app.get( '/projects/:projectId/items/:itemId/tasks/:taskId', function( req, res, next ){
      res.send( 'GET task' );
      return next();
    });

    app.put( '/projects/:projectId/items/:itemId/tasks/:taskId', function( req, res, next ){
      res.send( 'PUT task' );
      return next();
    });

    app.del( '/projects/:projectId/items/:itemId/tasks/:taskId', function( req, res, next ){
      res.send( 'DELETE task' );
      return next();
    });
  }
};
