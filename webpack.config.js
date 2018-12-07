var path = require("path");
var config = {
    entry: ["./ui/app.tsx"],
    output: {
        path: path.resolve(__dirname, "build/ui"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },

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