//плагин для сборки css файлов в единый, хотя может собирать и в
//разные, зависит от задачи, тут подключение, настройка ниже.


const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// Check error with cash becouse webpack
const HtmlWebpackPlugin = require('html-webpack-plugin');

//теперь экспортируем объект с настройками

module.exports = {
//тут у нас точка входа для js и прочих файлов, например style - 
//это css. Чтобы собрать все в единый файл, тебе нужно подключить
//все разрозненые js к точке входа, тоесть все твои js файлы
//должны быть импорированы в index.js
//webpack позволяет собирать и разные js-файлы
  entry: ['./src/index.js', './src/scss/style.scss'],
  //это выход
  output: {
	//куда сохраняем js, сейчас в корневом каталоге
    path: path.resolve(__dirname, 'dist'),
	//название файла, можно задать руками, можно генерить по имени
	//точки входа, как сейчас
    filename: 'bundle.js',
  },
  // select mode dev or prod. have error cash
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      favicon: './src/assets/img/favicon.jpg',
      title: 'english-puzzle',
	  // This error with cash -  for [build]: filename: '../index.html' [watch] filename: 'index.html'
	  //название файла, можно задать руками, можно генерить по имени
	  //точки входа, как сейчас
      filename: '../index.html',
    }),
	//  plugein style css
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    esmodules: true,
                  },
                },
              ],
            ],
          },
        },
      }, {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader',
        ],
      }, {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }, {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
};
