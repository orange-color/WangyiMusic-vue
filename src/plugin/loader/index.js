import loader from './loader'
export default {
  install: function (Vue, options) {
    // 创建构造器
    var Profile = Vue.extend(loader)
    const LoaderInstance = new Profile()
    // 创建 Profile 实例，并挂载到一个元素上。
    const oDiv = document.createElement('div')
    document.body.appendChild(oDiv)
    LoaderInstance.$mount(oDiv)
    if (options && options.title !== undefined && options.title !== null) {
      LoaderInstance.title = options.title
    }
    // 添加全局方法或 property
    Vue.showLoader = function () {
      LoaderInstance.isShow = true
    }
    Vue.hiddenLoader = function () {
      LoaderInstance.isShow = false
    }
    // 添加实例方法
    // 通过this.$showLoader()调用
    Vue.prototype.$showLoader = function (methodOptions) {
      LoaderInstance.isShow = true
    }
    Vue.prototype.$hiddenLoader = function (methodOptions) {
      LoaderInstance.isShow = false
    }
  }
}
