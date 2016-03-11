/**
 * Created by Muh. Angga Muttaqien on 17-Feb-16.
 */


/**
 * load all the gulp plugins
 */
var gulp = require('gulp'),
	minifycss = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	uglify = require('gulp-uglify'),
	usemin = require('gulp-usemin'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	cache = require('gulp-cache'),
	changed = require('gulp-changed'),
	rev = require('gulp-rev'),
	browserSync = require('browser-sync').create(),
	del = require('del'),
	ngannotate = require('gulp-ng-annotate'),
	htmlmin = require('gulp-htmlmin');

/**
 * configure all gulp task
 */

// default
gulp.task('default', function(){
	gulp.start('usemin', 'htmlmin', 'imagemin', 'copyfonts');
});

// usemin
gulp.task('usemin',['jshint'], function(){
	return gulp.src(['./app/index.html'])
		.pipe(usemin({
			css:[minifycss(), rev()],
			jsapp: [ngannotate(), uglify(),rev()],
			jsvendor: [ngannotate(), uglify(),rev()]
		}))
		.pipe(gulp.dest('dist/'))
		.pipe(notify({ message: 'usemin task is completed!' }));
});

// htmlmin
gulp.task('htmlmin', function(){
	return gulp.src('./app/views/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('dist/views/'));
});

// imagemin
gulp.task('imagemin', function(){
	return del(['dist/images']), gulp.src(['./app/images/*'])
		.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
		.pipe(gulp.dest('dist/images'))
		.pipe(notify({ message: 'imagemin task is completed!' }));
});

// copyfonts
gulp.task('copyfonts', ['clean'], function(){
	gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
		.pipe(gulp.dest('./dist/fonts'))
		.pipe(notify({ message: 'copyfonts task is completed!' }));
	gulp.src('./bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
		.pipe(gulp.dest('./dist/fonts'))
		.pipe(notify({ message: 'copyfonts task is completed!' }));
});

// jshint
gulp.task('jshint', function(){
	return gulp.src('app/scripts/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});

// clean
gulp.task('clean', function(){
	return del(['dist']);
});

// watch
gulp.task('watch', ['browser-sync'], function(){
	// watch .js files
	gulp.watch('{app/scripts/**/*.js,app/styles/**/*.css,app/**/*.html}', ['usemin']);
	// watch image files
	gulp.watch('app/images/**/*', ['imagemin']);
});

// browser-sync (still error)
gulp.task('browser-sync', ['default'], function(){
	var files = [
		'app/**/*.html',
		'app/styles/**/*.css',
		'app/images/**/*.png',
		'app/scripts/**/*.js',
		'dist/**/*'
	];

	browserSync.init(files, {
		server: {
			baseDir: "dist",
			index: "index.html"
		}
		// server: "./app",
		// port: 9090
	});

	// watch any files in dist/, reload on change
	gulp.watch(['dist/**']).on('change', browserSync.reload);
});
