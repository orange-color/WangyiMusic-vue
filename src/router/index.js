import Vue from 'vue'
import VueRouter from 'vue-router'

// 通过 impoart xxx from xxx 的方式加载组件，无论组件有没有用到都会加载进来
// 按需加载
const Recommend = (resolve) => {
  import('../views/Recommend').then((module) => {
    resolve(module)
  })
}
const Singer = (resolve) => {
  import('../views/Singer').then((module) => {
    resolve(module)
  })
}
const Rank = (resolve) => {
  import('../views/Rank').then((module) => {
    resolve(module)
  })
}
const Search = (resolve) => {
  import('../views/Search').then((module) => {
    resolve(module)
  })
}
const Detail = (resolve) => {
  import('../views/Detail').then((module) => {
    resolve(module)
  })
}
const Account = (resolve) => {
  import('../views/Account').then((module) => {
    resolve(module)
  })
}
const Login = (resolve) => {
  import('../views/Login').then((module) => {
    resolve(module)
  })
}
const Registration = (resolve) => {
  import('../views/Registration').then((module) => {
    resolve(module)
  })
}
const FoundPW = (resolve) => {
  import('../views/FoundPW').then((module) => {
    resolve(module)
  })
}
const Home = (resolve) => {
  import('../views/Home').then((module) => {
    resolve(module)
  })
}
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/registration',
    component: Registration
  },
  {
    path: '/foundpassword',
    component: FoundPW
  },
  {
    path: '/home',
    component: Home,
    children: [
      { path: '/home', redirect: '/home/recommend' },
      {
        path: 'recommend',
        component: Recommend,
        children: [
          { path: 'detail/:id/:type', component: Detail }
        ]
      },
      {
        path: 'singer',
        component: Singer,
        children: [
          { path: 'detail/:id/:type', component: Detail }
        ]
      },
      {
        path: 'rank',
        component: Rank,
        children: [
          { path: 'detail/:id/:type', component: Detail }
        ]
      },
      { path: 'search', component: Search },
      { path: 'account', component: Account }
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
