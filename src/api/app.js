import axios from "axios";
import {message} from "antd";

// 请求实例
const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000' : 'http://121.41.94.106:8000',
    timeout: 40000, // 设置在4000毫秒内请求数据，如果没有请求成功就执行错误函数
    withCredentials: true, // 使用cookie
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    message.error(error.message)
    // 中断promise链
    return new Promise(() => {
    });
});

export function addUserLoginInterceptor(setUserLogin) {
    instance.interceptors.response.use(function (response) {
        // 如果状态码为401说明cookie过期，提示重新登录
        if (response.status === 401) {
            message.error('cookie过期')
            localStorage.removeItem('userLogin')
            setUserLogin(false)
        }
        return response;
    }, function (error) {
        console.log('second interceptors error', error)
        return new Promise(() => {
        });
    });
}

export default instance
