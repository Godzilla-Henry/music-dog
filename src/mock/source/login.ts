import { MockMethod } from 'vite-plugin-mock';
import Mock from 'mockjs';

const projectList = Mock.mock({
    "list|20": [{
        'id': '@guid', // guid
        'name': '@cname', // 中文名
        'account': `@word`, // 英文单词
        'phone': /09[0-9]{8}/, // 正则模式
        'deptName': Mock.mock('@cword(2,4)'), // 随机2-4字中文单词
    }]
})

export default [
    {
        url: '/api/users',
        method: 'get',
        response: () => {
            return Mock.mock({
                code: 200,
                data: projectList,
            });
        },
    },
] as MockMethod[];