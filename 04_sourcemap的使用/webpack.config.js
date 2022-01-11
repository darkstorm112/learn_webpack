const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const {DefinePlugin} = require('webpack')

module.exports = {
  entry:"./src/main.js",
  output:{
    filename:'[name].bundle.js',
    path:path.resolve(__dirname,'dist')
  },
  mode:'development',
  devtool:"cheap-module-source-map", // cheap-module-source-map/source-map
  module:{
    rules:[
      {
        test:/\.css$/,
        use:[
          'style-loader',
          {
            loader:'css-loader',
            options:{
              importLoaders:1
            }
          },
          'postcss-loader'
        ]
      },
      {
        test:/\.less/,
        use:[
          'style-loader',
          {
            loader:'css-loader',
            options:{
              importLoaders:2
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test:/\.(png|jpe?g|svg|gif)$/,
        type:"asset",
        generator:{
          filename:'./img/[name].[hash:6].[ext]'
        },
        parser:{
          dataUrlCondition:{
            maxSize:80*1024
          }
        }
      },
      {
        test:/\.(ttf|woff2?)$/,
        type:"asset/resource",
        generator:{
          filename:"./font/[name].[ext]"
        }
      }
    ]
  },
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template:'./index.html',
      title:"source-map"
    }),
    new DefinePlugin({
      BASE_URL:"'./'"
    }),
    new CopyWebpackPlugin({
      patterns:[
        {
          from:'public',
          transform:{
            transformer (content,path) {
              return content.toString().replace('good','test')
            }
          },
          to:'public'
        }
      ]
    })
  ]
}