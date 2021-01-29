const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './main.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname,'build'),
        publicPath: './'
    },
    //loader配置
    module:{
        rules:[
            //详细的loader配置‘
            {
                test: /\.css$/,
                use:[ 'style-loader','css-loader' ]
            },
            {
                test: /\.less$/,
                use:['style-loader','css-loader','less-loader']
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader', //url-loader file-loader
                options:{
                    limit: 15*1024 //图片小于15kb，就会被base64处理，可以减少请求，但是体积会变大(请求速度慢)，可以8～12kb
                }
            },
            {
                test: /\.html$/, 
                loader: 'html-loader' //处理html中的img，才能被url-loader处理
            },
            {
                exclude: /\.(css|less|jpg|png|gif|html)$/
            }
        ]
    },
    //插件配置
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    //模式
    mode: 'development'
}