var gulp = require("gulp")
var babel = require("gulp-babel")
var uglify = require("gulp-uglify")
var minify = require("gulp-minify-css")
var imagemin = require("gulp-imagemin")
var htmlmin = require("gulp-htmlmin")

/**
 * 转码与压缩
 */
gulp.task("conversion", function (callback) {
  gulp.src("js/base/**/*.js")
    .pipe(babel({
      presets: ["es2015"]
    }))
    .pipe(gulp.dest("src/js/base/"))
    .pipe(uglify())
    .pipe(gulp.dest("src/js/base/"))
})
gulp.task("conversionPage", function () {
  gulp.src("js/page/**/*.js")
    .pipe(babel({
      presets: ["es2015"]
    }))
    .pipe(gulp.dest("src/js/page/"))
    .pipe(uglify())
    .pipe(gulp.dest("src/js/page/"))
})
/**
 * 压缩css
 */
gulp.task("compressionJsPlug", function () {
  gulp.src("js/plug/**/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("src/js/plug/"))
})
/**
 * 压缩图片
 */
gulp.task("compressionImg", function () {
  gulp.src("img/*")
    .pipe(imagemin())
    .pipe(gulp.dest("src/img"))
})

/**
 * 压缩html
 */
gulp.task("compressionHtml", function () {
  gulp.src("page/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("src/page/"))
  gulp.src("index.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("src/"))
})

/**
 * 复制文件夹
 */
gulp.task("copyTask", function () {
  gulp.src("fonts/**/*")
    .pipe(gulp.dest("src/fonts/"))
})

/**
 * 压缩css
 */
gulp.task("compressionCss", function () {
  gulp.src("css/**/*.css")
    .pipe(minify())
    .pipe(gulp.dest("src/css/"))
})

gulp.task("start", ["conversion", "conversionPage",
  "compressionJsPlug",
  "compressionImg",
  "compressionHtml",
  "copyTask",
  "compressionCss"])
