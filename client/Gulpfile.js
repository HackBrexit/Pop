var gulp = require('gulp');
var tinylr;
var jshint = require('gulp-jshint');
var minifyCSS = require('gulp-minify-css');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-ruby-sass');
var express = require('express');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('js', function(){
  return gulp.src('./js/**/*.js')
  .pipe(uglify())
  .pipe(concat('popapp.min.js'))
  .pipe(gulp.dest('dist/'))
  .pipe(browserSync.stream());
});

// gulp.task('browserify', function() {
//     return browserify('app.js')
//         .bundle()
//         .pipe(source('bundle.js'))
//         .pipe(buffer())
//         .pipe(uglify())
//         .pipe(concat('bundle.min.js'))
//         .pipe(gulp.dest('./'));
// });

gulp.task('serve', ['styles'], function(){

  browserSync.init({
    server: './'
  });

  gulp.watch('./sass/**/*.scss',['styles']);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
    //gulp.watch('public/css/*.css', notifyLiveReload);
  gulp.watch('./js/**/*.js', ['js']);
    // gulp.watch('app.js', ['browserify']);
    // gulp.watch('bundle.min.js', notifyLiveReload);
});

gulp.task('styles', function() {
  return sass('./sass/**/*.scss')
    .on('error', sass.logError)
    .pipe(minifyCSS())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
});


gulp.task('default', ['serve']);
