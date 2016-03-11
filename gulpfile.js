'use strict';
/* globals require, console */
var gulp = require('gulp'),
    minifyHtml = require('gulp-minify-html'),
    react = require('gulp-react'),
    browserSync = require('browser-sync').create('chuck norris'),
    sass = require('gulp-ruby-sass'),
    del = require('del'),
    webpack = require('gulp-webpack'),
    browserify = require('browserify'),
    babel = require('gulp-babel'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    historyApiFallback = require('connect-history-api-fallback'),
    reload = browserSync.reload;

var paths = {
  html: 'app/src/**/*.html',
  styles: 'app/src/styles/**/*.scss',
  mainScript: 'app/src/js/app.jsx',
  scripts: ['app/src/js/**/*.jsx'],
  vendors: ['app/src/vendor/**/*.js'],
  data: ['app/src/data/**/*.json'],
  images: ['app/src/images/**/*.{ttf,woff,eof,svg,png,jpg}'],
  tmp: ['.module-cache','.sass-cache','.tmp','app/build/js'],
  destroot: 'app/build',
  destimages: 'app/build/images',
  destjs: 'app/build/js',
  destcss: 'app/build/css',
  destdata: 'app/build/data',
  destvendor: 'app/build/vendor'
};

// watch files for changes and reload
gulp.task('serve',['clean','minify-html','sass','reactify','copyImages','compileVendors','data','watch'], function() {
  browserSync.init({
    server: {
      baseDir: paths.destroot,
      index: 'index.html',
      middleware: [ historyApiFallback() ],
    }
  });
  gulp.watch(['*.html', 'css/**/*.css', 'js/**/*.js', 'images/**/*.{ttf,woff,eof,svg,png,jpg}'], {cwd: 'app/build'}, reload);
});

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(paths.tmp).then(function (paths) {
    console.log('Deleted files/folders:\n', paths.join('\n'));
  });
});

gulp.task('copyImages', function() {
  gulp.src(paths.images)
  .pipe(gulp.dest(paths.destimages));
});

gulp.task('data',function(){
  return gulp.src(paths.data)
    .pipe(gulp.dest(paths.destdata));
});

gulp.task('minify-html', function () {
  return gulp.src(paths.html)
    .pipe(minifyHtml())
    .pipe(gulp.dest(paths.destroot));
});

gulp.task('sass', function() {
  return sass(paths.styles)
    .pipe(gulp.dest(paths.destcss))
    .pipe(reload({ stream:true }));
});

gulp.task('reactify',['clean'], function() {
  return browserify({entries: paths.mainScript, extensions: ['.jsx'], debug: true})
    .transform('babelify', {presets: ['es2015', 'react']})
    .bundle()
    .on('error', function(error) {
      console.log('ERROR: ' + error.toString());
      this.emit("end");
    })
    .pipe(source('app.min.js'))
    .pipe(gulp.dest('app/build/js'));
});

gulp.task('compileVendors', function(){
  return gulp.src(paths.vendors)
    .pipe(gulp.dest(paths.destvendor));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.vendors, ['compileVendors']);
  gulp.watch(paths.scripts, ['reactify']);
  gulp.watch(paths.styles, ['sass']);
  gulp.watch(paths.html, ['minify-html']);
  gulp.watch(paths.data, ['data']);
  gulp.watch(paths.images, ['copyImages']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'reactify', 'sass', 'copyImages', 'minify-html','compileVendors']);
