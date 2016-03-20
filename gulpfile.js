'use strict';

var path = require('path'),
    gulp = require('gulp'),
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
    reload = browserSync.reload,
    $ = require('gulp-load-plugins')();

// set variable via $ gulp --type production
var environment = $.util.env.type || 'development';
var isProduction = environment === 'production';
var webpackConfig = require('./webpack.config.js').getConfig('development');
var port = $.util.env.port || 1337;
var app = 'app/';
var dist = 'dist/';

var paths = {
  html: 'app/**/*.html',
  styles: 'app/styles/**/*.scss',
  mainScript: 'app/js/app.jsx',
  scripts: ['app/js/**/*.jsx', 'app/js/**/*.js'],
  vendors: ['app/vendor/**/*.js'],
  data: ['app/data/**/*.json'],
  images: ['app/images/**/*.{ttf,woff,eof,svg,png,jpg}'],
  tmp: ['.module-cache','.sass-cache','.tmp','dist/js'],
  destroot: 'dist',
  destimages: 'dist/images',
  destjs: 'dist/js',
  destcss: 'dist/css',
  destdata: 'dist/data',
  destvendor: 'dist/vendor'
};

gulp.task('scripts', function(){
  return gulp.src(webpackConfig.entry)
    .pipe($.webpack(webpackConfig))
    .pipe(isProduction ? $.uglify() : $.util.noop())
    .pipe(gulp.dest(paths.destjs))
    .on('error', function(error) {
      console.log('ERROR: ' + error.toString());
      this.emit("end");
    })
    //.pipe($.size({title: 'js'}))
    //.pipe($.connect.reload());
});

// watch files for changes and reload
gulp.task('serve',['clean','minify-html','sass','scripts','copyImages','compileVendors','data','watch'], function() {
  browserSync.init({
    server: {
      baseDir: paths.destroot,
      index: 'index.html',
      middleware: [ historyApiFallback() ],
    }
  });
  gulp.watch(['*.html', 'css/**/*.css', 'js/**/*.js', 'js/**/*.jsx', 'images/**/*.{ttf,woff,eof,svg,png,jpg}'], {cwd: 'app/build'}, reload);
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

gulp.task('compileVendors', function(){
  return gulp.src(paths.vendors)
    .pipe(gulp.dest(paths.destvendor));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.vendors, ['compileVendors']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.styles, ['sass']);
  gulp.watch(paths.html, ['minify-html']);
  gulp.watch(paths.data, ['data']);
  gulp.watch(paths.images, ['copyImages']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'scripts', 'sass', 'copyImages', 'minify-html','compileVendors']);
