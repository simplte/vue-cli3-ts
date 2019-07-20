import request from '@/utils/request';
import { DataOptions } from '@@/login.interface'
export const getData = (data: DataOptions) => {
    return request({
        url: '/expressApi/login',
        method: 'POST',
        data: data
    });
};

