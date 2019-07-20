import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
// import './registerServiceWorker'; //在后台运行的一个线程，离线缓存pwa时使用

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  //验证是否登录
  if (to.path !== '/login' && !localStorage.token) {
    return next({path: '/login'})
  }
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');


