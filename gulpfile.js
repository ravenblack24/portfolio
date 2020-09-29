const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');

// compile scss into css
const style = () => {
    // Location of scss files
    return gulp.src('./scss/**/*.scss')
        // Pass file through sass compiler
        .pipe(sass().on('error', sass.logError))
        // Generate source maps for Sass to CSS compilation
        .pipe(sourcemaps.init())
        //minify file
        .pipe(cleanCSS())
        // Generate source maps for Sass to CSS compilation
        .pipe(sourcemaps.write('./', {includeContent: false, sourceRoot: './scss'}))
        // Where to save compiled css file
        .pipe(gulp.dest('./css'))
        // Stream changes to all browsers
        .pipe(browserSync.stream())
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('./scss/**/*.scss', style);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;
