const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require("path");
 
module.exports = {
   entry: "./src/app.js",
   output: {
       path: path.resolve(__dirname, ""),
       filename: "bundle.js"
   },
   module: {
       rules: [
           {
               test: /\.css$/,
               use: [
                   {
                       loader: "style-loader"
                   },
                   {
                       loader: "css-loader"
                   }
               ]
           },
           {
                test: /\.html$/i,
                loader: 'html-loader',
          },
       ]
   },
   plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './src/img',
                    to: 'src/img',
                    toType: 'dir',
                },
                {
                    from: 'sw.js',
                    to: 'service-worker.js',
                    toType: 'file',
                },
                {
                    from: './src/manifest.json',
                    to: 'manifest.json',
                    toType: 'file',
                },
            ]
        })
   ]
}