/*
 * @Description: 页面快速生成脚本（送给自己的六一儿童节礼物）
 * @Date: 2018-6-01 10:28:08
 */
const fs = require('fs');
const path = require('path');
const basePath = path.resolve(__dirname,'../src'); //当前项目地址加项目中src文件拼成的地址D:\exitMongoDb\project\movie-ts-vue-bqc\vue-ts-moive\src
const interfacePath = path.resolve(__dirname,'../interfaces'); //当前项目地址加项目中src文件拼成的地址D:\exitMongoDb\project\movie-ts-vue-bqc\vue-ts-moive\src
console.log(basePath);
const dirName = process.argv[2];
if(!dirName) {
    console.log('文件夹名称不能为空！')
    console.log('请输入：npm run tep ${文件名称}');
    process.exit(0);
}
const capPirName = dirName.substring(0, 1).toUpperCase() + dirName.substring(1);
console.log(capPirName)

/**
 * vue页面的魔伴
 * 
 */
const VueTep = `
    <template >
        <div class="${dirName}-wrap">
            {{data.pageName}}
        </div>
    </template>

    <script lang="ts" >
    import { Component, Vue, Watch } from "vue-property-decorator";
    import { Action, Mutation, State } from "vuex-class";
    import {  } from "vant";
    // import {  } from "@/components" // 组件

    @Component({
    components: {}
    })
    export default class ${dirName} extends Vue {
        // Getter
        // @Getter 

        // Action
        // @Action GET_DATA_ASYN

        // data

        // Watch
        // @Watch

        // created
        private created() {

        }

        }
    </script>

    <style lang="sass">
    .${dirName}-wrap
    </style>
`

// interface魔伴
const interfaceTep = 
`
// ${dirName}.Data 参数类型
  export interface ${capPirName}Data {
    pageName: string
  }
// VUEX ${dirName}.State 参数类型
    export interface ${capPirName}State {
        author?: string
    }
// GET_DATA_ASYN 接口参数类型
export interface DataOptions {}
`

// vuex魔伴
const vuexTep = `
import { ${capPirName}State } from '@@/${dirName}.interface'
import { GetterTree, MutationTree, ActionTree, Commit } from 'vuex';
import * as ${capPirName}Api from '@/api/${dirName}'

const state: ${capPirName}State = {
    author: 'bqc'
  }

// 强制使用getter获取state
const getters: GetterTree<${capPirName}State, any> = {
  author: (state: ${capPirName}State) => state.author
}

// 更改state
const mutations: MutationTree<${capPirName}State> = {
  // 更新state都用该方法
  UPDATE_STATE(context :{ commit:Commit , state: ${capPirName}State }, data: ${capPirName}State) {
    for (const key in data) {
      if (!data.hasOwnProperty(key)) { return }
      state[key] = data[key]
    }
  }
}

const actions: ActionTree<${capPirName}State, any> = {
    UPDATE_STATE_ASYN(context :{ commit:Commit , state: ${capPirName}State }, data: ${capPirName}State) {
      context.commit('UPDATE_STATE', data)
    },
    GET_DATA_ASYN(context:{ commit:Commit, state: ${capPirName}State }) {
      ${capPirName}Api.getData()
    }
  }

export default {
    state,
    getters,
    mutations,
    actions,
};

`
// api 接口模版
const apiTep = `import request from '@/utils/request';

export const getData = () => {
    return request({
        url: '',
        method: 'GET',
    });
};

`
process.chdir(`${basePath}/views`); // cd views
fs.writeFileSync(`${basePath}/views/${dirName}.vue`,VueTep) 
// fs.mkdirSync(`${basePath}/views/${dirName}`) // mkdir 在views目录下创建文件夹
// process.chdir(`${basePath}/views/${dirName}`) // cd views 进入到views下面创建的文件夹 改变工作目录
// fs.writeFileSync(`${dirName}.vue`, VueTep) // vue 
// fs.writeFileSync(`${dirName}.ts`, tsTep) // ts
// fs.writeFileSync(`${dirName}.scss`, scssTep) // scss


process.chdir(`${interfacePath}`); // cd interfaces
fs.writeFileSync(`${dirName}.interface.ts`, interfaceTep) // interface

fs.mkdirSync(`${basePath}/store/${dirName}`) 
process.chdir(`${basePath}/store/${dirName}`); // cd store
fs.writeFileSync(`index.ts`, vuexTep) // vuex

process.chdir(`${basePath}/api`); // cd api
fs.writeFileSync(`${dirName}.ts`, apiTep) // api
process.exit(0)