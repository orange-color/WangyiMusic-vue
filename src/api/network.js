import axios from 'axios'
import Vue from 'vue'

// 进行全局的配置
// axios.defaults.baseURL = 'http://192.168.0.108:3000/'
// axios.defaults.baseURL = 'http://127.0.0.1:3000/'
// axios.defaults.baseURL = 'http://192.168.0.108:3000/'
axios.defaults.baseURL = 'http://music.it666.com:3666'
axios.defaults.timeout = 5000

// 请求次数问题，等到所有响应结束后在隐藏
let count = 0
// 请求或者响应错误时也需要隐藏

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  if (count === 0) {
    Vue.showLoader()
  }
  count++
  return config
}, function (error) {
  // 对请求错误做些什么
  Vue.hiddenLoader()
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  count--
  if (count === 0) {
    Vue.hiddenLoader()
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  Vue.hiddenLoader()
  Vue.showNotFound()
  return Promise.reject(error)
})

// 封装自己的get/post方法
export default {
  get: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios.get(path, {
        params: data
      }).then(function (response) {
        resolve(response.data)
      }).catch(function (error) {
        reject(error)
      })
    })
  },
  post: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios.post(path, data).then(function (response) {
        resolve(response.data)
      }).catch(function (error) {
        reject(error)
      })
    })
  },
  all: function (list) {
    return new Promise(function (resolve, reject) {
      axios.all(list)
        .then(axios.spread(function (...result) {
          resolve(result)
        }))
        .catch(function (err) {
          reject(err)
        })
    })
  }
}
