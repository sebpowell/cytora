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
		locals: {
			images: 'assets/images'
		}
	}))
	.pipe(gulp.dest("./"));
});

/////////////////////////////////////////////////////
// SASS
/////////////////////////////////////////////////////

gulp.task('sass', function () {
	gulp.src(['assets/scss/styles.scss'])
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
	gulp.src(["assets/js/vendor/*.js", "assets/js/components/*.js"])
	.pipe(concat("application.js"))
	.pipe(gulp.dest("assets/js"));
});

/////////////////////////////////////////////////////
// Watch
/////////////////////////////////////////////////////

gulp.task("watch", function() {
	gulp.watch(['assets/scss/**/*.scss'], ['sass']);
	gulp.watch(['assets/js/**/*.js'], ['uglify']);
	gulp.watch(['views/**/*.jade'], ['jade']);
});

gulp.task("default", ["watch"], function() {

});
