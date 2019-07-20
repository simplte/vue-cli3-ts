import { State } from '@@/MM';
import { ActionTree, MutationTree,Commit } from 'vuex';
import { getMemberList } from '@/api/member';

const state: State = {
    memberList: []
};

const getters = {
    memberList: (state: State) => state.memberList
};

const mutations:MutationTree<State> = {
};

const actions :ActionTree<State, any>= {
    async memberList(context :{ commit:Commit , state: State }, cate: string) {
        const res: any = await getMemberList(cate)
                            .then( (response: any ) => response)
                            .catch((e: string) => console.error(e));
        return res;
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
