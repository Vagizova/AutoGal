var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-minify-css'),
    nunjucks = require('gulp-nunjucks-html'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    concat = require('gulp-concat');

var config = require('./gulp_config.json');

var path = {
    build: { //куда складывать готовые после сборки файлы
        html: config.server.baseDir + '/',
        js: config.server.baseDir + '/js/',
        libs: config.server.baseDir + '/libs/',
        styles: config.server.baseDir + '/styles/',
        images: config.server.baseDir + '/images/',
        fonts: config.server.baseDir + '/fonts/',
        scripts: config.server.baseDir + '/scripts/'
    },
    src: { //откуда брать исходники
        html: 'src/pages/*.html',
        templates: 'src/templates',
        js: 'src/js/**/*.js',
        libs: 'src/libs/**/*.*',
        styles: 'src/style/main.less',
        images: 'src/images/*.*',
        fonts: 'src/fonts/*.*',
        scripts: ['src/scripts/**/*.php', '!src/scripts/config.php']
    },
    watch: { //за изменением каких файлов мы хотим наблюдать
        jhtml: 'src/pages/*.html',
        templates: 'src/templates',
        html: 'src/*.html',
        js: 'src/js/*.js',
        libs: 'src/libs',
        styles: 'src/blocks/*.less',
        images: 'src/images/*.*',
        fonts: 'src/fonts/*.*'
    }
};

gulp.task('html', function() {
    return gulp.src(path.src.html)
        .pipe(nunjucks({
            searchPaths: [path.src.templates]
        }))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js', function() {
    if(config.env == 'production'){
        return gulp.src(path.src.js)
            .pipe(concat('main.js'))
            .pipe(uglify())
            .pipe(gulp.dest(path.build.js))
            .pipe(reload({stream: true}));
    }else{
        return gulp.src(path.src.js)
            .pipe(concat('main.js'))
            .pipe(gulp.dest(path.build.js))
            .pipe(reload({stream: true}));
    }
});

gulp.task('libs', function() {
    return gulp.src(path.src.libs)
        .pipe(gulp.dest(path.build.libs))
        .pipe(reload({stream: true}));
});

gulp.task('styles', function () {
    var src = gulp.src(path.src.styles)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(prefixer())
        .pipe(sourcemaps.write());

    if(config.env == 'production'){
        src.pipe(cssmin());
    }

    src.pipe(gulp.dest(path.build.styles))
        .pipe(reload({stream: true}));

    return src;
});

gulp.task('images', function () {
    return gulp.src(path.src.images)
        .pipe(gulp.dest(path.build.images))
        .pipe(reload({stream: true}));
});

gulp.task('fonts', function () {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(reload({stream: true}));
});

gulp.task('server_scripts', function () {
    return gulp.src(path.src.scripts)
        .pipe(gulp.dest(path.build.scripts))
        .pipe(reload({stream: true}));
});

gulp.task('build', [
    'html',
    'js',
    'libs',
    'styles',
    'images',
    'fonts',
    'server_scripts'
]);

gulp.task('watch', function(){
    watch([path.watch.jhtml, path.watch.html, path.watch.templates], function(event, cb) {
        gulp.start('html');
    });
    watch([path.watch.styles, path.src.styles], function(event, cb) {
        gulp.start('styles');
    });
    watch([path.watch.js, path.src.js], function(event, cb) {
        gulp.start('js');
    });
    watch([path.watch.libs, path.src.libs], function(event, cb) {
        gulp.start('libs');
    });
    watch([path.watch.images, path.src.images], function(event, cb) {
        gulp.start('images');
    });
    watch([path.watch.fonts, path.src.fonts], function(event, cb) {
        gulp.start('fonts');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('default', ['build', 'webserver', 'watch']);