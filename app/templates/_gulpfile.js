var gulp            = require('gulp');
var gutil           = require('gulp-util');
var rimraf          = require('gulp-rimraf');
var concat          = require('gulp-concat');
var sass            = require('gulp-sass');
var prefix          = require('gulp-autoprefixer');
var uglify          = require('gulp-uglify');
var webpack         = require('webpack');
var webpackConfig   = require('./webpack.config.js');
var webpackCompiler = webpack(webpackConfig);

gulp.task('clean', function() {
  gulp.src('./js/*.compiled.js', {read: false}).pipe(rimraf());
  gulp.src('./js/**/*.compiled.js', {read: false}).pipe(rimraf());
});

gulp.task('external-libs', function() {
  gulp.src('./bower_components/**/src/*.js')
      .pipe(concat('<%= _.slugify(appName)%>-external.js'))
      .pipe(gutil.env.type == 'production'? uglify() : gutil.noop())
      .pipe(gulp.dest('./build/js'));
});

gulp.task('scripts', ['webpack'], function() {
  gulp.src('./js/*.compiled.js')
      .pipe(concat('<%= _.slugify(appName)%>-combine.js'))
      .pipe(gutil.env.type == 'production'? uglify() : gutil.noop())
      .pipe(gulp.dest('./build/js'));
});

gulp.task('style', function() {
  gulp.src('./css/index.scss')
      .pipe(sass())
      .pipe(concat('<%= _.slugify(appName)%>-combine.css'))
      .pipe(prefix('last 1 version', '> 1%'))
      .pipe(gutil.env.type == 'production'? uglify() : gutil.noop())
      .pipe(gulp.dest('./build/css'));
});

gulp.task('webpack', function(callback) {
  webpackCompiler.run(function(err, stats){
    if (err) throw new gutil.PluginError('[webpack]', err);
    gutil.log('[webpack]', stats.toString({ colors: true }));
    callback();
  });
});

gulp.task('default', ['clean', 'external-libs', 'scripts', 'style']);

gulp.task('watch', function() {
  gulp.watch(['./js/**/*.js'], ['default']);
  gulp.watch(['./css/**/*.scss'], ['style']);
});


module.exports = gulp;
