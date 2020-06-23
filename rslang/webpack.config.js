const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');
const path = require('path');



module.exports = {
    watch: true,
    entry: {
        index: './src/card-page/js/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: { minimize: true }
                }]
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,

                use: [{
                    loader: "file-loader",
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/images/',
                    }
                }]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.css",
            chunkFilename: "[id].css"
        }),
        new CopyWebPackPlugin({
            patterns: [
                { from: 'src/assets/images/', to: './assets/images' }
            ]
        }),
        new HtmlWebPackPlugin({
            filename: 'index.html',
            template: './src/card-page/index.html',
            chunks: ['index']
        }),
        new CleanWebpackPlugin(),
    ],
    devServer: {
        port: 5500,
        contentBase: path.join(__dirname, 'dist')
    }
};