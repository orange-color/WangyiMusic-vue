(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-734abe58"],{"0418":function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"header",on:{click:function(e){return e.stopPropagation(),t.bgColor(e)}}},[s("div",{staticClass:"left"},[t._t("left")],2),s("div",{staticClass:"center"},[t._t("center")],2),s("div",{staticClass:"right"},[t._t("right")],2)])},a=[],n={name:"Header",data:function(){return{index:0,theme:["theme","theme1","theme2"]}},methods:{bgColor:function(){this.index++,this.index>=this.theme.length&&(this.index=0),document.documentElement.setAttribute("data-theme",this.theme[this.index])}}},r=n,l=(s("f8aa"),s("2877")),o=Object(l["a"])(r,i,a,!1,null,"3b91bf94",null);e["a"]=o.exports},"0d03":function(t,e,s){var i=s("6eeb"),a=Date.prototype,n="Invalid Date",r="toString",l=a[r],o=a.getTime;new Date(NaN)+""!=n&&i(a,r,(function(){var t=o.call(this);return t===t?l.call(this):n}))},2423:function(t,e,s){},7109:function(t,e,s){"use strict";var i=s("778b"),a=s.n(i);a.a},7372:function(t,e,s){"use strict";var i=s("2423"),a=s.n(i);a.a},"778b":function(t,e,s){},"935a":function(t,e,s){"use strict";var i=s("abbe"),a=s.n(i);a.a},a633:function(t,e,s){"use strict";var i=s("e736"),a=s.n(i);a.a},abbe:function(t,e,s){},afd2:function(t,e,s){},c84b:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{directives:[{name:"show",rawName:"v-show",value:void 0!==t.playlist.coverImgUrl,expression:"playlist.coverImgUrl !== undefined"}],staticClass:"detail"},[s("DetailHeader",{ref:"header",attrs:{title:t.playlist.name}}),s("DetailBanner",{ref:"banner",attrs:{path:t.playlist.coverImgUrl}}),s("div",{directives:[{name:"show",rawName:"v-show",value:void 0!==t.playlist.tracks,expression:"playlist.tracks !== undefined"}],ref:"bottom",staticClass:"bottom"},[s("ScrollView",{ref:"scrollView",attrs:{probeType:t.probeType}},[s("DetailBottom",{ref:"detailBottom",attrs:{playlist:t.playlist.tracks}})],1)],1)],1)},a=[],n=(s("0d03"),s("b0c0"),s("4795"),s("5530")),r=s("365c"),l=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("Header",[s("div",{staticClass:"header-left",attrs:{slot:"left"},on:{click:function(e){return e.stopPropagation(),t.back()}},slot:"left"}),s("p",{staticClass:"header-title",attrs:{slot:"center"},slot:"center"},[t._v(t._s(t.title))]),s("div",{staticClass:"header-right",attrs:{slot:"right"},slot:"right"})])},o=[],c=s("0418"),u=s("2f62"),f={name:"SubHeader",components:{Header:c["a"]},methods:Object(n["a"])(Object(n["a"])({},Object(u["b"])(["setSongsInit"])),{},{back:function(){this.setSongsInit(!1),window.history.back()}}),props:{title:{type:String,default:"",require:!0}}},d=f,h=(s("a633"),s("2877")),m=Object(h["a"])(d,l,o,!1,null,"283f5022",null),p=m.exports,b=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"detail-top"},[s("div",{staticClass:"img-container"},[s("img",{attrs:{src:t.path,alt:""}}),s("div",{ref:"mask",staticClass:"mask"})])])},v=[],g={name:"DetailBanner",props:{path:{type:String,default:"",require:!0}},methods:{changeMask:function(t){this.$refs.mask.style.opacity=t}}},y=g,C=(s("935a"),Object(h["a"])(y,b,v,!1,null,"40e8ae05",null)),I=C.exports,w=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"detail-bottom"},[s("ul",[s("li",{staticClass:"bottom-top",on:{click:function(e){return e.stopPropagation(),t.selectAllMusic(e)}}},[s("div",{staticClass:"bottom-icon",class:{active:t.isPlaying}}),s("div",{staticClass:"bottom-title"},[t._v("播放全部")])]),t._l(t.playlist,(function(e,i){return s("li",{key:e.id,staticClass:"bottom-item",on:{click:function(e){return e.stopPropagation(),t.selectMusic(i)}}},[s("div",{staticClass:"item-left"},[s("h3",[t._v(t._s(e.name))]),s("p",[t._v(t._s(e.al.name)+" - "+t._s(e.ar[0].name))])]),s("div",{staticClass:"item-right"})])}))],2),s("div",{ref:"oPlayAll2",staticClass:"bottom-top2",on:{click:function(e){return e.stopPropagation(),t.selectAllMusic(e)}}},[s("div",{staticClass:"bottom-icon",class:{active:t.isPlaying}}),s("div",{staticClass:"bottom-title"},[t._v("播放全部")])])])},S=[],k=(s("d81d"),{name:"DetailBottom",props:{playlist:{type:Array,default:function(){return[]},require:!0}},data:function(){return{playAllHeight:0}},methods:Object(n["a"])(Object(n["a"])({},Object(u["b"])(["setFullScreen","setMiniPlayer","getSongDetail","setCurrentIndex","setIsPlaying","setSongsInit"])),{},{selectMusic:function(t){this.isShowMiniPlayer||this.setFullScreen(!0),this.isSongsInit?this.setCurrentIndex(t):this.songsInit(t),this.isPlaying||this.setIsPlaying(!0)},selectAllMusic:function(){this.setFullScreen(!0),this.isSongsInit?this.setCurrentIndex(0):this.songsInit(0),this.isPlaying||this.setIsPlaying(!0)},songsInit:function(t){var e=this.playlist.map((function(t){return t.id}));this.getSongDetail({ids:[e],index:t}),this.setSongsInit(!0)}}),computed:Object(n["a"])({},Object(u["c"])(["isPlaying","isSongsInit","isShowMiniPlayer"]))}),_=k,$=(s("7372"),Object(h["a"])(_,w,S,!1,null,"29d147f6",null)),j=$.exports,O=s("9b91"),D={name:"Detail",data:function(){return{playlist:{},headerHeight:0,currentY:0,probeType:3}},components:{DetailHeader:p,DetailBanner:I,DetailBottom:j,ScrollView:O["a"]},created:function(){var t=this,e=this.$route.params.type;"personalized"===e||"rank"===e?Object(r["i"])({id:this.$route.params.id}).then((function(e){t.playlist=e.playlist}))["catch"]((function(t){console.log(t)})):"albums"===e?Object(r["a"])({id:this.$route.params.id}).then((function(e){t.playlist={name:e.album.name,coverImgUrl:e.album.picUrl,tracks:e.songs}}))["catch"]((function(t){console.log(t)})):"singer"===e&&Object(r["l"])({id:this.$route.params.id}).then((function(e){t.playlist={name:e.artist.name,coverImgUrl:e.artist.picUrl,tracks:e.hotSongs}}))["catch"]((function(t){console.log(t)}))},mounted:function(){var t=this,e=(new Date).getTime(),s=setInterval((function(){var i=(new Date).getTime();i-e>1e3&&clearInterval(s),t.$refs.bottom.offsetTop&&(t.initDetail(),t.setSongsInit(!1),clearInterval(s))}),200)},computed:Object(n["a"])({},Object(u["c"])(["isFullScreen"])),watch:{isFullScreen:function(t){t&&this.$refs.scrollView.scrollTo(0,this.currentY)}},methods:Object(n["a"])(Object(n["a"])({},Object(u["b"])(["setSongsInit"])),{},{initDetail:function(){var t=this,e=this.$refs.banner.$el,s=this.$refs.header.$el.offsetHeight-this.$refs.bottom.offsetTop,i=e.offsetHeight,a=this.$refs.detailBottom.$el.children[1];this.$refs.scrollView.scrolling((function(n){if(t.currentY=n,n>=0){var r=1+n/i;e.style.transform="scale(".concat(r,")")}else{e.style.transform="translateY(".concat(n/2,"px)");var l=Math.abs(n)/i;l<=1&&t.$refs.banner.changeMask(l),n<=s?(a.classList.add("active"),a.style.transform="translateY(".concat(s-n,"px)")):a.classList.remove("active")}}))}}),beforeDestroy:function(){this.$refs.scrollView.destroy()}},x=D,P=(s("7109"),Object(h["a"])(x,i,a,!1,null,"9f86d28c",null));e["default"]=P.exports},d81d:function(t,e,s){"use strict";var i=s("23e7"),a=s("b727").map,n=s("1dde"),r=s("ae40"),l=n("map"),o=r("map");i({target:"Array",proto:!0,forced:!l||!o},{map:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}})},e736:function(t,e,s){},f8aa:function(t,e,s){"use strict";var i=s("afd2"),a=s.n(i);a.a}}]);
//# sourceMappingURL=chunk-734abe58.ef60f1ea.js.map