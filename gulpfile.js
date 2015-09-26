var gulp = require( 'gulp' );
var aglio = require( 'gulp-aglio' );
var browserSync = require( 'browser-sync' );
var reload = browserSync.reload;

gulp.task( 'gen-api-docs', function() {
	return gulp.src( './doc/**/*.md' )
		.pipe( aglio( { template: 'slate', includePath: './doc' } ) )
		.pipe( gulp.dest( './doc' ) );
});

gulp.task( 'doc-watch', [ 'gen-api-docs' ], reload );

gulp.task( 'serve', [ 'gen-api-docs' ], function() {
	browserSync({
		server: {
			baseDir: 'doc'
		}
	});

	gulp.watch( './**/*.md', { cwd: 'doc' }, [ 'doc-watch' ] );
});

gulp.task( 'default', [ 'serve' ] );
