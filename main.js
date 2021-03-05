/**
 * 入口文件
 */

import './src/index.less'
import './src/index.css'
import './static/font/iconfont.css'
import './src/index'
import print from './src/print'
import { add } from './src/tree_shaking'


// const add1 = (x,y) => {
//      return x+y
//  }

//  console.log(add1(1,1))
 console.log(243)
 console.log(add(1,1))
 print()


 //import动态导入，将某个文件单独打包
 import(/* webpackChunkName: 'test' */'./test.js').then((res)=>{
    res.myname()
 }).catch((res)=>{
    console.log('加载失败了')
 })

 //HMR
 if(module.hot){ //非入口文件的js实现模块热替换
     console.log(111)
     module.hot.accept('./src/print.js',() => {
         //方法会监听js文件的变化，执行回调函数
         print()
     })
 }