<template>
    <div class="registration-form">
      <form>
        <div class="reg-item">
          <label for="reg-nickName"></label>
          <div>
            <span>昵 称</span>
            <input id="reg-nickName" type="text" v-model="nickname" ref="nickName">
            <p class="nickname-tip">格式: 字母和数字混合至少4位</p>
          </div>
        </div>
        <div class="reg-item">
          <label for="reg-phone"></label>
          <div>
            <span>手机号码</span>
            <input id="reg-phone" type="text" v-model="cellphone" ref="inputBox" @input="input">
            <b @click.stop="clearContent('cellphone')">x</b>
            <p class="phone-tip">{{cpCheckMessage}}</p>
          </div>
        </div>
        <div class="reg-item">
          <label for="reg-password"></label>
          <div>
            <span>密 码</span>
            <input id="reg-password" type="password" v-model="password" ref="passwordBox">
            <b @click.stop="clearContent('password')">x</b>
          </div>
        </div>
        <div class="reg-item">
          <label for="reg-verificationCode"></label>
          <div>
            <span>验证码</span>
            <input id="reg-verificationCode" v-model="captcha" type="text" ref="verificationCode">
            <button @click.stop.prevent="sendVerificationCode" :class="{'active':isCellphoneCanuse}">{{sendBtn}}</button>
          </div>
        </div>
        <div class="reg-item reg-submit">
          <label for="reg-submit"></label>
          <div>
            <input id="reg-submit" type="submit" value="提 交" @click.stop.prevent="submit">
          </div>
        </div>
        <div class="reg-switch">
          <span>已注册账号，</span>
          <router-link ref="switchLogin" tag="a" to="/login">登录</router-link>
        </div>
      </form>
    </div>
</template>

<script>
import { getVerificationCode, isCellphoneExistence, setRegistration } from '../../api/index'
import { mapActions } from 'vuex'
export default {
  name: 'regBottom',
  data: () => {
    return {
      nickname: '',
      cellphone: '',
      password: '',
      captcha: '',
      wrongCellphone: '手机号码错误',
      cellphoneExistence: '手机号码已注册',
      cpCheckMessage: '',
      isCellphoneCanuse: false,
      sendBtn: '发送',
      countTime: 30
    }
  },
  methods: {
    ...mapActions([
      'setIsShowError',
      'setErrorMessage'
    ]),
    clearContent (item) {
      this[item] = ''
      if (item === 'cellphone') {
        this.cpCheckMessage = ''
        this.isCellphoneCanuse = false
      }
    },
    sendVerificationCode () {
      if (this.isCellphoneCanuse) {
        const time1 = new Date().getTime()
        this.isCellphoneCanuse = false
        getVerificationCode(this.cellphone).then(() => {
          // 已发送
          this.sendBtn = this.countTime + ' s'
          const timerId = setInterval(() => {
            const time2 = new Date().getTime()
            const time = this.countTime - Math.floor((time2 - time1) / 1000)
            if (time < 0) {
              this.sendBtn = '发送'
              this.isCellphoneCanuse = true
              clearInterval(timerId)
            } else {
              this.sendBtn = time + ' s'
            }
          }, 1000)
        }).catch(err => {
          this.checkError(err.response.data.message)
        })
      }
    },
    input () {
      const phoneNum = this.cellphone
      if (!phoneNum) return
      if (/^1\d{10}$/.test(phoneNum)) {
        isCellphoneExistence(phoneNum).then((data) => {
          if (data.exist === 1) {
            // 存在
            this.cpCheckMessage = this.cellphoneExistence
          } else if (data.exist === -1) {
            // 不存在
            this.cpCheckMessage = ''
          }
          this.isCellphoneCanuse = true
        }).catch((err) => {
          console.log(err)
        })
      } else {
        this.isCellphoneCanuse = false
        this.cpCheckMessage = this.wrongCellphone
      }
      this.cpCheckMessage = ''
    },
    submit () {
      if (!this.nickname || !this.password || !this.captcha) {
        this.checkError('请完善资料！')
        return
      }
      setRegistration({
        phone: this.cellphone,
        password: this.password,
        captcha: this.captcha,
        nickname: this.nickname
      }).then(() => {
        this.checkError('注册成功！')
        window.history.back()
      }).catch((err) => {
        this.checkError(err.response.data.message)
      })
    },
    // 校验失败信息显示
    checkError (message) {
      this.setErrorMessage(message)
      this.setIsShowError(true)
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/css/mixin';
  @import '../../assets/css/variable';
  .registration-form {
    position: relative;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    @include bg_sub_color;
    form {
      width: 100%;
      height: 100%;
      padding: 150px 60px;
      box-sizing: border-box;
      .reg-item {
        position: relative;
        width: 100%;
        margin-bottom: 80px;
        &>div{
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            @include font_size($font_medium);
            @include font_color;
            white-space: nowrap;
          }
          input {
            flex: 1 1 auto;
            width: 400px;
            margin-left: 20px;
            padding: 20px 100px 20px 20px;
            outline: none;
            @include font_size($font_medium_s);
            border: 1px solid #cccccc;
            box-sizing: border-box;
          }
          b {
            display: block;
            width: 100px;
            margin-left: -100px;
            text-align: center;
            font-size: 50Px;
            color: #cccccc;
          }
          button{
            position: absolute;
            right: 0;
            top: 0;
            width: 110px;
            height: 100%;
            border: none;
            outline: none;
            background: grey;
            text-align: center;
            @include font_size($font_small);
            color: #ffffff;
            &.active{
              @include bg_color;
            }
          }
          .phone-tip{
            position: absolute;
            left: 155px;
            bottom: -40px;
            @include font_size($font_small);
            color: red;
          }
          .nickname-tip{
            position: absolute;
            left: 100px;
            bottom: -40px;
            @include font_size($font_small);
            @include font_color;
            opacity: 0.6;
          }
        }
        &.reg-submit{
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
      .reg-switch {
        width: 100%;
        margin-top: 100px;
        text-align: center;
        span {
          @include font_size($font_medium_s);
          @include font_color;
        }
        a{
          @include font_size($font_medium_s);
          &:link{
            color: blue;
          }
          &:visited{
            color: blue;
          }
        }
      }
    }
  }
</style>
