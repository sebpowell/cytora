/////////////////////////////////////////////////////
// Gulp Dependencies
/////////////////////////////////////////////////////

var gulp = require("gulp"),
	autoprefixer = require("gulp-autoprefixer"),
	concat = require("gulp-concat"),
	data = require('gulp-data'),
	jade = require('gulp-jade'),
	sass = require("gulp-sass"),
	fs = require('fs');
	uglify = require("gulp-uglify");
	cleanCSS = require('gulp-clean-css');

/////////////////////////////////////////////////////
// HTML
/////////////////////////////////////////////////////

gulp.task("jade", function() {
	gulp.src('views/**/!(_)*.jade')
	.pipe(jade({
		pretty: true,
	}))
	.pipe(gulp.dest("./"));
});

/////////////////////////////////////////////////////
// SASS
/////////////////////////////////////////////////////

gulp.task('sass', function () {
	gulp.src(['scss/styles.scss'])
		.pipe(sass({
			outputStyle: "compact",
		}).on('error', sass.logError))
		.pipe(autoprefixer({browsers: ['last 2 versions'], remove: false}))
		.pipe(gulp.dest(function(file) {
			return file.base;
		}));
	});

/////////////////////////////////////////////////////
// JavaScript
/////////////////////////////////////////////////////

gulp.task("uglify", function() {
	gulp.src(["documentation/inc/javascript/vendor/*.js", "documentation/inc/javascript/components/*.js"])
	.pipe(concat("application.js"))
	.pipe(gulp.dest("documentation/inc/javascript/"));
});

/////////////////////////////////////////////////////
// Watch
/////////////////////////////////////////////////////

gulp.task("watch", function() {
	gulp.watch(['scss/**/*.scss'], ['sass']);
	gulp.watch(['documentation/inc/javascript/**/*.js'], ['uglify']);
	gulp.watch(['views/**/*.jade'], ['jade']);
});

gulp.task("default", ["watch"], function() {

});
