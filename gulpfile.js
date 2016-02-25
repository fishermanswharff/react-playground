'use strict';
/* globals require, console */
var gulp = require('gulp'),
    minifyHtml = require('gulp-minify-html'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    react = require('gulp-react'),
    browserSync = require('browser-sync'),
    sass = require('gulp-ruby-sass'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util'),
    del = require('del'),
    webpack = require('gulp-webpack'),
    browserify = require('browserify'),
    babel = require('gulp-babel'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    reload = browserSync.reload;

var paths = {
  html: 'app/src/**/*.html',
  styles: 'app/src/styles/**/*.scss',
  mainScript: 'app/src/js/app.jsx',
  scripts: ['app/src/js/**/*.jsx'],
  vendors: ['app/src/vendor/**/*.js'],
  data: ['app/src/data/**/*.json'],
  tmp: ['.module-cache','.sass-cache','.tmp','app/build/js'],
  destroot: 'app/build',
  destjs: 'app/build/js',
  destcss: 'app/build/css',
  destdata: 'app/build/data',
  destvendor: 'app/build/vendor'
};

// watch files for changes and reload
gulp.task('serve',['clean','minify-html','sass','reactify','compileVendors','data','watch'], function() {
  browserSync({
    server: {
      baseDir: paths.destroot
    }
  });
  gulp.watch(['*.html', 'css/**/*.css', 'js/**/*.js'], {cwd: 'app/build'}, reload);
});

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(paths.tmp).then(function (paths) {
    console.log('Deleted files/folders:\n', paths.join('\n'));
  });
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
      console.log('————————————————————   ERROR: ' + error.toString() + '————————————————————————');
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
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'reactify', 'sass', 'minify-html','compileVendors']);


