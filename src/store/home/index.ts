import { State } from '@@/MM';
import { Commit } from 'vuex';
import { getMovieList } from '@/api/home';

const state: State = {
    movieList: [],
};

const getters = {
    // tslint:disable-next-line:no-shadowed-variable
    // movieList: (state: State) => state.movieList,
};

const mutations = {
};

const actions = {
    async movieList(context: { commit: Commit }, cate: string) {
        const res: any = await getMovieList(cate)
            .then((response: any) => response)
            // tslint:disable-next-line:no-console
            .catch((e: string) => console.error(e));
        return res;
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
