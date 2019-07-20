import request from '@/utils/request';
export const getMemberList = (cate: string) => {
    return request({
        url: '/expressApi/students?from=vue',
        method: 'GET',
    });
};