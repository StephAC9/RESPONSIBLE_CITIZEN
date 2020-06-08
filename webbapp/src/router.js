import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import User from './views/User.vue'
import Dashboard from './views/Dashboard.vue'
import Dataview from './views/Dataview.vue'
import store from './store'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: () =>
                import ('./views/About.vue')
        },
        {
            path: '/user/:option',
            name: 'user',
            component: User
        },
        {
            path: '/dashboard/:name',
            name: 'dashboard',
            meta: { requiresAuth: true },
            component: Dashboard
        },
        {
            path: '/data-view',
            name: 'dataview',
            meta: { requiresAuth: true },
            component: Dataview
        },
    ],
})
router.beforeEach((to, from, next) => {
    let isAuth = store.state.success_login
    console.log('isAuth: ' + isAuth)
    if (to.matched.some(route => route.meta.requiresAuth)) {
        if (isAuth) {
            next()
        } else router.replace({ name: 'user', params: { option: 'authority' } })

    } else next()

    if (to.matched.some(route => !route.meta.requiresAuth) && from.matched.some(route => route.meta.requiresAuth)) {
        router.push('/home')
    }
})

export default router