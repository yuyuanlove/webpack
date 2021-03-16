const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

//打包先清除build文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

//提取css为单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

//处理css的兼容性
const postcssPresetEnv = require('postcss-preset-env')
process.env.NODE_ENV = "development"

//压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    target: 'web',
    entry: ['./main.js','./index.html'], //html文件热更新
    output: {
        filename: 'js/[name].[contenthash:10].js',
        path: resolve(__dirname,'build'),
        publicPath: '/'
    },
    //loader配置
    module:{
        rules:[
            //详细的loader配置‘
            {
                oneOf: [ //匹配到loader之后，就退出相当于break
                    {
                        test: /\.css$/,
                        use:[ 
                            // 'style-loader',
                            // 取代style-loader，提取js中的css为单独文件
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            // 兼容性处理 postcss,修改相关配置
                            {
                                loader: 'postcss-loader',
                                options:{
                                    postcssOptions: {
                                        plugins:[
                                            postcssPresetEnv()
                                        ]
                                    }
                                }
                            }
                        ]
                    },
                    {
                        test: /\.less$/,
                        use:[
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            // 兼容性处理 postcss,修改相关配置
                            {
                                loader: 'postcss-loader',
                                options:{
                                    postcssOptions: {
                                        plugins:[
                                            postcssPresetEnv()
                                        ]
                                    }
                                }
                            },
                            'less-loader'
                        ]
                    },
                    {
                        test:/\.js$/, //js 的兼容性处理
                        exclude: /node_modules/,
                        use: [
                             //开启多进程打包,启动大概600ms，通信也有开销
                             //只有工作消耗较长，才需要多进程打包
                            // 'thread-loader',
                            {
                                loader: 'babel-loader',
                                options:{
                                    "cacheDirectory": true,  //第二次构建会读取缓存
                                }
                            }
                            
                        ]

                    },
                    {
                        test: /\.(jpg|png|gif)$/,
                        loader: 'url-loader', //url-loader file-loader
                        options:{
                            limit: 15*1024, //图片小于15kb，就会被base64处理，可以减少请求，但是体积会变大(请求速度慢)，可以8～12kb
                            outputPath:'imgs',
                            name: '[ckunkhash:10].[ext]'
                        }
                    },
                    {
                        test: /\.html$/, 
                        loader: 'html-loader' //处理html中的img，才能被url-loader处理
                    },
                    {
                        exclude: /\.(css|less|jpg|png|gif|html|js)$/, //打包其他资源
                        loader: 'file-loader',
                        options:{
                            name:'[ckunkhash:10].[ext]',
                            outputPath: 'resource'
                        }
                    }
                ]
            }
        ]
    },
    //插件配置
    plugins:[
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new MiniCssExtractPlugin({
            //设置输出的文件路径以及名称
            filename: 'css/index.[contenthash:10].css'
        }),
        new CleanWebpackPlugin(),
        new OptimizeCssAssetsPlugin()
    ],
    //模式
    mode: 'production', //生产环境下js和html会被自动压缩了
    //自动编译，自动打开浏览器，自动刷新浏览器；只会在内存中编译打包，不会有任何输出；启动指令:npx webpack-dev-server
    devServer: {
        contentBase: './build', //运行的根路径
        compress: true , //启动gzip压缩
        port: 3000,
        open:true,
        hot: true, //HMR 只在生产环境，js和html不能使用
    },
    //devtool: 'eval-source-map', // 生产source-map
    //optimization将node_modules中需要的代码单独打包成一个chunk
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    resolve: {
        // 设置路径别名
        alias:{
            '@': resolve(__dirname,'src'),
        }
    }
}