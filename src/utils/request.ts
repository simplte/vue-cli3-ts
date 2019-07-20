import * as axios from 'axios';
import store from '@/store';
import { Toast } from 'vant';
// axios中的响应和请求数据的接口(也就是规范请求和响应的数据结构)
import { AxiosResponse, AxiosRequestConfig } from 'axios';

const service = axios.default.create({
    timeout: 0,
    maxContentLength: 4000,
});
  
// 拦截器 请求前和  接口响应数据向请求的地方返回数据前的 处理
service.interceptors.request.use((config: AxiosRequestConfig) => {
    // 可以在里面加上一些逻辑验证，比如说这地方是请求的地方，如果参数中包含一些敏感参数可以直接返回出去，不向后台请求
    // 举个例子：在每个接口请求前都验证是否登录，把本地的token值带到后台
    // 每次请求都为http头增加Authorization字段，其内容为Token
    
    // 请求网上的api就不带token了带了token就请求不到数据，只在本地的接口加token值
    const token = localStorage.getItem('token');
    let isMoiveUrl = config.url ? config.url.split("/").includes('api') : false;
    if (token && !isMoiveUrl) {
      config.headers.common['Authorization'] = token;
    }
    return config;
}, (error: any) => {
    Promise.reject(error);
});

service.interceptors.response.use(
    // 接口响应数据后的处理，和后台确定好响应参数，
    // 如果有异常就在这边统一处理，
    // 就不需要每个调用axios的地方都判断一下，
    // 比如说code值不对，每个接口如果code值对应的结果一样，就可以统一处理了
    (response: AxiosResponse) => {
        console.log(response)
        if (response.status !== 200) {
            Toast.fail('请求错误！');
        }   else {
            if(response.data && response.data.status == 401) {
                location.href = "/login";
            }
            return response.data;
        }
    },
    (error: any) => {
        return Promise.reject(error);
    });

export default service;
