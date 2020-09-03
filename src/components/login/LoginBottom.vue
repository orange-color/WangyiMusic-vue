<template>
  <div class="login-bottom">
    <form id="login-form">
      <div class="login-item">
        <label for="login-account"></label>
        <div>
          <span>账 号</span>
          <input id="login-account" type="text" v-model="account" ref="inputBox">
          <b @click.stop="clearContent('account')">x</b>
        </div>
      </div>
      <div class="login-item">
        <label for="login-password"></label>
        <div>
          <span>密 码</span>
          <input id="login-password" type="password" v-model="password" ref="passwordBox">
          <b @click.stop="clearContent('password')">x</b>
          <p v-show="count !== 5">还有{{count}}次验证机会</p>
        </div>
      </div>
      <div class="login-item login-remember">
        <label for="login-remember"></label>
        <div>
          <span>记住密码</span>
          <input id="login-remember" type="checkbox" value="true" ref="loginRemember" @click.stop="isRemember()">
          <p class="remember-tip" ref="rememberTip">请在信任的场所勾选此选项</p>
        </div>
      </div>
      <div class="login-item login-submit">
        <label for="login-submit"></label>
        <div>
          <input id="login-submit" type="submit" value="登 录" @click.stop.prevent="submit">
        </div>
      </div>
      <div class="login-switch">
        <router-link tag="span" to="/foundpassword">忘记密码</router-link>
        <span>|</span>
        <router-link tag="span" to="/registration">注册账号</router-link>
        <span>|</span>
        <router-link tag="span" to="/home">游客登录</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { getPhoneLogin } from '../../api/index'
import { getNewTime } from '../../tools/tools'
import { addCookie, getCookie, delCookie } from '../../tools/cookie'
import { mapActions } from 'vuex'
import MD5 from 'md5'
export default {
  name: 'LoginBottom',
  data () {
    return {
      /*
      * @params
      * count: 容错次数
      * countTime: 倒计时时长
      * isNoCount: 容错次数是否为0
      * */
      account: '手机号',
      password: '',
      EmptyMessage: '请输入账号和密码',
      WrongMessage: '请输入正确的手机号',
      CountMessage: '密码或账号错误，请60s后再尝试',
      countTime: 60,
      loginState: null,
      count: 5,
      isNoCount: false
    }
  },
  methods: {
    ...mapActions([
      'setErrorMessage',
      'setIsShowError'
    ]),
    // 清空输入框内容
    clearContent (item) {
      this[item] = ''
    },
    // 是否记住密码
    isRemember () {
      if (this.$refs.loginRemember.checked) {
        this.$refs.rememberTip.classList.add('active')
      } else {
        this.$refs.rememberTip.classList.remove('active')
      }
    },
    // 校验失败信息显示
    checkError (message) {
      this.setErrorMessage(message)
      this.setIsShowError(true)
    },
    // 验证信息
    loginCheck (account, password) {
      // 手机格式验证
      if (!/^1[0-9]{10}$/.test(account)) {
        // 账号错误，重新输入
        this.checkError(this.WrongMessage)
        return
      }
      // 登录账号密码验证
      const mima = getCookie(account)
      let md5password
      if (!mima) {
        // 未进行过加密算法
        md5password = MD5(password)
      } else {
        // 已经进行过加密算法
        if (mima !== password) {
          // 用户修改了密码
          md5password = MD5(password)
        } else {
          // 用户未修改密码
          md5password = password
        }
      }
      // 缓存问题解决方法
      const time = getNewTime()
      // 密码校验
      getPhoneLogin(account, md5password, time).then((data) => {
        if (data.code === 200) {
          this.count = 5
          // 记住密码cookie处理
          this.$refs.loginRemember.checked ? addCookie(account, md5password, 24 * 7) : delCookie(account, md5password)
          // 登录首页
          this.$router.push('/home')
        } else {
          // 密码错误
          this.checkError(data.message)
          --this.count
        }
      }).catch(err => {
        // 密码错误超过限制次数
        console.log(err.response)
        this.checkError(err.response.data.message)
      })
    },
    // 提交验证信息
    submit () {
      // 验证失败超次数
      if (this.count === 0) {
        this.checkError(this.CountMessage)
        if (!this.isNoCount) {
          this.isNoCount = true
          const time1 = new Date().getTime()
          const timerId = setInterval(() => {
            const time2 = new Date().getTime()
            const lastTime = Math.floor(this.countTime - (time2 - time1) / 1000)
            if (lastTime === 0) {
              this.setErrorMessage('可尝试登陆验证')
              this.isNoCount = false
              this.count = 5
              clearInterval(timerId)
              return
            }
            this.setErrorMessage(`密码或账号错误，请${lastTime}s后再尝试`)
          }, 1000)
        }
        return
      }
      // 验证未超次数
      const account = this.account.trim()
      const password = this.password
      if (!account || !password) {
        this.checkError(this.EmptyMessage)
        return
      }
      this.loginCheck(account, password)
    }
  },
  mounted () {
    // 初始化页面（若上一次勾选记住密码则显示上一次登录数据）
    if (!getCookie()) return
    const offset = document.cookie.lastIndexOf(';')
    const lastCookie = document.cookie.substr(offset + 1)
    const account = lastCookie.split('=')
    this.account = account[0]
    this.password = account[1]
    this.$refs.loginRemember.checked = 'checked'
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/css/mixin';
  @import '../../assets/css/variable';
  .login-bottom{
    position: relative;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    @include bg_sub_color;
    form{
      width: 100%;
      height: 100%;
      padding: 150px 60px 0;
      box-sizing: border-box;
      .login-item{
        position: relative;
        width: 100%;
        margin-bottom: 120px;
        &>div{
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          span{
            @include font_size($font_large);
            @include font_color;
          }
          input {
            flex: 1 1 auto;
            height: 100%;
            width: 400px;
            margin-left: 20px;
            padding: 20px 100px 20px 20px;
            outline: none;
            @include font_size($font_medium_s);
            border: 1px solid #cccccc;
            box-sizing: border-box;
          }
          b{
            display: block;
            width: 100px;
            margin-left: -100px;
            color: #cccccc;
            text-align: center;
            font-size: 50Px;
          }
          p{
            position: absolute;
            left: 110px;
            bottom: -50px;
            white-space: nowrap;
            @include font_size($font_small);
            color: red;
          }
          .remember-tip{
            position: relative;
            left: 10px;
            top: 0;
            bottom: 0;
            opacity: 0;
            transition: opacity .5s linear;
            &.active{
              opacity: 1;
            }
          }
        }
        &.login-remember{
          display: flex;
          justify-content: flex-start;
          span{
            @include font_size($font_medium_s);
          }
          input{
            width: 30px;
            height: 30px;
          }
        }
        &.login-submit{
          margin-top: 150px;
          input {
            margin-left: 0;
            padding: 20px;
            @include bg_color;
            @include font_size($font_medium);
            color: #ffffff;
            border: none;
            border-radius: 200px;
          }
        }
      }
      .login-switch{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        span{
          display: inline-block;
          padding: 10px;
          @include font_size($font_medium_s);
          @include font_color;
        }
      }
    }
  }
</style>
