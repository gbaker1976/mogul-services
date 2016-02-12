var pg = require( 'pg' );
var DataAccess = function(){};
var _client;

DataAccess.prototype.connect = function( callback ){
	if ( _client ) {
		callback( null, _client );
		return;
	}

	pg.connect( process.env.DATABASE_URL, function( err, pgClient ) {
		if ( err ) {
			callback( err );
		} else {
			_client = pgClient;
			callback( null, _client );
		}
	});
};

DataAccess.prototype.getAliases = function( itemId, type, callback ) {
	this.connect(function( err, client ){
		if ( err ) {
			callback( err );
			return;
		}

		client
		   .query({
			   text: 'SELECT a.* FROM alias a WHERE a.item_id = $1 AND a.alias_type = $2 AND a.active = true;',
			   name: 'get-aliases',
			   values: [
				   itemId,
				   type
			   ]
		   })
			  .on( 'row', function( row, result ) {
				  result.addRow( row );
			  })
			  .on( 'end', function( result ){
				  callback( null, result.rows );
			  })
			  .on( 'error', function( err ){
				  callback( 'Error with query: get aliases: ' + err );
			  });
	});
};

DataAccess.prototype.getSite = function( id, callback ) {
	this.connect(function( err, client ){
		if ( err ) {
			callback( err );
			return;
		}

		client
		   .query({
               text: "SELECT s.* FROM site s WHERE s.site_id=$1",
               name: 'select-site',
               values: [ id ]
           })
			  .on( 'row', function( result ) {
				  callback( null, result );
			  });
	});
};

DataAccess.prototype.getAllSites = function( callback ) {
	this.connect(function( err, client ){
		if ( err ) {
			callback( err );
			return;
		}

		client
		   .query({
               text: "SELECT * FROM site",
               name: 'select-all-sites'
           })
           .on( 'row', function( row, result ) {
               result.addRow( row );
           })
           .on( 'end', function( result ){
               callback( null, result.rows );
           })
           .on( 'error', function( err ){
               callback( 'Error with query: get all sites: ' + err );
           });
	});
};

DataAccess.prototype.getSiteByAlias = function( url, callback ) {
	this.connect(function( err, client ){
		if ( err ) {
			callback( err );
			return;
		}

		client
		   .query({
               text: "SELECT s.* FROM site s INNER JOIN alias a ON s.site_id = a.item_id AND a.alias = $1 and a.alias_type = 'page' AND a.active = true AND p.active = true;",
               name: 'get-site-by-alias',
               values: [ url ]
           })
			  .on( 'row', function( result ) {
				  callback( null, result );
			  });
	});
};

DataAccess.prototype.insertSite = function( data, callback ) {
	if ( !data ) {
		throw 'Data parameter must be provided.';
	}

	this.connect(function( err, client ){
		var columnValues = [];
		var columnNames = [];
		var cnt = 1;

		if ( err ) {
			callback( err );
			return;
		}

		for( p in data ) {
			if ( data.hasOwnProperty( p ) ) {
				columnNames.push( p );
				columnValues.push( data[ p ] );
			}
		}

		client
		   .query(
			   "INSERT INTO site (" + columnNames.join(',') + ") VALUES (" + columnNames.map(function(){ return '$' + cnt++ }).join( ',' ) + ") RETURNING *;",
			   columnValues
			)
			  .on( 'row', function( result ) {
				  callback( null, result );
			  });
	});
};

DataAccess.prototype.updateSite = function( id, data, callback ) {
	if ( !data ) {
		throw 'Data parameter must be provided.';
	}

	this.connect(function( err, client ){
		var columnValues = [];
		var setClause = [];
		var cnt = 1;

		if ( err ) {
			callback( err );
			return;
		}

		for( p in data ) {
			if ( data.hasOwnProperty( p ) ) {
				setClause.push( p + '=$' + cnt++ );
				columnValues.push( data[ p ] );
			}
		}

		columnValues.push( id );

		client
		   .query(
			   "UPDATE site SET " + setClause.join(',') + " WHERE site_id=$" + (cnt++) + " RETURNING *;",
			   columnValues
			)
			  .on( 'row', function( result ) {
				  callback( null, result );
			  });
	});
};

DataAccess.prototype.getPageByAlias = function( url, callback ) {
	this.connect(function( err, client ){
		if ( err ) {
			callback( err );
			return;
		}

		client
		   .query( "SELECT p.* FROM page p INNER JOIN alias a ON p.page_id = a.item_id AND a.alias = '" + url + "' AND a.active = true AND p.active = true;" )
			  .on( 'row', function( result ) {
				  callback( null, result );
			  });
	});
};

