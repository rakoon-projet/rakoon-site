const { src, dest, series } = require('gulp'),
      useref = require('gulp-useref'),
      gulpif = require('gulp-if'),
      uglify = require('gulp-uglify'),
      minifyCss = require('gulp-clean-css'),
      livereload = require('gulp-livereload');

function minify() {
    return src('*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(dest('dist'));
}

function videos() {
    return src('assets/video/*').pipe(dest('dist/assets/video'));
}

function images() {
    return src('assets/img/*').pipe(dest('dist/assets/img'));
}

/*gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(['*.html', 'assets/js/*.js', 'assets/css/*.css']);
    livereload();
})*/

exports.default = series(minify, videos, images);