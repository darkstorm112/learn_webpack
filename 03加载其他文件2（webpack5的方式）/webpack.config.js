const path = require('path')
const fs = require('fs')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {DefinePlugin} = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
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
    new DefinePlugin({
      BASE_URL:"'./'"
    }),
    new HtmlWebpackPlugin({
      template:'./index.html',
      title:'加载其他文件'
    }),
    new CopyPlugin({
      patterns:[
        {
          from:'public',
          // filter:async(source)=>{
          //   const data = await fs.promises.readFile(source)
          //   let content = data.toString()
          //   content = content.replace('good','test')
          //   // await fs.promises.writeFile(source,content)
          //   return true
          // },
          transform:{
            transformer(context, path) {
              console.log(context)
              return context.toString().replace('good','test')
            }
          },
          to:'pub'
        }
      ]
      
    })
  ]
}