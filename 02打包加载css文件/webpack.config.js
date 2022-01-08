const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode:"development",
  entry:"./src/main",
  output:{
    path:path.resolve(__dirname,'./dist'),
    filename:"[name].bundle.js"
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        // use:["style-loader","css-loader"]
        use:[
          {loader:"style-loader"},
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
        // use:["style-loader","css-loader","less-loader"]
        use:[
          {loader:"style-loader"},
          {
            loader:"css-loader",
            options:{
              importLoaders: 2,
            }
          },
          "postcss-loader",
          {loader:"less-loader"}
        ]
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin()
  ]
}