# gulp脚手架

---

## 支持功能

+ 监听资源变更
+ 热更新
+ 生成fonts/img/js/css/html
+ 模板引擎功能(ejs),es6转es5,js压缩
+ sass转css,css压缩,合并css,css自动补全前缀
+ 图片压缩

---

## 本地开发

### Node 版本

+ 推荐使用 `Node.js 20.x LTS`
+ 当前项目是较老的 Gulp 构建链，`Node.js 24` 下虽然可以运行，但更容易遇到旧依赖的兼容性警告
+ 包管理器建议使用 `npm`，不建议使用 `cnpm`

### 安装依赖

```bash
npm install
```

### 常用命令

+ `npm run dev`
  启动本地开发环境，执行默认 Gulp 任务，包含文件监听和本地服务

+ `npm start`
  启动本地服务、监听文件变更，并自动打开浏览器

+ `npm run build`
  执行生产构建任务
  
### 本地访问

+ 默认端口：`8081`
+ 默认访问地址：`http://localhost:8081/`
+ 如果项目目录名称变更，访问路径中的 `ouna` 也需要同步调整

---

## 目录结构

```text
ouna/
├─ src/                源文件目录
│  ├─ include/         EJS include 片段
│  ├─ css/             SCSS / CSS 源文件
│  ├─ js/              JS 源文件
│  ├─ images/          图片资源
│  ├─ fonts/           字体资源
│  └─ *.html           页面入口
├─ dist/               构建输出目录
│  ├─ css/
│  ├─ js/
│  ├─ images/
│  ├─ fonts/
│  └─ *.html
├─ gulpfile.js         Gulp 构建配置
├─ package.json        项目依赖与脚本
└─ README.md           使用说明
```

## 构建说明

### 开发构建

+ `npm run dev`
  会启动本地服务、监听 `src` 目录，并把 HTML、CSS、JS、图片、字体同步生成到 `dist`

+ `npm start`
  功能与 `npm run dev` 基本一致，并会自动打开浏览器

### 生产构建

+ `npm run build`
  对 `dist/js/*.js` 执行压缩，并将 `dist/css/*.css` 合并为 `dist/css/main.css`

+ 当前 `build` 命令默认处理的是已经存在于 `dist` 中的文件
+ 推荐顺序是先执行一次 `npm run dev` 或确认 `dist` 内容已更新，再执行 `npm run build`