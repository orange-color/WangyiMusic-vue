// 添加cookie
export const addCookie = (key, value, day, path, domain) => {
  // 1、处理默认保存路径
  var index = window.location.pathname.lastIndexOf('/')
  var currentPath = window.location.pathname.slice(0, index)
  path = path || currentPath
  // 2、处理默认保存域名
  domain = domain || document.domain
  // 3、处理默认过期时间
  if (!day) {
    document.cookie = key + '=' + value + ';path=' + path + ';domain=' + domain + ';'
  } else {
    var date = new Date()
    date.setDate(date.getDate() + day)
    document.cookie = key + '=' + value + ';expires=' + date.toGMTString() + ';path=' + path + ';domain=' + domain + ';'
  }
}
// 获取cookie
export const getCookie = (key) => {
  if (!key) {
    return document.cookie
  } else {
    const res = document.cookie.split(';')
    for (let i = 0; i < res.length; i++) {
      const temp = res[i].split('=')
      if (temp[0].trim() === key) {
        return temp[1]
      }
    }
    return ''
  }
}
// 默认情况下只能删除默认路径中保存的cookie，若想删除指定路径保存的cookie，那么必须在删除的时候指定路径才可以
// 删除cookie
export const delCookie = (key, path) => {
  addCookie(key, getCookie(key), -1, path)
}
