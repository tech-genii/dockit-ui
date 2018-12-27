var path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');

var config = {
    mode:'development',
    target: "node",
    entry: {
        "dockit-core":"./src/dockit-core/index.ts"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },

    plugins:[
        new CleanWebpackPlugin(['dist'])
    ],
    // externals:{
    //     fs:    "commonjs fs"
    // },

    module: {
        rules:[
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            }
        ]
    }
};

module.exports = config;