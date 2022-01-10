const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resourceUsage } = require('process')

module.exports = {
  mode:"development",  
  entry:'./src/main.js',
  output:{
    filename:'[name].bundle.js',
    path:path.resolve(__dirname,'dist'),
    // assetModuleFilename:'img/[name].[hash:6].[ext]'
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:[
          "style-loader",
          {
            loader:"css-loader",
            options:{
              importLoaders:1,
            }
          },
          "postcss-loader"
        ]
      },
      {
        test:/\.less$/,
        use:[
          "style-loader",
          {
            loader:"css-loader",
            options:{
              importLoaders:2
            }
          },
          "postcss-loader",
          "less-loader"
        ]        
      },
      // {
      //   test:/\.(png|jpe?g|svg|gif)$/,
      //   type:"asset/resource",
      //   generator:{
      //     // filename:"img/[name].[hash:6].[ext]",
      //   }
      // },
      {
        test:/\.(png|jpe?g|svg|gif)$/,
        type:"asset",
        generator:{
          filename:"img/[name].[hash:6].[ext]",
        },
        parser:{
          dataUrlCondition:{
            maxSize:100*1024,
          }
        }
      },

      // 到现在这个版本，字体文件不用打包就可以—嘿嘿--但是会直接在最外层生成文件
      // 也写下吧，看看生成什么
      {
        test:/\.(woff2?|ttf)$/,
        type:"asset/resource",
        generator:{
          filename:"font/[name].[hash:6].[ext]"
        }
      }
    ]
  },
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template:'./index.html',
      title:'加载其他文件'
    })
  ]
}