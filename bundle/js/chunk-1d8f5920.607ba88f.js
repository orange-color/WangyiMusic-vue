(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1d8f5920"],{"129f":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},2532:function(t,e,i){"use strict";var s=i("23e7"),r=i("5a34"),n=i("1d80"),c=i("ab13");s({target:"String",proto:!0,forced:!c("includes")},{includes:function(t){return!!~String(n(this)).indexOf(r(t),arguments.length>1?arguments[1]:void 0)}})},"2d3b":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"search",on:{click:function(e){return e.stopPropagation(),t.blur(e)}}},[i("div",{staticClass:"search-box"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.keywords,expression:"keywords"},{name:"throttle",rawName:"v-throttle",value:t.search,expression:"search"}],ref:"inputBox",attrs:{type:"text",placeholder:"搜索歌曲、歌手、专辑"},domProps:{value:t.keywords},on:{click:function(e){return e.stopPropagation(),t.focus(e)},input:function(e){e.target.composing||(t.keywords=e.target.value)}}}),i("img",{attrs:{src:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==",alt:""}})]),i("div",{staticClass:"search-info"},[i("ScrollView",{ref:"infoScrollVue"},[i("div",[i("div",{staticClass:"search-hot"},[i("h3",[t._v("热门搜索")]),i("ul",t._l(t.hots,(function(e,s){return i("li",{key:s,on:{click:function(i){return i.stopPropagation(),t.selectedHot(e.first)}}},[t._v(t._s(e.first))])})),0)]),i("div",{staticClass:"search-history"},[i("ul",t._l(t.searchHistory,(function(e,s){return i("li",{key:s,on:{click:function(i){return i.stopPropagation(),t.selectedHot(e)}}},[i("div",[i("img",{attrs:{src:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljYWNhIiBkPSJNMTUgMzBDNi43MTYgMzAgMCAyMy4yODQgMCAxNVM2LjcxNiAwIDE1IDBzMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTVtMC0yOEM3LjgyIDIgMiA3LjgyIDIgMTVzNS44MiAxMyAxMyAxMyAxMy01LjgyIDEzLTEzUzIyLjE4IDIgMTUgMm03IDE2aC04YTEgMSAwIDAgMS0xLTFWN2ExIDEgMCAxIDEgMiAwdjloN2ExIDEgMCAxIDEgMCAyIi8+PC9zdmc+",alt:""}}),i("p",[t._v(t._s(e))])]),i("img",{attrs:{src:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4=",alt:""},on:{click:function(e){return e.stopPropagation(),t.delHistory(s)}}})])})),0)])])])],1),i("div",{directives:[{name:"show",rawName:"v-show",value:""!==t.keywords,expression:"keywords !== ''"}],staticClass:"search-suggest"},[i("ScrollView",{ref:"suggestScrollVue"},[i("ul",t._l(t.list,(function(e){return i("li",{key:e.id,on:{click:function(i){return i.stopPropagation(),t.selectMusic(e.id)}}},[i("img",{attrs:{src:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==",alt:""}}),i("p",[t._v(t._s(e.name)+" - "+t._s(e.artists[0].name))])])})),0)])],1)])},r=[],n=(i("caad"),i("a434"),i("ac1f"),i("2532"),i("841c"),i("4795"),i("5530")),c=i("9b91"),o=i("365c"),a=i("2f62"),M=i("0210"),u={name:"Search",components:{ScrollView:c["a"]},data:function(){return{keywords:"",list:[],hots:[],searchHistory:[],windowViewY:0}},computed:Object(n["a"])({},Object(a["c"])(["songs"])),methods:Object(n["a"])(Object(n["a"])({},Object(a["b"])(["setFullScreen","setMiniPlayer","getSongDetail","setCurrentIndex"])),{},{search:function(){var t=this;""!==this.keywords&&Object(o["i"])(this.keywords).then((function(e){t.list=e.result.songs}))["catch"]((function(t){console.log(t)}))},selectMusic:function(t){this.$refs.inputBox.blur(),this.setFullScreen(!0),this.getSongDetail({ids:[t],index:0}),0===this.searchHistory.length?(this.searchHistory.push(this.keywords),Object(M["d"])("searchHistory",this.searchHistory)):this.searchHistory.includes(this.keywords)||(this.searchHistory.push(this.keywords),Object(M["d"])("searchHistory",this.searchHistory)),this.keywords=""},selectedHot:function(t){this.keywords=t,this.search()},delHistory:function(t){this.searchHistory.splice(t,1),Object(M["d"])("searchHistory",this.searchHistory)},focus:function(){this.$refs.inputBox.focus()},blur:function(){this.$refs.inputBox.blur()}}),directives:{throttle:{inserted:function(t,e){var i=null,s=!0;t.addEventListener("input",(function(){s&&(i&&clearTimeout(i),i=setTimeout((function(){s=!0,e.value()}),500))}))}}},created:function(){var t=this;Object(o["h"])().then((function(e){t.hots=e.result.hots}))["catch"]((function(t){console.log(t)})),Object(M["b"])("searchHistory")&&(this.searchHistory=Object(M["b"])("searchHistory"))},mounted:function(){var t=this;/Android/i.test(navigator.userAgent)&&(this.windowViewY=document.body.offsetHeight,window.onresize=function(){window.innerHeight<t.windowViewY?t.setMiniPlayer(!1):t.setMiniPlayer(0!==t.songs.length)}),this.$refs.suggestScrollVue.scrollStart((function(){t.blur()})),this.$refs.infoScrollVue.scrollStart((function(){t.blur()}))}},l=u,g=(i("d41d"),i("2877")),d=Object(g["a"])(l,s,r,!1,null,"12e9f0b8",null);e["default"]=d.exports},"5a34":function(t,e,i){var s=i("44e7");t.exports=function(t){if(s(t))throw TypeError("The method doesn't accept regular expressions");return t}},7579:function(t,e,i){},"841c":function(t,e,i){"use strict";var s=i("d784"),r=i("825a"),n=i("1d80"),c=i("129f"),o=i("14c3");s("search",1,(function(t,e,i){return[function(e){var i=n(this),s=void 0==e?void 0:e[t];return void 0!==s?s.call(e,i):new RegExp(e)[t](String(i))},function(t){var s=i(e,t,this);if(s.done)return s.value;var n=r(t),a=String(this),M=n.lastIndex;c(M,0)||(n.lastIndex=0);var u=o(n,a);return c(n.lastIndex,M)||(n.lastIndex=M),null===u?-1:u.index}]}))},ab13:function(t,e,i){var s=i("b622"),r=s("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(i){try{return e[r]=!1,"/./"[t](e)}catch(s){}}return!1}},caad:function(t,e,i){"use strict";var s=i("23e7"),r=i("4d64").includes,n=i("44d2"),c=i("ae40"),o=c("indexOf",{ACCESSORS:!0,1:0});s({target:"Array",proto:!0,forced:!o},{includes:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),n("includes")},d41d:function(t,e,i){"use strict";var s=i("7579"),r=i.n(s);r.a}}]);
//# sourceMappingURL=chunk-1d8f5920.607ba88f.js.map