import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BlogView from '@/views/BlogView.vue'
import CategoriesViews from "@/views/CategoriesViews";
import ProfileView from "@/views/ProfileView";
import MarkdownView from "@/views/MarkdownView";
import SettingView from "@/views/SettingView";
import store from "@/store";


const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/LoginView.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/RegisterView.vue')
    },
    {
        path: '/categories',
        name: 'categories',
        component: CategoriesViews
    },
    {
        path: '/markdown',
        name: 'markdown',
        component: MarkdownView
    },
    {
        path: '/setting',
        name: 'setting',
        component: SettingView
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfileView,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/blog/:id',
        name: 'blog',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: BlogView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {top: 0}
        }
    },
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.getAuth) {
            next()
            return
        }
        next('/login')
    } else {
        next()
    }
})

export default router
