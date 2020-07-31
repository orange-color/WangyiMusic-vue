import notFound from './notFound'
export default {
  install: function (Vue, options) {
    // 创建构造器
    var Profile = Vue.extend(notFound)
    const NotFoundInstance = new Profile()
    // 创建 Profile 实例，并挂载到一个元素上。
    const oDiv = document.createElement('div')
    document.body.appendChild(oDiv)
    NotFoundInstance.$mount(oDiv)
    if (options && options.title !== undefined && options.title !== null) {
      NotFoundInstance.title = options.title
    }
    // 添加全局方法或 property
    Vue.showNotFound = function () {
      NotFoundInstance.isShow = true
    }
    Vue.hiddenNotFound = function () {
      NotFoundInstance.isShow = false
    }
    // 添加实例方法
    // 通过this.$showLoader()调用
    Vue.prototype.$showNotFound = function (methodOptions) {
      NotFoundInstance.isShow = true
    }
    Vue.prototype.$hiddenNotFound = function (methodOptions) {
      NotFoundInstance.isShow = false
    }
  }
}
