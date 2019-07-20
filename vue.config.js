module.exports = {
    // pwa的一些配置
    pwa:{
      name:'moive',
      themeColor:'#43DEA0',
      msTileColor:'#000',
      appleMobileWebAppCapable:'yes',
      appleMobileWebAppStatusBarStyle:'black',
      /*
      * 两个模式，GenerateSW（默认）和 InjectManifest
      * GenerateSW 在我们build项目时候，每次都会新建一个service worker文件
      * InjectManifest 可以让我们编辑一个自定义的service worker文件，实现更多的功能，并且可以
      * 拿到预缓存列表
      */
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // 自定义的service worker文件的位置
      swSrc: 'src/service-worker.js',
      // ...other Workbox options...
    }
    },
    configureWebpack: config => {
      if(process.env.NODE_ENV !== 'producton') return;
      return {
        plugins: [
          new PrerenderSPAPlugin({
            // Required - The path to the webpack-outputted app to prerender.
            staticDir: path.join(__dirname, 'dist'),
            // Required - Routes to render.
            routes: ['/'],
          })
        ]
      }
    },
    baseUrl:'./',
     // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。
    outputDir:'dist',
    // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    assetsDir:"assets",
    // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
    indexPath:"index.html",
    // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希。
    filenameHashing:true,
    // 多页面
    pages:undefined,
    // 编译警告
    lintOnSave:false,
    // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
    transpileDependencies:[],
    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    productionSourceMap:false,
    // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。需要注意的是该选项仅影响由 html-webpack-plugin 在构建时注入的标签 - 直接写在模版 (public/index.html) 中的标签不受影响。
    crossorigin:undefined,
    // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)。如果你构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性。需要注意的是该选项仅影响由 html-webpack-plugin 在构建时注入的标签 - 直接写在模版 (public/index.html) 中的标签不受影响。另外，当启用 SRI 时，preload resource hints 会被禁用，因为 Chrome 的一个 bug 会导致文件被下载两次。
    integrity:false,
    devServer: {
      proxy: {
        '/api': {
          target: 'http://api.douban.com/v2',
          changeOrigin: true,
          ws: true,
          pathRewrite: {             
            '^/api': ''
          }
        },
        '/expressApi':{
          target: 'http://192.168.1.4:3110/',
          changeOrigin: true,
          ws: true,
          pathRewrite: {            
            '^/expressApi': ''
          }
        },
      }
    }
  }