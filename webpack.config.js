var path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

var config = {
    mode:'development',
    // target: "node",
    devtool:'inline-source-map',
    devServer:{
        contentBase:'./ui/dist',
        hot:true
    },
    entry: {
        "dockit-ui":"./ui/app.tsx",
        // "dockit-core":"./src/dockit-core/index.ts"
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
            title: 'Dockit UI'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    externals:{
        fs:    "commonjs fs"
    },

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
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            }
        ]
    }
};

module.exports = config;