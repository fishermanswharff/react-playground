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
    del = require('del'),
    reload = browserSync.reload;

var paths = {
  html: 'src/**/*.html',
  styles: 'src/styles/**/*.scss',
  scripts: ['src/js/*.jsx'],
  tmp: ['app/.module-cache','app/.sass-cache','app/.tmp'],
  destroot: 'app',
  destjs: 'app/js',
  destcss: 'app/css',
};

gulp.task('minify-html', function () {
  gulp.src(paths.html)
    .pipe(minifyHtml())
    .pipe(gulp.dest(paths.destroot));
});

gulp.task('sass', function() {
  return sass(paths.styles)
    .pipe(gulp.dest(paths.destcss))
    .pipe(reload({ stream:true }));
});

// watch files for changes and reload
gulp.task('serve',['watch'], function() {
  browserSync({
    server: {
      baseDir: paths.destroot
    }
  });
  gulp.watch(['*.html', 'css/**/*.css', 'js/**/*.js'], {cwd: 'app'}, reload);
});

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(paths.tmp).then(function (paths) {
    console.log('Deleted files/folders:\n', paths.join('\n'));
  });
});

gulp.task('scripts',['clean'], function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(react())
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.destjs));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.styles, ['sass']);
  gulp.watch(paths.html, ['minify-html']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'scripts', 'sass', 'minify-html']);


