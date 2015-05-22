var gulp = require('gulp') ,
sass = require('gulp-sass') ,
scsslint = require('gulp-scss-lint') ,
jshint = require('gulp-jshint') ,
autoprefixer = require('gulp-autoprefixer') ,
browserSync = require('browser-sync') ,
plumber = require('gulp-plumber') ,
image = require('imagemin-svgo') ,
reload = browserSync.reload;

var AUTOPREFIXER_BROWSERS = [
'ie >= 10',
'ie_mob >= 10',
'ff >= 30',
'chrome >= 34',
'safari >= 7',
'opera >= 23',
'ios >= 7',
'android >= 4.4',
'bb >= 10'
];

var SOURCE = {
	scss: 'scss/**/*.scss',
	css: 'public/css',
	dust: 'views/*.dust',
	js: ['/*.js', 'routes/**/*.js', 'public/js/*.js'],
	images: 'all-icons/*'
};

gulp.task('browser-sync', function(){
	browserSync({
		proxy: 'localhost:3333'
	});
});

gulp.task('bs-reload', function(){
	browserSync.reload();
});

gulp.task('jshint', function(){
	gulp.src(SOURCE.js)
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('scss-lint', function(){
	gulp.src('/' + SOURCE.js)
	.pipe(scsslint());
});

gulp.task('sass', ['scss-lint'], function () {
	gulp.src(SOURCE.scss)
	.pipe(plumber())
	.pipe(sass())
	.pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
	.pipe(gulp.dest(SOURCE.css))
	.pipe(reload({stream:true}));
});

gulp.task('default', ['sass', 'browser-sync'], function(){
	gulp.watch(SOURCE.scss, ['sass']);
	gulp.watch([SOURCE.dust, SOURCE.js], ['bs-reload']);
});

gulp.task('optimizer', function(){
	gulp.src(SOURCE.images)
	.pipe(image()())
	.pipe(gulp.dest('public/images/icon-library/svg'));
});

