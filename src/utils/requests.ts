/*
*axios的封装，感觉要比现在用的那个好就先抄下来 
*其实就多了一个环境判断，其实也好不了多少，有点沙雕了
*19-6-12
*/ 
import axios from "axios";
// 创建axios实例
let service: any = {};
if(process.env.NODE_ENV === "development") {
    service = axios.create({
        baseURL: '/api',
        timeout: 50000
    })
}else {
    service = axios.create({
        baseURL: '/api', // api的base_url
        timeout: 50000
    })
}

// request拦截器 axios的一些配置
service.interceptors.request.use(
    (config: any) => {
        return config;
    },
    (error: any) => {
        console.error("error", error);
        Promise.reject(error);
    }
)
service.interceptors.response.use(
    (response:any) => {
        return response;
    },
    (error: any) => {
        console.error("error" + error);
        return Promise.reject(error);
    }
)