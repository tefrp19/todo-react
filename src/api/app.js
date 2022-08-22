import {UserLoginContext} from "../components/App";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {message} from "antd";

// 请求实例
const instance = axios.create({
    baseURL: 'http://127.0.0.1:3000',
    timeout: 40000// 设置在4000毫秒内请求数据，如果没有请求成功就执行错误函数
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
    // 对响应数据做点什么
    // 如果状态码为401说明cookie过期，提示重新登录
    if (response.data.status===401){


    }
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    message.error(error.message)
    // 中断promise链
    return new Promise(()=>{});
});

export default instance
