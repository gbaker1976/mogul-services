var gulp = require( 'gulp' );
var aglio = require( 'gulp-aglio' );
var browserSync = require( 'browser-sync' );
var reload = browserSync.reload;
var spawn = require( 'child_process' ).spawn;
var proc;

gulp.task( 'gen-api-docs', function() {
	return gulp.src( './doc/**/*.md' )
		.pipe( aglio( { template: 'slate', includePath: './doc' } ) )
		.pipe( gulp.dest( './doc' ) );
});

gulp.task( 'doc-watch', [ 'gen-api-docs', 'serve-api-mock' ], reload );

gulp.task( 'serve-api-mock', function(){
    if ( proc && proc.connected ) {
        proc.kill();
    }
    proc = spawn( './node_modules/.bin/api-mock', [ './doc/index.md', '-p', '3002' ] );

    proc.on( 'error', function( err ){
        console.log( "\n***API mock server error:\n" + err + "\n" );
    });

    proc.on( 'exit', function( code, signal ){
        console.log( "\n***API mock server exited.\n" );

        if ( code ) {
            console.log( "\n***Exit code: " + code + "\n" );
        }

        if ( signal ) {
            console.log( "\n***Signal: " + signal + "\n" );
        }

        console.log( "\n" );
    });

    console.log( "\n***API mock server running... PID: " + proc.pid + "***\n" );
    console.log( "\n***API mock server listening on port 3002***\n" );
});

gulp.task( 'serve', [ 'gen-api-docs', 'serve-api-mock' ], function() {
	browserSync({
		server: {
			baseDir: 'doc'
		}
	});

	gulp.watch( './**/*.md', { cwd: 'doc' }, [ 'doc-watch' ] );
});

gulp.task( 'default', [ 'serve' ] );
