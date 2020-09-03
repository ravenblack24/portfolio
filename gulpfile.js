const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// compile scss into css
const style = () => {
    // Location of scss files
    return gulp.src('./scss/**/*.scss')
    // Pass file through sass compiler
        .pipe(sass().on('error', sass.logError))
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
