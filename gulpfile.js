var gulp = require('gulp'),
    useref = require('gulp-useref'),
    livereload = require('gulp-livereload');

gulp.task('default', function() {
    return gulp.src('*.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
})

/*gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(['*.html', 'assets/js/*.js', 'assets/css/*.css']);
    livereload();
})*/