import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../views/pMain.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Main
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
