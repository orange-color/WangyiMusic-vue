export const getRandom = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.round(Math.random() * (max - min)) + min // 含最大值，含最小值
}
export const formatTime = (time) => {
  // time 单位：s
  // 1.利用总秒数 / 每一天的秒数 = 相差的天数
  let day = Math.floor(time / (60 * 60 * 24))
  day = day >= 10 ? day : '0' + day
  // 2.利用总秒数 / 小时 % 24;
  let hour = Math.floor(time / (60 * 60) % 24)
  hour = hour >= 10 ? hour : '0' + hour
  // 3.利用总秒数 / 分钟 % 60;
  let minute = Math.floor(time / 60 % 60)
  minute = minute >= 10 ? minute : '0' + minute
  // 4.利用总秒数 % 秒数
  let second = Math.floor(time % 60)
  second = second >= 10 ? second : '0' + second
  return {
    day: day,
    hour: hour,
    minute: minute,
    second: second
  }
}
export const setLocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}
export const getLocalStorage = (key) => {
  return JSON.parse(window.localStorage.getItem(key))
}
