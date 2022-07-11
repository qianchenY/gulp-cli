const {task, src, dest, parallel, watch, series} = require('gulp'), // gulp
    fs = require('fs'), // 文件操作
    opn = require('opn'), // 打开浏览器
    plugins = require('gulp-load-plugins')(), //自动加载gulp插件
    //cleanCSS = require('gulp-clean-css'), // css压缩
    //tinypng = require('gulp-tinypng-nokey'), //压缩图片
    gulpif = plugins['if'], // 逻辑判断
    changed = plugins['changed'], // 过滤未变动的文件
    sass = plugins['sass'](require('sass')), // 编译sass
    autoprefixer = plugins['autoprefixer'], // css自动补全前缀
    uglify = plugins['uglify'], // js压缩
    connect = plugins['connect'], // 自动刷新页面
    notify = plugins['notify'], // 打印消息
    plumber = plugins['plumber'], // 错误处理
    ejs = plugins["ejs"], // ejs模板
    gutil = plugins['util'], // 工具
    wait = plugins['wait'], // 延时
    //babel = plugins['babel'], // es5转es6
    sourcemaps = plugins['sourcemaps'], // 生成.map文件
    concat = plugins['concat'], // 合并文件
    clean = plugins['clean'], // 清除文件
    imagemin = require('gulp-imagemin'), //压缩图片
    pngquant = require('imagemin-pngquant'), //压缩PNG
    cwebp = require('gulp-cwebp'); //cwebp


// src
const SRC = 'src',
    SRC_HTML = 'src/*.html',
    SRC_IN_HTML = 'src/include/*.html',
    SRC_JS = 'src/js/**',
    //SRC_ES = 'src/js/*.js',
    SRC_CSS = 'src/css/*.*',
    SRC_SCSS = 'src/css/*.scss',
    SRC_IN_CSS = 'src/css/include/*.scss',
    SRC_IMG = 'src/images/*.{png,jpg,gif,svg,mp4}',
    SRC_FONTS = 'src/fonts/**';

// dest
const DEST = 'dist',
    DEST_JS = 'dist/js',
    DEST_CSS = 'dist/css',
    DEST_IMG = 'dist/images',
    DEST_FONTS = 'dist/fonts',
    DEST_ES = 'dist/js/*.js';

// server
const PORT = 8081,
    APP = __dirname.slice(__dirname.lastIndexOf('\\') + 1);

// 服务配置
task('server_connect', (done)=> {
    connect.server({
        root: '../',
        port: PORT,
        livereload: true
    });

    done();
});

// 公用方法
// 编译 html
function com_build_html(n) {
    // 错误处理
    var onError = function (err) {
        notify.onError({
            title: "Gulp Error !",
            subtitle: "Failure!",
            message: "Error: <%= error.message %>",
            sound: "Beep"
        })(err);

        // 重要！！
        this.emit('end');
    };

    src(SRC_HTML)
        .pipe(gulpif(n, changed(DEST)))
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(ejs())
        .pipe(dest(DEST))
        .pipe(connect.reload());
}

// 编译 scss
function com_build_css(n) {
    src(SRC_SCSS)
        .pipe(sourcemaps.init())
        .pipe(gulpif(n, changed(DEST_CSS, { // dest 参数需要和 dest 中的参数保持一致
            extension: '.css' // 如果源文件和生成文件的后缀不同，这一行不能忘
        }), wait(200)))
        // sass()方法中先进行错误处理，然后交给autoprefixer()，否则会终止进程
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', notify.onError("Error: <%= error.message %>")))
        .pipe(autoprefixer('> 1%','last 5 versions'))
        // .pipe(cleanCSS())
        .pipe(sourcemaps.write('.', {
            addComment: false
        }))
        .pipe(dest(DEST_CSS))
        .pipe(connect.reload());
}

// 生成 html
task('build_html', (done)=> {
    com_build_html(true);

    done();
});

// 生成 html （include文件夹）
task('build_in_html', (done)=> {
    com_build_html(false);

    done();
});

