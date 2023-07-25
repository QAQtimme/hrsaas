module.exports = {
  lintOnSave: false,
  publicPath: './',
  devServer: {
    proxy: {
      // 跨域代理原理
      // 跨域 不同源 端口 协议 域名
      // 代理 服务器请求服务器不存在跨域 localhost 8080 接口 请求成功之后暂存到 本地服务器
      // 项目内部请求数据是直接请求本地服务器 同源 本地服务器再请求线上服务器
      '/api': { // 使用api代理
        target: 'http:\\localhost:3000', // 代理的外网服务器基准路径
        //   ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }

  }
}
/**
* 环境 项目运行的环境
* 开发环境 在本地通过服务器运行的环境 脚手架借助node 搭建了服务器
* 线上环境 直接可以在云服务器（线上网站）访问的环境
* 开发->上线 cnpm run build  打包  脱离了node环境 代理跨域失效
*
* 配置 资源引用路径
*
* 分清楚当前是什么环境 开发 线上 环境
*/

module.exports = {
  lintOnSave: false,
  publicPath: './',
  devServer: {
    proxy: {
      // 代理服务器的作用是将请求转发到目标服务器，以避免浏览器的跨域限制
      // 例如，本地服务器通过代理服务器请求线上服务器的数据，就可以避免跨域问题
      '/api': { // 将以/api开头的请求代理到目标服务器
        target: 'http:\\localhost:3000', // 目标服务器的基准路径
        changeOrigin: true, // 将请求头中的Origin字段设置为目标服务器的地址
        pathRewrite: {
          '^/api': '' // 将请求路径中的/api前缀替换为空字符串
        }
      }
    }
  }
}
/**
* 环境：项目运行的环境
* 开发环境：在本地通过服务器运行的环境，脚手架借助Node.js搭建了服务器
* 线上环境：直接可以在云服务器（线上网站）访问的环境
* 开发->上线：通过npm run build命令打包项目，生成静态资源文件，脱离了Node.js环境，代理跨域失效
*
* 配置：资源引用路径
*
* 在开发环境和线上环境中，静态资源的引用路径不同，需要进行配置
* 在开发环境中，静态资源的引用路径为相对路径，即./
* 在线上环境中，静态资源的引用路径为绝对路径，即/
* 为了避免手动修改引用路径，可以使用publicPath选项进行配置
* publicPath选项的默认值为/，即绝对路径
* 在本项目中，publicPath选项的值为./，即相对路径
*
* 代理：解决跨域问题
*
* 跨域是指在浏览器中发起的请求，如果请求的域名、端口、协议、路径中有任意一项不同，就会被浏览器拦截，这就是跨域问题。
* 代理服务器的作用是将请求转发到目标服务器，以避免浏览器的跨域限制。
* 在本项目中，代理服务器将以/api开头的请求代理到目标服务器，目标服务器的基准路径为http://localhost:3000。
* 代理服务器会将请求头中的Origin字段设置为目标服务器的地址，以避免跨域问题。
* 代理服务器还会将请求路径中的/api前缀替换为空字符串，以符合目标服务器的接口规范。
*/
