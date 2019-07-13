var gulp = require('gulp'); // gulp
var fs = require('fs'); // 文件操作
var opn = require('opn'); // 打开浏览器
var plugins = require('gulp-load-plugins')(); //自动加载gulp插件
var cleanCSS = require('gulp-clean-css'); // css压缩
var gulpif = plugins['if']; // 逻辑判断
var changed = plugins['changed']; // 过滤未变动的文件
var sass = plugins['sass']; // 编译sass
var autoprefixer = plugins['autoprefixer']; // css自动补全前缀
var uglify = plugins['uglify']; // js压缩
var imagemin = plugins['imagemin']; // 图片压缩
var connect = plugins['connect']; // 自动刷新页面
var notify = plugins['notify']; // 打印消息
var plumber = plugins['plumber']; // 错误处理
var ejs = plugins["ejs"]; // ejs模板
var gutil = plugins['util']; // 工具
var wait = plugins['wait']; // 延时
var babel = plugins['babel']; // es5转es6
var sourcemaps = plugins['sourcemaps']; // 生成.map文件
var concat = plugins['concat']; // 合并文件
var clean = plugins['clean']; // 清除文件

// src
const SRC = 'src';
const SRC_HTML = 'src/*.html';
const SRC_IN_HTML = 'src/include/*.html';
const SRC_JS = 'src/js/!(*-es6).*';
const SRC_ES6 = 'src/js/+(*-es6).*';
const SRC_CSS = 'src/css/*.*';
const SRC_SCSS = 'src/css/*.scss';
const SRC_IN_CSS = 'src/css/include/*.scss';
const SRC_IMG = 'src/images/*.{png,jpg,gif,svg,mp4}';
const SRC_FONTS = 'src/fonts/*';

// dest
const DEST = 'dist';
const DEST_JS = 'dist/js';
const DEST_CSS = 'dist/css';
const DEST_IMG = 'dist/images';
const DEST_FONTS = 'dist/fonts';

// server
const PORT = 8081;
const APP = __dirname.slice(__dirname.lastIndexOf('\\') + 1);

// 服务配置
gulp.task('server_connect', function (done) {
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

    gulp.src(SRC_HTML)
        .pipe(gulpif(n, changed(DEST)))
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(ejs())
        .pipe(gulp.dest(DEST))
        .pipe(connect.reload());
}

// 编译 scss
function com_build_css(n) {
    gulp.src(SRC_SCSS)
        .pipe(sourcemaps.init())
        .pipe(gulpif(n, changed(DEST_CSS, { // dest 参数需要和 gulp.dest 中的参数保持一致
            extension: '.css' // 如果源文件和生成文件的后缀不同，这一行不能忘
        }), wait(200)))
        // sass()方法中先进行错误处理，然后交给autoprefixer()，否则会终止进程
        .pipe(sass({
            outputStyle: 'compact'
        }).on('error', notify.onError("Error: <%= error.message %>")))
        .pipe(autoprefixer('> 0.01%'))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(DEST_CSS))
        .pipe(connect.reload());
}

// 生成 html
gulp.task('build_html', function (done) {
    com_build_html(true);

    done();
});

// 生成 html （include文件夹）
gulp.task('build_in_html', function (done) {
    com_build_html(false);

    done();
});

// 清除 css
gulp.task('clean_css', function (done) {

    // css直接输出
    gulp.src('dist/css/main.css')
        .pipe(clean());
    
    done()
});

// 生成 css
gulp.task('build_css', function (done) {
    // css直接输出
    gulp.src([SRC_CSS, '!' + SRC_SCSS])
        .pipe(changed(DEST_CSS))
        .pipe(gulp.dest(DEST_CSS))
        .pipe(connect.reload());

    com_build_css(true);

    done();

});

// 合并 css
gulp.task('concat_css', function (done) {
    // css直接输出
    gulp.src('dist/css/*.css')
        .pipe(concat('main.css'))
        .pipe(gulp.dest(DEST_CSS))
        .pipe(connect.reload());

    done();
});

// 生成 css （include文件夹）
gulp.task('build_in_css', function (done) {
    com_build_css(false);

    done();
});

// 生成 js
gulp.task('build_js', function (done) {
    gulp.src(SRC_JS)
        .pipe(changed(DEST_JS))
        .pipe(uglify({
            mangle: true,              //跳过重整名称
            compress: false,                //完全跳过压缩
            ie8: true
        }))
        .pipe(gulp.dest(DEST_JS))
        .pipe(connect.reload());

    done();
});

// 生成js-es6
gulp.task('build_ES6', function (done) {
    gulp.src(SRC_ES6)
        .pipe(changed(DEST_JS))
        .pipe(babel({
            presets: ['env'] //编译es5文件至es6
        }))
        .pipe(uglify())
        .pipe(gulp.dest(DEST_JS))
        .pipe(connect.reload());

    done();
});

// 生成 img
gulp.task('build_img', function (done) {
    gulp.src(SRC_IMG)
        .pipe(changed(DEST_IMG))
        // .pipe(imagemin({
        //   optimizationLevel: 5,   //类型：Number  默认：3  取值范围：0-7（优化等级）
        //   progressive: true,      //类型：Boolean 默认：false 无损压缩jpg图片
        //   interlaced: true,       //类型：Boolean 默认：false 隔行扫描gif进行渲染
        //   multipass: true         //类型：Boolean 默认：false 多次优化svg直到完全优化
        // }))
        .pipe(gulp.dest(DEST_IMG))
        .pipe(connect.reload());

    done();
});

// 生成 font
gulp.task('build_fonts', function (done) {
    gulp.src(SRC_FONTS)
        .pipe(changed(DEST_FONTS))
        .pipe(gulp.dest(DEST_FONTS))
        .pipe(connect.reload());

    done();
});

// 所有监听
gulp.task('watch_all',
    gulp.parallel('build_html', 'build_js', 'build_ES6', 'build_css', 'build_img', 'build_fonts', function (done) {
        gulp.watch(SRC_HTML).on('all', gulp.parallel('build_html')); // 监听 html
        gulp.watch(SRC_IN_HTML).on('all', gulp.parallel('build_in_html')); // 监听 html include
        gulp.watch(SRC_CSS).on('all', gulp.series('build_css')); // 监听 css
        gulp.watch(SRC_IN_CSS).on('all', gulp.parallel('build_in_css')); // 监听 css include
        gulp.watch(SRC_JS).on('all', gulp.parallel('build_js')); // 监听 js
        gulp.watch(SRC_ES6).on('all', gulp.parallel('build_ES6')); // 监听 js-es6
        gulp.watch(SRC_IMG).on('all', gulp.parallel('build_img')); // 监听 img
        gulp.watch(SRC_FONTS).on('all', gulp.parallel('build_fonts')); // 监听 fonts

        // 监听需要同步的文件夹
        var watcher = gulp.watch([SRC_HTML, SRC_JS, SRC_ES6, SRC_CSS, SRC_IMG, SRC_FONTS]);

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

// 默认任务
gulp.task('default', gulp.parallel('server_connect', 'watch_all', function(done){
    done();
}));

// 打开浏览器
gulp.task('opn', gulp.parallel('server_connect', 'watch_all', function () {
    opn(`http://localhost:${PORT}/${APP}/dist/`);
}));