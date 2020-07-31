module.exports = {
  outputDir: 'bundle',
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        }
      ]
    }

  }
}
