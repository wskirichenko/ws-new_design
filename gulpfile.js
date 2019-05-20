const gulp        = require('gulp');
const sass        = require('gulp-sass');
const concat      = require('gulp-concat');
const concatCss   = require('gulp-concat-css');
const browserSync = require('browser-sync');
const del         = require('del');
const minify      = require('gulp-minify');
const cssmin      = require('gulp-cssmin');
const rename      = require('gulp-rename');
const imagemin    = require('gulp-imagemin');

const scssFiles = 'src/scss/**/*.scss';
const htmlFiles = 'src/pages/*.html';

const jsFiles = [
	'src/bower_components/jquery/dist/jquery.min.js',
	'src/bower_components/jq-router/dist/jq-router.min.js',
	'src/js/**/*.js'
];

const libsCssFiles = [];

gulp.task('sass', () => {
	return gulp.src(scssFiles)
	.pipe(sass())
	.pipe(cssmin())
	.pipe(rename({ suffix: '.min' }))
	.pipe(gulp.dest('dist/css'))
	.pipe(browserSync.reload({
		stream: true
	}))
});

gulp.task('scripts', () => {
	return gulp.src(jsFiles)
		.pipe(concat('bundle.js'))
		.pipe(minify())
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('css', () => {
	return gulp.src(libsCssFiles)
		.pipe(concatCss('libs.css'))
		.pipe(cssmin())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('dist/css'));
});

// Копирование файлов HTML в папку dist
gulp.task("html", function() {
	return gulp.src(htmlFiles)
	.pipe(gulp.dest("dist/html"));
});

/*function wrapPipe(taskFn) {
  return function(done) {
    var onSuccess = function() {
      done();
    };
    var onError = function(err) {
      done(err);
    }
    var outStream = taskFn(onSuccess, onError);
    if(outStream && typeof outStream.on === 'function') {
      outStream.on('end', onSuccess);
    }
  }
} */

// gulp.task('fonts', () => {
// 	return gulp.src('src/fonts/**/*')
// 	.pipe(gulp.dest('dist/fonts'))
// })

gulp.task('browserSync', () => {
	browserSync.init({
		server: {
				baseDir: ['./', './src', './pages']
		}
	});
});

gulp.task('images', () => {
  return gulp.src('src/img/**/*.+(png|jpg|gif|svg)')
//   .pipe(cache(imagemin()))
  .pipe(gulp.dest('dist/img'))
});

gulp.task('clean', () => {
	del(['dist/**/*', '!dist/images', '!dist/images/**/*']);
})

gulp.task('watch', ['browserSync'], () => {
	gulp.watch(scssFiles, ['sass']);
	gulp.watch(htmlFiles, ['html']);
	gulp.watch(jsFiles, ['scripts']);
	// gulp.watch('./pages/bx.html', browserSync.reload);
	gulp.watch('index.html', browserSync.reload);
})

gulp.task('build', ['clean'], () => {
	gulp.start('sass', 'html', 'scripts', 'css', 'images');
})

