##Gulp入门指南


gulp官方网址：[http://www.gulpjs.com.cn/](http://www.gulpjs.com.cn/)


###初始化`package.js`文件
到项目目录下面，`npm init`根据提示输入配置信息或者去别的项目拷贝一个

###全局安装gulp
`npm install gulp -g`

###进入项目，安装gulp
`npm install gulp --save-dev`


###前端常用gulp插件
1. 编译sass ( gulp-sass )
2. 自动添加css ( gulp-autoprefixer )
3. 压缩css ( gulp-minify-css )
4. js代码校验 ( gulp-jshint )
5. 合并js文件 ( gulp-concat )
6. 压缩js代码 ( gulp-uglify )
7. 压缩图片 ( gulp-imagemin )
8. 自动刷新页面 ( gulp-livereload )
9. 图片缓存，只有图片替换了才压缩 ( gulp-cache )
10. 更改提醒 ( gulp-notify )
11. 文件重命名 ( gulp-rename )
12. 给文件加上版本号 ( gulp-rev )
13. 清理项目文件 ( gulp-clean )
14. 删除文件 ( del )

###安装gulp-plugins
`npm install gulp-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del gulp-clean --save-dev`


###项目文件组织
	|--/assets---------压缩之后的目标文件夹   
		|--/js---------js文件存放目录   
		|--/css--------样式文件存放目录   
		|--/images-----图片存放目录 
	|--/src   
		|--/js   
		|--/css
		|--/images   
	|--gulpfile.js

###加载插件
	var gulp = require('gulp'),
	    sass = require('gulp-sass'),
	    autoprefixer = require('gulp-autoprefixer'),
	    minifycss = require('gulp-minify-css'),
	    jshint = require('gulp-jshint'),
	    uglify = require('gulp-uglify'),
	    imagemin = require('gulp-imagemin'),
	    rename = require('gulp-rename'),
	    concat = require('gulp-concat'),
	    notify = require('gulp-notify'),
	    cache = require('gulp-cache'),
	    livereload = require('gulp-livereload'),
	    clean = require('gulp-clean'),
	    rev = require('gulp-rev'),
	    del = require('del');


##主要代码
###指定压缩编译文件路径与顺序


通过指定需要加载的文件顺序，可以防止依赖顺序出错导致的问题


	/**
	 * 指定合并文件路径和顺序
	 * @type {Object}
	 */
	var paths = {
	    frontend: {
	        scripts: [
	            'src/js/util.js',
	            'src/js/global.js',
	            'src/js/main.js'
	        ],
	        styles: [
	            'src/css/base.css',
	            'src/css/main.css'
	        ]
	    }
	};



###编译scss，合并、压缩css文件

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
        .pipe(gulp.dest('assets/css'))
        .pipe(notify({
            message: 'Styles task complete'
        }));
    // 清空原有数据
    del(['assets/css/*.css'], function(err) {
        if (err) {
            console.log('清空样式出错！');
            return false;
        }

    });
    gulp.src(paths.frontend.styles)
        .pipe(concat('main.css'))
        // 打版本补丁
        // .pipe(rev())
        .pipe(minifycss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('assets/css/'));
	});



###校验，合并，压缩js文件
	// Scripts
	gulp.task('scripts', function() {
	    del(['assets/js/*.js'],function(err){
	        if(err){
	            console.log(err);
	        }
	    });
	    gulp.src(paths.frontend.scripts)
	        .pipe(jshint())
	        .pipe(jshint.reporter('default'))
	        .pipe(concat('main.js'))
	        .pipe(rename({
	            suffix: '.min'
	        }))
	        .pipe(uglify())
	        .pipe(gulp.dest('assets/js'))
	        .pipe(notify({
	            message: 'Scripts task complete'
	        }));
	});


###图片压缩
	// Images
	gulp.task('images', function() {
	    return gulp.src('src/images/*')
	        .pipe(cache(imagemin({
	            optimizationLevel: 3,
	            progressive: true,
	            interlaced: true
	        })))
	        .pipe(gulp.dest('assets/images'))
	        .pipe(notify({
	            message: 'Images task complete'
	        }));
	});


###任务监听
	// Default task
	gulp.task('default',['clean'], function() {
	    gulp.start('styles', 'scripts', 'images');
	});
	// Watch
	gulp.task('watch', function() {
	    // Watch .scss files
	    gulp.watch(['src/css/*.scss', 'src/css/*.css'], ['styles']);
	    // Watch .js files
	    gulp.watch('src/js/*.js', ['scripts']);
	    // Watch image files
	    gulp.watch('src/images/*', ['images']);
	    // Create LiveReload server
	    livereload.listen();
	    // Watch any files in assets/, reload on change
	    gulp.watch(['assets/*']).on('change', livereload.changed);
	});


##运行gulp任务


gulp任务可以单独运行，也可以批量运行


###运行单个任务

	gulp style
	gulp default
	gulp watch

###批量运行

	gulp