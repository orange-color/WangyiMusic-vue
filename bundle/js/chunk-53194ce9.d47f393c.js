(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-53194ce9"],{"0418":function(e,t,n){"use strict";var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"header",on:{click:function(t){return t.stopPropagation(),e.bgColor(t)}}},[n("div",{staticClass:"left"},[e._t("left")],2),n("div",{staticClass:"center"},[e._t("center")],2),n("div",{staticClass:"right"},[e._t("right")],2)])},a=[],i={name:"Header",data:function(){return{index:0,theme:["theme","theme1","theme2"]}},methods:{bgColor:function(){this.index++,this.index>=this.theme.length&&(this.index=0),document.documentElement.setAttribute("data-theme",this.theme[this.index])}}},o=i,r=(n("f8aa"),n("2877")),c=Object(r["a"])(o,s,a,!1,null,"3b91bf94",null);t["a"]=c.exports},"0d03":function(e,t,n){var s=n("6eeb"),a=Date.prototype,i="Invalid Date",o="toString",r=a[o],c=a.getTime;new Date(NaN)+""!=i&&s(a,o,(function(){var e=c.call(this);return e===e?r.call(this):i}))},"132e":function(e,t,n){"use strict";var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("Header",[n("div",{staticClass:"header-left",attrs:{slot:"left"},on:{click:function(t){return t.stopPropagation(),e.back(t)}},slot:"left"}),n("div",{staticClass:"header-center",attrs:{slot:"center"},slot:"center"},[e._v("注册 / 修改密码")])])},a=[],i=n("0418"),o={name:"regHeader",components:{Header:i["a"]},methods:{back:function(){window.history.back()}}},r=o,c=(n("3efd"),n("2877")),l=Object(c["a"])(r,s,a,!1,null,"50ce1606",null);t["a"]=l.exports},"30b57":function(e,t,n){},"3efd":function(e,t,n){"use strict";var s=n("30b57"),a=n.n(s);a.a},4795:function(e,t,n){var s=n("23e7"),a=n("da84"),i=n("342f"),o=[].slice,r=/MSIE .\./.test(i),c=function(e){return function(t,n){var s=arguments.length>2,a=s?o.call(arguments,2):void 0;return e(s?function(){("function"==typeof t?t:Function(t)).apply(this,a)}:t,n)}};s({global:!0,bind:!0,forced:r},{setTimeout:c(a.setTimeout),setInterval:c(a.setInterval)})},9062:function(e,t,n){},afd2:function(e,t,n){},f332:function(e,t,n){"use strict";var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"registration-form"},[n("form",[n("div",{staticClass:"reg-item"},[n("label",{attrs:{for:"reg-nickName"}}),n("div",[n("span",[e._v("昵 称")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.nickname,expression:"nickname"}],ref:"nickName",attrs:{id:"reg-nickName",type:"text"},domProps:{value:e.nickname},on:{input:function(t){t.target.composing||(e.nickname=t.target.value)}}}),n("p",{staticClass:"nickname-tip"},[e._v("格式: 字母和数字混合至少4位")])])]),n("div",{staticClass:"reg-item"},[n("label",{attrs:{for:"reg-phone"}}),n("div",[n("span",[e._v("手机号码")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.cellphone,expression:"cellphone"}],ref:"inputBox",attrs:{id:"reg-phone",type:"text"},domProps:{value:e.cellphone},on:{input:[function(t){t.target.composing||(e.cellphone=t.target.value)},e.input]}}),n("b",{on:{click:function(t){return t.stopPropagation(),e.clearContent("cellphone")}}},[e._v("x")]),n("p",{staticClass:"phone-tip"},[e._v(e._s(e.cpCheckMessage))])])]),n("div",{staticClass:"reg-item"},[n("label",{attrs:{for:"reg-password"}}),n("div",[n("span",[e._v("密 码")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],ref:"passwordBox",attrs:{id:"reg-password",type:"password"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}}),n("b",{on:{click:function(t){return t.stopPropagation(),e.clearContent("password")}}},[e._v("x")])])]),n("div",{staticClass:"reg-item"},[n("label",{attrs:{for:"reg-verificationCode"}}),n("div",[n("span",[e._v("验证码")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.captcha,expression:"captcha"}],ref:"verificationCode",attrs:{id:"reg-verificationCode",type:"text"},domProps:{value:e.captcha},on:{input:function(t){t.target.composing||(e.captcha=t.target.value)}}}),n("button",{class:{active:e.isCellphoneCanuse},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.sendVerificationCode(t)}}},[e._v(e._s(e.sendBtn))])])]),n("div",{staticClass:"reg-item reg-submit"},[n("label",{attrs:{for:"reg-submit"}}),n("div",[n("input",{attrs:{id:"reg-submit",type:"submit",value:"提 交"},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.submit(t)}}})])]),n("div",{staticClass:"reg-switch"},[n("span",[e._v("已注册账号，")]),n("router-link",{ref:"switchLogin",attrs:{tag:"a",to:"/login"}},[e._v("登录")])],1)])])},a=[],i=(n("0d03"),n("4795"),n("5530")),o=n("365c"),r=n("2f62"),c={name:"regBottom",data:function(){return{nickname:"",cellphone:"",password:"",captcha:"",wrongCellphone:"手机号码错误",cellphoneExistence:"手机号码已注册",cpCheckMessage:"",isCellphoneCanuse:!1,sendBtn:"发送",countTime:30}},methods:Object(i["a"])(Object(i["a"])({},Object(r["b"])(["setIsShowError","setErrorMessage"])),{},{clearContent:function(e){this[e]="","cellphone"===e&&(this.cpCheckMessage="",this.isCellphoneCanuse=!1)},sendVerificationCode:function(){var e=this;if(this.isCellphoneCanuse){var t=(new Date).getTime();this.isCellphoneCanuse=!1,Object(o["p"])(this.cellphone,(new Date).getTime()).then((function(){e.sendBtn=e.countTime+" s";var n=setInterval((function(){var s=(new Date).getTime(),a=e.countTime-Math.floor((s-t)/1e3);a<0?(e.sendBtn="发送",e.isCellphoneCanuse=!0,clearInterval(n)):e.sendBtn=a+" s"}),1e3)}))["catch"]((function(t){e.checkError(t.response.data.message)}))}},input:function(){var e=this,t=this.cellphone;t&&(/^1\d{10}$/.test(t)?Object(o["q"])(t).then((function(t){1===t.exist?e.cpCheckMessage=e.cellphoneExistence:-1===t.exist&&(e.cpCheckMessage=""),e.isCellphoneCanuse=!0}))["catch"]((function(e){console.log(e)})):(this.isCellphoneCanuse=!1,this.cpCheckMessage=this.wrongCellphone),this.cpCheckMessage="")},submit:function(){var e=this;this.nickname&&this.password&&this.captcha?Object(o["r"])({phone:this.cellphone,password:this.password,captcha:this.captcha,nickname:this.nickname}).then((function(){e.checkError("注册成功！"),window.history.back()}))["catch"]((function(t){e.checkError(t.response.data.message)})):this.checkError("请完善资料！")},checkError:function(e){this.setErrorMessage(e),this.setIsShowError(!0)}})},l=c,u=(n("f5fb"),n("2877")),p=Object(u["a"])(l,s,a,!1,null,"9b128dca",null);t["a"]=p.exports},f5fb:function(e,t,n){"use strict";var s=n("9062"),a=n.n(s);a.a},f8aa:function(e,t,n){"use strict";var s=n("afd2"),a=n.n(s);a.a}}]);
//# sourceMappingURL=chunk-53194ce9.d47f393c.js.map