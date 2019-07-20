
import { LoginState , DataOptions} from '@@/login.interface'
import { GetterTree, MutationTree, ActionTree, Commit } from 'vuex';
import * as LoginApi from '@/api/login'

const state: LoginState = {
  code: 1,
  data:"",
  message:"",
  success:false,
  token:"string"
  }

// 强制使用getter获取state
const getters: GetterTree<LoginState, any> = {
}

// 更改state
const mutations: MutationTree<LoginState> = {
  
}

const actions: ActionTree<LoginState, any> = {
    UPDATE_STATE_ASYN(context :{ commit:Commit , state: LoginState }, data: LoginState) {
      context.commit('UPDATE_STATE', data)
    },
    async GET_DATA_ASYN(context:{ commit:Commit, state: LoginState }, data: DataOptions) {
      console.log(data)
      const res: LoginState = await LoginApi.getData(data)
      .then( (response: any ) => response)
      .catch((e: string) => console.error(e));
      return res;
    }
  }

export default {
    state,
    getters,
    mutations,
    actions,
};

