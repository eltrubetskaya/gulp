var gulp = require("gulp"),
    babelify = require('babelify'),
    browserify = require("browserify"),
    connect = require("gulp-connect"),
    source = require("vinyl-source-stream"),
    sourcemaps = require('gulp-sourcemaps'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer');


gulp.task("default", ["copyStaticFiles", "script", "startServer"]);

gulp.task("copyStaticFiles", function () {
    return gulp.src("./app/index.html")
        .pipe(gulp.dest("./dist"))
});

gulp.task('style', function () {
    gulp.src('app/styles/index.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css/'))
});

gulp.task("script", function () {
    return browserify({
        entries: ["./app/js/index.js"]
    })
        .transform(babelify.configure({
            presets: ["es2015"]
        }))
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("./dist"));
});

gulp.task("startServer", function () {
    connect.server({
        root: "./dist",
        livereload: true,
        port: 9001
    });
});

gulp.task('watch', function () {
    gulp.start('startServer');
    gulp.watch(['app/js/*.js'], ['script']);
    gulp.watch('app/index.html', ['copyStaticFiles']);
    gulp.watch('app/styles/*.less', ['style']);
});
