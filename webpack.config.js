var path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

var config = {
    mode:'development',
    devtool:'inline-source-map',
    devServer:{
        contentBase:'./ui/dist',
        hot:true
    },
    entry: {
        "dockit-ui":"./ui/app.tsx"
    },
    output: {
        path: path.resolve(__dirname, "ui/dist"),
        filename: "[name].bundle.js",
        publicPath: "/"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },

    plugins:[
        new CleanWebpackPlugin(['ui/dist']),
        new HtmlWebpackPlugin({
            title: 'DockIt Admin'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],

    module: {
        rules:[
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    }
};

module.exports = config;