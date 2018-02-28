////////////////////////////////////
//  Import modules
////////////////////////////////////
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

////////////////////////////////////
// Configure environment settings
////////////////////////////////////

module.exports = (env={}) => {

  const { production=false, development=false } = env

  return {
    context: path.join(__dirname, './'),
    entry: {
      app: './index.js'
    },
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: '[name].bundle.js',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          include: path.join(__dirname, 'src'),
          options: {
            presets: ['react', 'env'],
            plugins: [
              ["transform-object-rest-spread", { "useBuiltIns": true }]
            ]
          }
        },
        {
          test: /\.s?css$/,
          use: production 
            ? ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader'],
                // publicPath: '../'
              })
            : ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.(png|ico|jpe?g|gif)$/i,
          use: [
            'file-loader?name=images/[name].[ext]',
            'image-webpack-loader'
          ]
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        title: 'AWS IP Prefix React App',
        style: './styles/styles.css',
        inject: 'body',
        favicon: './src/images/favicon.ico',
      }),
      new ExtractTextPlugin({
        filename: './styles/[name].css',
        disable: development,
        allChunks: true
      }),
    ]
  }
}