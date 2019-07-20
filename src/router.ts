import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import MovieDetail from './views/MovieDetail.vue';
import StartDetail from './views/StartDetail.vue';
import SmallComment from './views/SmallComment.vue';
import login from './views/login.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      name: 'home',
      component: Home,
      meta: {
        title: '首页',
      },
    },
    {
      path: '/movieDetail/:id',
      name: 'movieDetail',
      component: MovieDetail,
      meta: {
        title: '电影详情',
      },
    },
    {
      path: '/startDetail/:id',
      name: 'startDetail',
      component: StartDetail,
      meta: {
        title: '明星详情',
      },
    },
    {
      path: '/smallComment/:id',
      name: 'smallComment',
      component: SmallComment,
      meta: {
        title: '评论',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        title: '用户登录',
      },
    },
  ],
});
