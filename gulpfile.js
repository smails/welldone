'use strict';
const gulp = require("gulp"),
	prefixer = require("gulp-autoprefixer"),
	sass = require("gulp-sass"),
	watch = require("gulp-watch"),
	notify = require("gulp-notify"),
	sourcemap = require("gulp-sourcemaps"),
	rename = require("gulp-rename"),
	plumber = require("gulp-plumber"),
	pug = require("gulp-pug"),
	jsmin = require("gulp-jsmin"),
	concat = require('gulp-concat'),
	babel = require('gulp-babel'),
	uncss = require("gulp-uncss"),
	fileindex = require('gulp-fileindex'),
	image = require('gulp-image'),
	csscomb = require('gulp-csscomb'),
	browserSync = require("browser-sync");
gulp.task('server', function () {
	var files = [
		'*.html',
		'css/*.css',
		'js/*.js'
	];
	browserSync.init(files, {
		server: "./build",
		host: 'localhost',
		port: 8500,
		logPrefix: "Project"
	});
});
gulp.task('sass', function () {
	gulp.src("src/static/style/global.sass")
		.pipe(plumber({
			errorHandler: function (err) {
				notify.onError({
					title: "Ошибка в SASS",
					message: "<%= error.message %>"
				})(err);
			}
		}))
		.pipe(sass())
		.pipe(csscomb())
		.pipe(prefixer("last 10 versions"))
		.pipe(rename("style.css"))
		.pipe(gulp.dest("build/css"))
		.pipe(browserSync.reload({
			stream: true
		}));
});
gulp.task('index', function () {
	gulp.src('src/pages/*.pug')
		.pipe(plumber({
			errorHandler: function (err) {
				notify.onError({
					title: "Ошибка в pug",
					message: "<%= error.message %>"
				})(err);
			}
		}))
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('build/'))
		.pipe(browserSync.reload({
			stream: true
		}));
});
gulp.task('js', function () {
	gulp.src(['src/static/js/_polyfill.js', 'src/static/js/_core.js', 'src/modules/**/**/*.js'])
		.pipe(plumber({
			errorHandler: function (err) {
				notify.onError({
					title: "Ошибка в JS",
					message: "<%= error.message %>"
				})(err);
			}
		}))
		.pipe(babel({
            presets: ['@babel/env']
		}))
		.pipe(concat('common.js'))
		.pipe(gulp.dest('build/js'))
		.pipe(browserSync.reload({
			stream: true
		}));
});
gulp.task('image', () => {
	gulp.src('src/static/images/*.*')
		.pipe(image({
			pngquant: true,
			optipng: false,
			zopflipng: true,
			jpegRecompress: true,
			mozjpeg: false,
			guetzli: false,
			gifsicle: true,
			svgo: true,
			concurrent: 10,
			quiet: true
		}))
    .pipe(gulp.dest('build/images/'));
});
gulp.task('uncss', function () {
	return gulp.src('build/css/style.css')
		.pipe(uncss({
			html: ['build/*.html'],
		}))
		.pipe(gulp.dest('build/css'));
});
gulp.task('fileindex', function() {
	return gulp
    .src("build/*.html")
    .pipe(fileindex({ showExtension: false }))
    .pipe(gulp.dest("build/"));
});

gulp.task('watch', function () {
	watch(["src/**/**/*.pug"], {usePolling: true}, function (event, cb) {
		gulp.start('index');
	});
	watch(["src/**/**/**/*.sass"], function (event, cb) {
		gulp.start('sass');
	});
	watch(["src/**/**/*.js"], function (event, cb) {
		gulp.start('js');
	});
	watch(["src/static/images/*.*"], function (event, cb) {
		gulp.start("image");
	});
});
gulp.task("default", ["server", "watch"]);
gulp.task("build", ["index", "sass", "js", "image"]);