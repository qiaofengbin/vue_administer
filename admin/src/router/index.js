import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/',
            name: 'HelloWorld',
            meta: {
                title: '首页'
            },
            component: () =>
                import ('../components/HelloWorld'),
            redirect: '/home'
        },
        {
            path: '/login',
            name: 'Login',
            meta: {
                title: '登陆'
            },
            component: () =>
                import ('../views/login')
        },
        {
            path: '/home',
            name: 'Home',
            meta: {
                title: '首页',
                isMenu: true
            },
            component: () =>
                import ('../views/home')
        },
        {
            path: '/product',
            meta: {
                title: '商品管理',
                isMenu: true
            },
            redirect: '/product/list',
            component: () =>
                import ('../views/product'),
            children: [{
                    path: 'list',
                    name: 'ProductList',
                    meta: {
                        title: '商品列表',
                        isMenu: true
                    },
                    component: () =>
                        import ('../views/product/list')
                },
                {
                    path: 'add',
                    name: 'ProductAdd',
                    meta: {
                        title: '商品添加',
                        isMenu: true
                    },
                    component: () =>
                        import ('../views/product/add')
                },
                {
                    path: 'group',
                    name: 'ProductGroup',
                    meta: {
                        title: '分组管理',
                        isMenu: true
                    },
                    component: () =>
                        import ('../views/product/group')
                },
            ]
        },

    ]
})

router.beforeEach(async(to, from, next) => {
    if (to.name == 'Login') {
        return next()
    }
    const isLogin = await new Promise((resolve, reject) => {
        if (document.cookie.indexOf('token') != -1) {
            resolve(true)
        } else {
            resolve(false)
        }
    })
    if (isLogin) {
        store.commit('User/SET_LOGIN_STATUS', true)
        next()
    } else {
        store.commit('User/SET_LOGIN_STATUS', false)
        next('/login')
    }
})


router.afterEach((to, from) => {
    document.title = to.meta.title
})

export default router