const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  entry:'./src/main.js',
  output:{
      filename:"bundle.js",
      //绝对路径
      path:path.resolve(__dirname,'dist')

  },
  resolve:{
    alias:{
      img:path.resolve(__dirname,'src/img')
    },
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:[
          'style-loader',
          {
            loader:'css-loader',
            options:{
              importLoaders:1,
              esModule:false
            }
          },
          'postcss-loader'
        ]
      },
      {
        test:/\.less$/,
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
      // 不建议使用file-loader
      // {
      //   test:/\.(png|jpg|jpeg|svg|gif)$/,
      //   use:[
      //     {
      //         loader:"file-loader",
      //         options:{
      //           name:'img/[name].[hash:6].[ext]'
      //         }
      //     }
      //   ],
      //   // 用不到// type: 'javascript/auto'
      // }
      {
        test:/\.(png|jpg|jpeg|svg|gif)$/,
        use:[
          {
            loader:'url-loader',
            options:{
              limit: 20*1024,
              name:'[name].[hash:6].[ext]',
              // publicPath:'./img',
              outputPath:'img',
              // esModule:false
            },
          }
        ],
        // type: 'javascript/auto'
      }
    ]
  },
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({title:'测试'})
  ]
}