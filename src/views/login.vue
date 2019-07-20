
    <template >
        <div class="login-wrap">
            <van-cell-group class="lgCell">
                <van-field  label="邮箱" v-model="Options.email" 
                            placeholder="请输入注册邮箱" 
                            required
                            clearable
                            right-icon="question-o"/>
            </van-cell-group>
            <van-cell-group class="lgCell">
                <van-field  label="密码" v-model="Options.password"
                            placeholder="请输入密码" 
                            required
                            clearable
                            right-icon="question-o"/>
            </van-cell-group>
            <van-button type="primary" size="large" @click="login">
                <div class="lg" >
                    登录
                </div>
            </van-button>
        </div>
    </template>

    <script lang="ts" >
    import { Component, Vue, Watch } from "vue-property-decorator";
    import { Action, Mutation, State } from "vuex-class";
    import { Field ,Cell, CellGroup, Button, Notify} from "vant";
    import { LoginState , DataOptions} from '@@/login.interface'
    // import {  } from "@/components" // 组件

    @Component({
    components: {
        [Field.name] : Field,
        [Cell.name] : Cell,
        [CellGroup .name] : CellGroup, 
        [Button .name] : Button, 
    }
    })
    
    export default class login extends Vue {
        // data
        private Options:DataOptions = {
            email: "",
            password:'',
            token: '',
            isVue: 1
        };
        private lgData:any;
        // Getter
        // @Getter 

        // Action
        @Action private GET_DATA_ASYN!: (data: DataOptions) => any;

        
        // Watch
        // @Watch

        // created
        private created() {
            console.log("login")
        }
        login() {
            console.log('222222',this.Options)
            this.GET_DATA_ASYN(this.Options).then((res:LoginState) =>{
                if(res.code == 4000) {
                    Notify({
                        message: '登录成功',
                        duration: 1000,
                        background: '#1989fa'
                    })
                    localStorage.setItem('token', res.token);
                    this.$router.push({path: '/'});
                }
            })
        }
    }
    </script>

    <style lang="sass">
    .login-wrap
        background: #f4f4f4
        .lgCell 
            marigin-bottom: 10px
        .lg
            background: linear-gradient(90deg, #43DEA0 0%, #23BEAE 100%)
    </style>
