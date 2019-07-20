
// login.Data 参数类型
  export interface LoginData {
    user: string
  }
// VUEX login.State 参数类型
    export interface LoginState {
      code: number;
      data:any;
      message:string;
      success:boolean;
      token:string;
    }
// GET_DATA_ASYN 接口参数类型
export interface DataOptions {
  email: string;
  password: string;
  token: string;
  readonly isVue: 1;
}
