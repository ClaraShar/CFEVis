const path = require('path');
const webpack = require('webpack')
const proxyUrl = 'http://localhost:3033'

module.exports = {
 
    /*入口*/
    entry: [
        'babel-polyfill',
        'react-hot-loader/patch',
        path.join(__dirname, 'src/index.js')
    ],
    
    /*输出到dist文件夹，输出文件名字为bundle.js*/
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },

     /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
    /*cacheDirectory是用来缓存编译结果，下次编译加速*/
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader?cacheDirectory=true'],
            include: path.join(__dirname, 'src')
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    },
    devServer:{
        contentBase: './dist',
        historyApiFallback: false,
        host: '0.0.0.0',
        hot: true,
        proxy:{
            '/api':'http://localhost:3033'
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'inline-source-map', // 调试代码用，可以定位到错误源码源文件，而不是bundle.js
};