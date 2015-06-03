/*!
 * gulp
 * $ npm install gulp-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache --save-dev
 */
// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    clean = require('gulp-clean'),
    rev = require('gulp-rev'),
    del = require('del'),
    revCollector = require('gulp-rev-collector'),
    minifyHTML = require('gulp-minify-html');

/**
 * 指定合并文件路径和顺序
 * @type {Object}
 */
var paths = {
    frontend: {
        scripts: [
            'src/js/jquery-1.11.2.js',
            'src/js/util.js',
            'src/js/global.js',
            'src/js/main.js',
            'src/js/tab-1.0.0.js'
        ],
        styles: [
            'src/css/base.css',
            'src/css/main.css'
        ]
    }
};
// Styles
gulp.task('styles', function() {
    // 编译scss
    gulp.src('src/css/*.scss')
        .pipe(sass({
            style: 'expanded'
        }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('assets/css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('assets/css'));

    gulp.src(paths.frontend.styles)
        .pipe(concat('main.css'))
        .pipe(gulp.dest('assets/css/'))
        // 打版本补丁
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(rev())
        .pipe(gulp.dest('assets/css/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'))
        .pipe(livereload())
        .pipe(notify("styles task completed!"));
});
// Scripts
gulp.task('scripts', function() {
    gulp.src(paths.frontend.scripts)
        .pipe(concat('main.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('assets/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'))
        .pipe(livereload())
        .pipe(notify({
            message: 'Scripts task complete'
        }));
});
// Images
gulp.task('images', function() {
    return gulp.src('src/images/*')
        // .pipe(cache(imagemin({
        //     optimizationLevel: 3,
        //     progressive: true,
        //     interlaced: true
        // })))
        .pipe(gulp.dest('assets/images'))
        .pipe(livereload())
        .pipe(notify({
            message: 'Images task complete'
        }));
});

gulp.task('html',function(){
    return gulp.src(['rev/**/*.json','index.html'])
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements:{
                '/src/css': '/rev/css',
                '/src/js':'/rev/js'
            }
        }))
        .pipe(livereload())
        .pipe(gulp.dest('assets/'));
});

gulp.task('clean', function() {
  return gulp.src(['assets/**/*', 'rev/**/*'], {read: false})
    .pipe(clean());
});

// Default task
gulp.task('build',['clean'], function() {
    gulp.start('styles', 'scripts', 'images','html');
});
// Watch
gulp.task('watch', function() {
    // Watch .scss files
    gulp.watch(['src/css/*.scss', 'src/css/*.css'], ['styles']);
    // Watch .js files
    gulp.watch('src/js/*.js', ['scripts']);
    // Watch image files
    // gulp.watch('src/images/*', ['images']);
    // Create LiveReload server
    livereload.listen();
    // Watch any files in assets/, reload on change
    gulp.watch(['assets/*']).on('change', livereload.changed);
});