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
