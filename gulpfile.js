var gulp 	= require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-minify-css'),
    nunjucks = require('gulp-nunjucks-html'),
    data = require('gulp-data'),
    pathname = require('path'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;
  
var path = {
    build: { //куда складывать готовые после сборки файлы
        html: './',
        css: 'style/'
    },
    src: { //откуда брать исходники
    	html: 'src/pages/*.html',
        templates: 'src/templates',
        style: 'style/main.less'
    },
    watch: { //за изменением каких файлов мы хотим наблюдать
    	jhtml: 'src/pages/*.html',
        templates: 'src/templates',
        html: 'src/*.html',
        style: 'src/blocks/*.less'
    }
};

var config = {
    server: {
        baseDir: "./"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};

gulp.task('html', () => {
    return gulp.src(path.src.html)
        .pipe(nunjucks({
            searchPaths: [path.src.templates]
        }))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('style', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(prefixer())
        // .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('build', [
	'html',
    'style'
]);

gulp.task('watch', function(){
	watch([path.watch.jhtml, path.watch.html, path.watch.templates], function(event, cb) {
        gulp.start('html');
    });
    watch([path.watch.style, path.src.style], function(event, cb) {
        gulp.start('style');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('default', ['build', 'webserver', 'watch']);