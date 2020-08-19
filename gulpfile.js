var gulp = require('gulp');
var sass = require('gulp-sass');
//и что-то выведем в консоль для подтверждения
gulp.task('default', function() {
    console.log("something");
});



gulp.task('sass', function() {
    gulp.src('./mini/**/*.scss')
});

gulp.task('sass', function() {
    gulp.src('./mini/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('/mini.css'));
});