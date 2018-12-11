var gulp = require('gulp'),
    sass = require('gulp-sass'),
    twig = require('gulp-twig');
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps');

// Compile Twig templates to HTML
gulp.task('templates', function() {
  return gulp.src('templates/pages/*.twig')
    .pipe(twig())
    .pipe(gulp.dest('dist')); // output the rendered HTML files to the "dist" directory
});


gulp.task('sass', function(){
  return gulp.src('assets/scss/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())
    .pipe(sass({errLogToConsole: true}))
    .on('error', catchErr)
    .pipe(autoprefixer({browsers: ['last 4 versions']}))
    .pipe(cleanCSS()).pipe(concat('style.css'))
    .pipe(sourcemaps.write('/map'))
    .pipe(gulp.dest('assets/css'))
});

gulp.task('serve', function() {
  gulp.watch('assets/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['serve'], function() {
  gulp.start('sass');
});

function catchErr(e) {
  console.log(e);
  this.emit('end');
}