DataAccess.prototype.getPage = function( id, callback ) {
	this.connect(function( err, client ){
		if ( err ) {
			callback( err );
			return;
		}

		client
		   .query({
               text: "SELECT p.* FROM page p WHERE p.page_id=$1",
               name: 'select-page',
               values: [ id ]
           })
			  .on( 'row', function( result ) {
				  callback( null, result );
			  });
	});
};

DataAccess.prototype.getAllPages = function( callback ) {
	this.connect(function( err, client ){
		if ( err ) {
			callback( err );
			return;
		}

		client
		   .query({
               text: "SELECT * FROM page",
               name: 'select-all-pages'
           })
           .on( 'row', function( row, result ) {
               result.addRow( row );
           })
           .on( 'end', function( result ){
               callback( null, result.rows );
           })
           .on( 'error', function( err ){
               callback( 'Error with query: get all pages: ' + err );
           });
	});
};

DataAccess.prototype.insertPage = function( data, callback ) {
	if ( !data ) {
		throw 'Data parameter must be provided.';
	}

	this.connect(function( err, client ){
		var columnValues = [];
		var columnNames = [];
		var cnt = 1;

		if ( err ) {
			callback( err );
			return;
		}

		for( p in data ) {
			if ( data.hasOwnProperty( p ) ) {
				columnNames.push( p );
				columnValues.push( data[ p ] );
			}
		}

		client
		   .query(
			   "INSERT INTO page (" + columnNames.join(',') + ") VALUES (" + columnNames.map(function(){ return '$' + cnt++ }).join( ',' ) + ") RETURNING *;",
			   columnValues
			)
			  .on( 'row', function( result ) {
				  callback( null, result );
			  });
	});
};

DataAccess.prototype.updatePage = function( id, data, callback ) {
	if ( !data ) {
		throw 'Data parameter must be provided.';
	}

	this.connect(function( err, client ){
		var columnValues = [];
		var setClause = [];
		var cnt = 1;

		if ( err ) {
			callback( err );
			return;
		}

		for( p in data ) {
			if ( data.hasOwnProperty( p ) ) {
				setClause.push( p + '=$' + cnt++ );
				columnValues.push( data[ p ] );
			}
		}

		columnValues.push( id );

		client
		   .query(
			   "UPDATE page SET " + setClause.join(',') + " WHERE page_id=$" + (cnt++) + " RETURNING *;",
			   columnValues
			)
			  .on( 'row', function( result ) {
				  callback( null, result );
			  });
	});
};

DataAccess.prototype.getPageContents = function( pageId, callback ) {
	this.connect(function( err, client ){
		if ( err ) {
			callback( err );
			return;
		}

		client
		   .query({
			   text: 'select p.page_id, rc.region_id, c.* from page p inner join (region r inner join (region_content rc inner join content c on rc.content_id = c.content_id and c.active = true) on r.region_id = rc.region_id and r.active = true) on p.page_id = r.page_id and p.active = true where p.page_id = $1',
			   name: 'get-page-contents',
			   values: [ pageId ]
		   })
			   .on( 'row', function( row, result ) {
				   result.addRow( row );
			   })
			   .on( 'end', function( result ){
				   callback( null, result.rows );
			   })
			   .on( 'error', function( err ){
				   callback( 'Error with query: get page contents: ' + err );
			   });
	});
};

DataAccess.prototype.getPageRegions = function( pageId, callback ) {
	this.connect(function( err, client ){
		if ( err ) {
			callback( err );
			return;
		}

		client
		   .query({
			   text: 'select p.page_id, r.* from page p inner join region r on p.page_id = r.page_id and p.active = true and r.active = true where p.page_id = $1',
			   name: 'get-page-regions',
			   values: [ pageId ]
		   })
			   .on( 'row', function( row, result ) {
				   result.addRow( row );
			   })
			   .on( 'end', function( result ){
				   callback( null, result.rows );
			   })
			   .on( 'error', function( err ){
				   callback( 'Error with query: get page regions: ' + err );
			   });
	});
};

DataAccess.prototype.getPageByAlias = function( alias, callback ){
	var self = this;

	self.getPage( alias, function( err, page ){
		if ( err ) {
			callback( err );
		} else {
			self.getPageContents( page.page_id, function( err, contents ){
				if ( err ) {
					callback( err );
				} else {
					page.contents = contents;
					page.content = '';
					page.contents.forEach(function( content ){
						page.content += content.content;
					});
					callback( null, page );
				}
			});
		}
	});
};

module.exports = new DataAccess();
