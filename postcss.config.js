module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      // 根元素字体大小
      rootValue: 100,
      propList: ['*']
    }
  }
}
