import Vue from 'vue';
import Vuex from 'vuex';
import home from './home/index';
import movie from './movie/index';
import start from './start/index';
import member from './member/index';
import login from './login/index';

Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        home,
        movie,
        start,
        member,
        login
    },
});
