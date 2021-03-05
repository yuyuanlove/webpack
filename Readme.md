### 1.npm init
### 2. npm i webpack webpack-cli --save-dev

# 性能优化

* 开发环境
> 优化打包构建速度(HMR)
> 1.HMR
> 2.source-map:提供源代码到构建后的映射，

> 优化代码调试 

* 生产环境
> 优化打包构建速度
> 优化代码运行的性能


> 缓存 
1.babel缓存  babel-loader中"cacheDirectory": true, 第二次打包更快
2.hash缓存 //打包只生成一个hash值，重新导致所以的缓存失效
3.ckunkhash :根据chunk生成hash,理解chunk，js中引入css，css改变js也会变更等
4.contenthash: 根据文件的内容生成hash -> 让上线代码的性能优化

# tree shaking

为了去除项目中没有使用的代码，减小体积

前提是必须使用es6模块，生产环境 

package.json 中"sideEffects": false，都可以进行tree shaking， 可能会干掉css等文件

解决办法： "sideEffects": ["*.css","*.less"]


# code split 
代码分割；按需引入

* enrty多入口拆分

```
 entry:{
     index: './main.js',
     print: './src/print.js'
 },
 output:{
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname,'build'),
    publicPath: '/'
 }
```
以上配置打包查看文件变化

* 方式二
  
新建test.js作为入口文件测试
```
import $ from 'jquery'

cosnole.log($)

console.log('splitChunk 测试')
```
打包发现只生成一个js，如果尝试配置文件增加optimization.splitChunks

```
//将node_modules中引入的代码单独打包问一个chunk

optimization: {
    splitChunks: {
        chunks: 'all'
    }
}
```
发现打包后生成了两个js，实现代码分割效果，按需加载

多入口多个文件引入的重复代码，会提取为一个chunk，不会重复打包

* 方式三
  
通过js将某个文件单独打包为chunk
```
 //import动态导入，将某个文件单独打包
 import(/* webpackChunkName: 'test' */'./test.js').then((res)=>{
    res.myname()
 }).catch((res)=>{
    console.log('加载失败了')
 })
```