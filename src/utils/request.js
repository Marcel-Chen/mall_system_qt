import axios from 'axios';

const request = axios.create({
    baseURL: '/api',  // url = base url + request url /
    timeout: 5000
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    /*let employee = localStorage.getItem("employee") ? JSON.parse(localStorage.getItem("employee")) : null;
    // 设置请求头
    if (employee) {
        config.headers['token'] = employee.token;
    }*/
    return config
}, error => {
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = response.data;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        // 当权限验证不通过时给出提示
        /*if (res.code === 401) {
            ElementUI.Message({
                message: res.msg,
                type: 'warning'
            })
        }*/
        return res;
    },
    error => {
        return Promise.reject(error)
    }
)

export default request

