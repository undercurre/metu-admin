import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import moduleRouters from './module';

const routes: Array<RouteRecordRaw> = [
    {
        name: 'login',
        path: '/login',
        meta: {
            title: '登录',
        },
        component: () => import('@/view/login/index.vue'),
    },
    {
        path: '/',
        name: 'Index',
        meta: {
            title: '首页',
            keepAlive: true,
            requireAuth: true,
        },
        component: () => import('@/view/home/index.vue'),
        children: moduleRouters,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (!localStorage.getItem('token')) {
        // 如果没有
        if (to.name == 'login') {
            // 判断是否要去登陆界面如果是则放行
            next();
        } else {
            // 否则直接跳转登录界面
            router.push('login');
        }
    } else {
        // 如果有则放行
        next();
    }
});

export default router;
