var path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');

var config = {
    mode:'production',
    target: "node",
    entry: {
        "dockit":"./src/dockit-core/index.ts"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },
    resolve: {
        extensions: [".ts", ".js"]
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
                test: /\.ts$/,
                loader: "ts-loader",
                exclude: /node_modules/
            }
        ]
    }
};

module.exports = config;