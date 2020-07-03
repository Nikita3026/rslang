const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');
const path = require('path');



module.exports = {
    watch: true,
    entry: {
        index: './src/js/index.js',
        savannah: './src/savannah/index.js'
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
                test: /\.(ogg|mp3|wav|mpe?g)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
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
                { from: 'src/assets/images/', to: './assets/images' },
                { from: 'src/assets/audio/', to: './assets/audio' }
            ]
        }),
        new HtmlWebPackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['index']
        }),
        new HtmlWebPackPlugin({
            filename: 'savannah.html',
            template: './src/savannah/savannah.html',
            chunks: ['savannah']
        }),
        new CleanWebpackPlugin(),
    ],
    devServer: {
        port: 5500,
        contentBase: path.join(__dirname, 'dist')
    }
};