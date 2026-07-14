const {task, src, dest, parallel, watch, series} = require('gulp'), // gulp
    fs = require('fs'), // 文件操作
    path = require('path'), // 路径处理
    {exec} = require('child_process'), // 打开浏览器
    plugins = require('gulp-load-plugins')(), //自动加载gulp插件
    gulpif = plugins['if'], // 逻辑判断
    changed = plugins['changed'], // 过滤未变动的文件
    wait = plugins['wait'], // 延时处理
    sass = plugins['sass'](require('sass')), // 编译sass
    autoprefixer = plugins['autoprefixer'], // css自动补全前缀
    uglify = plugins['uglify'], // js压缩
    connect = plugins['connect'], // 自动刷新页面
    plumber = plugins['plumber'], // 错误处理
    ejs = plugins["ejs"], // ejs模板
    concat = plugins['concat'], // 合并文件
    del = require('del'); // 清除文件


// src
const SRC = 'src',
    SRC_HTML = 'src/*.html',
    SRC_IN_HTML = 'src/include/*.html',
    SRC_JS = 'src/js/**',
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
    APP = path.basename(__dirname);

// 服务配置
task('server_connect', (done)=> {
    connect.server({
        root: '../',
        port: PORT,
        livereload: true
    });

    done();
});

function streamToPromise(stream) {
    return new Promise((resolve, reject)=> {
        stream.on('finish', resolve);
        stream.on('end', resolve);
        stream.on('error', reject);
    });
}

function openBrowser(url) {
    const command = process.platform === 'win32'
        ? `start "" "${url}"`
        : process.platform === 'darwin'
            ? `open "${url}"`
            : `xdg-open "${url}"`;

    exec(command, (error)=> {
        if (error) {
            console.error(`无法自动打开浏览器: ${error.message}`);
        }
    });
}

function logBuildError(label, err) {
    const message = err && (err.messageFormatted || err.message) ? (err.messageFormatted || err.message) : String(err);
    console.error(`[${label}] ${message}`);
}

// 公用方法
// 编译 html
function com_build_html(n) {
    // 错误处理
    var onError = function (err) {
        logBuildError('HTML Error', err);

        // 重要！！
        this.emit('end');
    };

    return src(SRC_HTML)
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
    return src(SRC_SCSS, {
        sourcemaps: false
    })
        .pipe(gulpif(n, changed(DEST_CSS, { // dest 参数需要和 dest 中的参数保持一致
            extension: '.css' // 如果源文件和生成文件的后缀不同，这一行不能忘
        }), wait(200)))
        // 先处理 sass 编译错误，避免任务中断
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', function (err) {
            logBuildError('Sass Error', err);
            this.emit('end');
        }))
        .pipe(autoprefixer('> 1%','last 5 versions'))
        .pipe(dest(DEST_CSS, {
            sourcemaps: '.'
        }))
        .pipe(connect.reload());
}

// 生成 html
task('build_html', ()=> com_build_html(true));

// 生成 html （include文件夹）
task('build_in_html', ()=> com_build_html(false));

// 清除 css
task('clean_css', function () {
    // 匹配模式数组：
    // 1. 先匹配所有 .css 文件
    // 2. 再排除 main.css
    return del([
        `${DEST_CSS}/*.css`,
        `!${DEST_CSS}/main.css`
    ]);
});

// 生成 css
task('build_css', ()=> Promise.all([
    streamToPromise(
        src([SRC_CSS, '!' + SRC_SCSS])
            .pipe(changed(DEST_CSS))
            .pipe(dest(DEST_CSS))
            .pipe(connect.reload())
    ),
    streamToPromise(com_build_css(true))
]));

// 合并 css
task('concat_css', ()=> 
    // css直接输出
    src('dist/css/*.css')
        .pipe(concat('main.css'))
        .pipe(dest(DEST_CSS))
        .pipe(connect.reload())
);

// 生成 css （include文件夹）
task('build_in_css', ()=> com_build_css(false));

// 生成 js
task('build_js', ()=> 
    src(SRC_JS)
        .pipe(changed(DEST_JS))
        .pipe(dest(DEST_JS))
        .pipe(connect.reload())
);

// 压缩 js
task('uglify_js', ()=> {
        
    return src(DEST_ES)
        .pipe(uglify({
            mangle: true,              //跳过重整名称
            compress: false,                //完全跳过压缩
            // ie8: true
        }))
        .pipe(dest(DEST_JS))
        .pipe(connect.reload());
});

// 生成 img
task('build_img', ()=> 
    src(SRC_IMG)
        .pipe(changed(DEST_IMG)) // 过滤未修改的图片文件
        .pipe(dest(DEST_IMG))
        .pipe(connect.reload())
);

// 生成 font
task('build_fonts', ()=> 
    src(SRC_FONTS)
        .pipe(changed(DEST_FONTS))
        .pipe(dest(DEST_FONTS))
        .pipe(connect.reload())
);

// 所有监听
task('watch_all',
    parallel('build_html', 'build_js', 'build_css', 'build_img', 'build_fonts', (done)=> {
        watch(SRC_HTML, series('build_html')); // 监听 html
        watch(SRC_IN_HTML, series('build_in_html')); // 监听 html include
        watch(SRC_CSS, series('build_css')); // 监听 css
        watch(SRC_IN_CSS, series('build_in_css')); // 监听 css include
        watch(SRC_JS, series('build_js')); // 监听 js
        watch(SRC_IMG, series('build_img')); // 监听 img
        watch(SRC_FONTS, series('build_fonts')); // 监听 fonts

        // 监听需要同步的文件夹
        var watcher = watch([SRC_HTML, SRC_JS, SRC_CSS, SRC_IMG, SRC_FONTS]);

        watcher.on('unlink', function (path) {
            let file_path = path.replace(SRC, DEST);
            file_path = file_path.replace('.scss', '.css');
            fs.existsSync(file_path) && fs.unlink(file_path, function () {
                console.log(file_path + ' 文件已被删除');
            });
        })


        done();
    })
);

// 发布到生产环境
task('build_project', parallel('concat_css', 'uglify_js', (done)=> {
    done();
}));

// 默认任务
task('default', parallel('server_connect', 'watch_all', (done)=> {
    done();
}));

// 打开浏览器
task('opn', parallel('server_connect', 'watch_all', (done)=> {
    openBrowser(`http://localhost:${PORT}/${APP}/dist/`);
    done();
}));
