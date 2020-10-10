const gulp = require("gulp");
const sass = require("gulp-sass");

gulp.task("scssAll", function() {
    return gulp.src("./*.{scss,sass}")
        .pipe(sass())
        .pipe(gulp.dest("dist/css"))
})

gulp.task("watch", function() {
    gulp.watch("./*.{scss,sass}", ['scssAll']);
})