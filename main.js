/**
 * 入口文件
 */

import './src/index.less'
import './src/index.css'
import './static/font/iconfont.css'
import './src/index'
import print from './src/print'

 function add(x,y){
     return x+y
 }

 console.log(add(1,1))
 console.log(242)
 print()

 if(module.hot){ //非入口文件的js实现模块热替换
     console.log(111)
     module.hot.accept('./src/print.js',() => {
         //方法会监听js文件的变化，执行回调函数
         print()
     })
 }