// 清除 css
task('clean_css', (done)=> {

    // css直接输出
    src(DEST_CSS)
        .pipe(clean());
    
    done()
});

// 生成 css
task('build_css', (done)=> {
    // css直接输出
    src([SRC_CSS, '!' + SRC_SCSS])
        .pipe(changed(DEST_CSS))
        .pipe(dest(DEST_CSS))
        .pipe(connect.reload());

    com_build_css(true);

    done();

});

// 合并 css
task('concat_css', (done)=> {
    // css直接输出
    src('dist/css/*.css')
        .pipe(concat('main.css'))
        .pipe(dest(DEST_CSS))
        .pipe(connect.reload());

    done();
});

// 生成 css （include文件夹）
task('build_in_css', (done)=> {
    com_build_css(false);

    done();
});

// 生成 js
task('build_js', (done)=> {
    src(SRC_JS)
        .pipe(changed(DEST_JS))
        .pipe(dest(DEST_JS))
        .pipe(connect.reload());

    done();
});

// 压缩 js
task('uglify_js', (done)=> {
        
    src(DEST_ES)
        //.pipe(babel({
        //    presets: ['env'] //编译es5文件至es6
        //}))
        .pipe(uglify({
            mangle: true,              //跳过重整名称
            compress: false,                //完全跳过压缩
            // ie8: true
        }))
        .pipe(dest(DEST_JS))
        .pipe(connect.reload());

    done();
});

// 生成 img
task('build_img', (done)=> {
    src(SRC_IMG)
        .pipe(changed(DEST_IMG))
        // .pipe(tinypng())
        .pipe(dest(DEST_IMG))
        // .pipe(cwebp())
        // .pipe(dest(DEST_IMG))
        .pipe(connect.reload());

    done();
});

// 生成 font
task('build_fonts', (done)=> {
    src(SRC_FONTS)
        .pipe(changed(DEST_FONTS))
        .pipe(dest(DEST_FONTS))
        .pipe(connect.reload());

    done();
});

// 生成 .webp
task('cwebp', (done)=> {
    src('src/images/**')
      .pipe(cwebp())
      .pipe(dest('dist/images/'));
    
    done();
});

// 图片压缩
task('imagemin', (done) => {
    src(SRC_IMG)
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        }),
        pngquant()
    ]))
    .pipe(dest(DEST_IMG));

    done();
});

// 所有监听
task('watch_all',
    parallel('build_html', 'build_js', 'build_css', 'build_img', 'build_fonts', (done)=> {
        watch(SRC_HTML).on('all', parallel('build_html')); // 监听 html
        watch(SRC_IN_HTML).on('all', parallel('build_in_html')); // 监听 html include
        watch(SRC_CSS).on('all', series('build_css')); // 监听 css
        watch(SRC_IN_CSS).on('all', parallel('build_in_css')); // 监听 css include
        watch(SRC_JS).on('all', parallel('build_js')); // 监听 js
        watch(SRC_IMG).on('all', parallel('build_img')); // 监听 img
        watch(SRC_FONTS).on('all', parallel('build_fonts')); // 监听 fonts

        // 监听需要同步的文件夹
        var watcher = watch([SRC_HTML, SRC_JS, SRC_CSS, SRC_IMG, SRC_FONTS]);

        watcher.on('unlink', function (path) {
            let file_path = path.replace(SRC, DEST);
            file_path = file_path.replace('.scss', '.css');
            fs.existsSync(file_path) && fs.unlink(file_path, function () {
                gutil.log(file_path + ' 文件已被删除');
            });
        })


        done();
    })
);

// 发布到生产环境
task('build_project', parallel('concat_css', 'uglify_js', 'imagemin', (done)=> {
    done();
}));

// 默认任务
task('default', parallel('server_connect', 'watch_all', (done)=> {
    done();
}));

// 打开浏览器
task('opn', parallel('server_connect', 'watch_all', (done)=> {
    opn(`http://localhost:${PORT}/${APP}/dist/`);
    done();
}));