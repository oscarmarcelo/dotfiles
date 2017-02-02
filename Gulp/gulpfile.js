/*------------------------------------------------------------ 
	Required plugins
------------------------------------------------------------*/
var gulp         = require('gulp'),
	sass         = require('gulp-sass'),
	postcss      = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	//concat       = require('gulp-concat'),
	uglify       = require('gulp-uglify'),
	imagemin     = require('gulp-imagemin'),
	browserSync  = require('browser-sync').create(),
	size         = require('gulp-size'),
	changed      = require('gulp-changed'),
	notify       = require('gulp-notify');

/*------------------------------------------------------------ 
	Path variables
------------------------------------------------------------*/
var path = {
		url: 'om.dev/photo',
		src: {
			sass: 'src/sass/**/*.{sass,scss}',
			js:   'src/js/**/*.js',
			img:  'src/img/*'
		},
		dist: {
			css: 'assets/css',
			js:  'assets/js',
			img: 'assets/img'
		}
	}

/*------------------------------------------------------------ 
	Convert Sass to CSS
		Autoprefix
		Notify status
------------------------------------------------------------*/
gulp.task('styles', function () {
	return gulp
		.src(path.src.sass)
		//.pipe(changed(path.dist.css, {extension: '.css'}))
		.pipe(sass({
				includePaths: ['../../Maro']
		}))
		.on('error', notify.onError({
			title:   'Error on Sass',
			message: '<%= error.message %>'
		}))
		.pipe(postcss([
			autoprefixer({
				browsers: [
					'last 2 versions',
					'> 1%',
					'Firefox ESR',
					'Opera 12.1'
				]
			})
		]))
		.pipe(gulp.dest(path.dist.css))
		.pipe(notify({
			title:   'Sass compiled!',
			message: '<%= file.relative %>'
		}));
});

/*------------------------------------------------------------ 
	Compresses and concatenate JavaScript files
		Notify compression rate
------------------------------------------------------------*/
gulp.task('scripts', function () {
	var originalSize  = size(),
	    optimizedSize = size();

	return gulp
		.src(path.src.js)
		.pipe(originalSize)
		.pipe(changed(path.dist.js))
		//.pipe(concat('scripts.js'))
		.pipe(uglify())
		.pipe(gulp.dest(path.dist.js))
		.pipe(optimizedSize)
		.pipe(notify({
			title:   'Scripts optimized!',
			message: function () {
				savedSize    = originalSize.size - optimizedSize.size;
				savedPercent = (savedSize / originalSize.size) * 100;
				return 'Saved ' + (savedSize / 1024).toFixed(2) + 'kb - ' + savedPercent.toFixed(2) + '%';
			},
			onLast: true
		}));
});

/*------------------------------------------------------------ 
	Optimize images
		Notify compression rate
------------------------------------------------------------*/
gulp.task('images', function () {
	var originalSize  = size(),
	    optimizedSize = size();

	return gulp
		.src(path.src.img)
		.pipe(originalSize)
		.pipe(changed(path.dist.img))
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{
				removeViewBox: false
			}],
		}))
		.pipe(gulp.dest(path.dist.img))
		.pipe(optimizedSize)
		.pipe(notify({
			title:   'Images optimized!',
			message: function () {
				savedSize    = originalSize.size - optimizedSize.size;
				savedPercent = (savedSize / originalSize.size) * 100;
				return 'Saved ' + (savedSize / 1024).toFixed(2) + 'kb - ' + savedPercent.toFixed(2) + '%';
			},
			onLast: true
		}));
});

/*------------------------------------------------------------ 
	Watch for file changes to run tasks
------------------------------------------------------------*/
gulp.task('watch', function () {
	browserSync.init([path.dist.css, path.dist.js, path.dist.img],{
		proxy: path.url,
		notify: {
			styles: [
				'background: #000',
				'color: #fff',
				'padding: 10px',
				'opacity: 0.5',
				'position: fixed',
				'right: 0',
				'bottom: 0'
			]
		}
	});
	gulp.watch(path.src.sass, ['styles']);
	gulp.watch(path.src.js, ['scripts']);
	gulp.watch(path.src.img, ['images']);
	gulp.watch(["*.html", "*.php"]).on('change', browserSync.reload);
});

/*------------------------------------------------------------ 
	Sets default dask
------------------------------------------------------------*/
gulp.task('default', ['watch', 'styles', 'scripts', 'images']);