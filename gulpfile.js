var gulp = require( 'gulp' );
var aglio = require( 'gulp-aglio' );
var browserSync = require( 'browser-sync' );
var reload = browserSync.reload;

gulp.task( 'gen-api-docs', function() {
	return gulp.src( './doc/**/*.md' )
	.pipe( aglio( { template: 'default' } ) )
	.pipe( gulp.dest( './doc' ) );
});

gulp.task( 'serve', function() {
	browserSync({
		server: {
			baseDir: 'doc'
		}
	});
});

gulp.watch( './doc/**/*.md', { cwd: 'doc' }, [ 'gen-api-docs', reload ] );

gulp.task( 'default', [ 'gen-api-docs', 'serve' ] );
