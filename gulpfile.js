const gulp = require("gulp")
const sass = require("gulp-sass")
const rename = require("gulp-rename")
const browserify = require("gulp-browserify")
const config = require("./config")

gulp.task("sass", function () {

	gulp.src(config.paths.scss.in)
		.pipe(sass({outputStyle: "compressed"}))
		.pipe(rename(function (path) {
			path.basename += ".min"
		}))
		.pipe(gulp.dest(config.paths.scss.out))

})

gulp.task("browserify", function () {

	gulp.src(config.paths.js.entryFile)
		.pipe(browserify({
			"transform": ["babelify"]
		}))
		.pipe(rename(function (path) {
			path.basename = path.basename.slice(0, path.basename.lastIndexOf(".babel")) + ".min"
		}))
		.pipe(gulp.dest(config.paths.js.out))

})

gulp.task("watch", function () {
	gulp.watch(config.paths.scss.in, ["sass"])
	gulp.watch(config.paths.js.in, ["browserify"])
})

gulp.task("default", ["watch"])
