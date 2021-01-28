const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './main.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname,'build')
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