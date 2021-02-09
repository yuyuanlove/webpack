const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

//提取css为单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

//处理css的兼容性
const postcssPresetEnv = require('postcss-preset-env')

process.env.NODE_ENV = "development"

//压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    entry: './main.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname,'build'),
        publicPath: './'
    },
    //loader配置
    module:{
        rules:[
            //详细的loader配置‘
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
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader', //url-loader file-loader
                options:{
                    limit: 15*1024, //图片小于15kb，就会被base64处理，可以减少请求，但是体积会变大(请求速度慢)，可以8～12kb
                    outputPath:'imgs',
                    name: '[hash:10].[ext]'
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
                    name:'[hash:10].[ext]',
                    outputPath: 'resource'
                }
            }
        ]
    },
    //插件配置
    plugins:[
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new MiniCssExtractPlugin({
            //设置输出的文件路径以及名称
            filename: 'css/index.css'
        }),
        // new OptimizeCssAssetsPlugin()
    ],
    //模式
    mode: 'development',
    //自动编译，自动打开浏览器，自动刷新浏览器；只会在内存中编译打包，不会有任何输出；启动指令:npx webpack-dev-server
    devServer: {
        contentBase: resolve(__dirname,'build'), //运行的根路径
        compress: true , //启动gzip压缩
        port: 3000,
        open:true
    }
}