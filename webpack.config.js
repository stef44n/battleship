const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        app: "./src/index.js",
    },
    devtool: "inline-source-map",
    devServer: {
        static: "./dist",
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Battleships",
        }),
    ],
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(js)$/,
                use: "babel-loader",
            },
        ],
    },
    optimization: {
        runtimeChunk: "single",
    },
};
