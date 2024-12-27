// src/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8081', // 这里设置基础 URL
    timeout: 1000, // 可选，设置请求超时时间
});

// 可以添加请求拦截器、响应拦截器等
axiosInstance.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    return config;
}, error => {
    // 对请求错误做些什么
    return Promise.reject(error);
});

export default axiosInstance;
