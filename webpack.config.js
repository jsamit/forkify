const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    // here may be 4 type of object
    // entry , output , plugins , loaders

    entry : ['babel-polyfill','./src/js/index.js'],
    output : {
        path : path.resolve(__dirname,'./dist/'),
        filename : 'js/bundle.js'
    },
    devServer : {
        contentBase : './dist'      // this directory and above path resolve directory should be same
    },
    plugins : [
        new HtmlWebpackPlugin({
            filename : 'index.html',
            template : './src/index.html'
        })
    ],
    module : {
        rules : [
            {
                test : /\.js$/,
                exclude : /node_modules/,
                use : {
                    loader : 'babel-loader'
                }
            }
        ]
    }
}