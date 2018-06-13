/**
 * Created by cghsir on 2018/3/31.
 */
import axios from 'axios';
import env from '../../build/env';
import {Notice, Message} from 'iview';
import Cookies from 'js-cookie';

// 10秒超时时间
axios.defaults.timeout = 10000;

axios.defaults.baseURL = '/api';
// 不携带cookie
axios.defaults.withCredentials = false;


//http request 拦截器
axios.interceptors.request.use(
    config => {
        config.data = JSON.stringify(config.data);
        config.headers = {
            'Content-Type': 'application/json;charset=UTF-8'
        };
        // 如果有token 携带token
        let token = Cookies.get("token");
        if(token){
            config.headers.token = token;
        }
        return config;
    },
    error => {
        // 开发模式
        if(env === 'development'){
            // 控制台打印error信息
            console.log(error);
        }
        return Promise.reject(err);
    }
);


//http response 拦截器
axios.interceptors.response.use(
    response => {
        // 开发模式
        if (env === 'development') {
//          console.log("response:");
//          console.log(response);
        }
        return response;
    },
    error => {
        // 又返回数据但是响应码不是200
        // 开发模式
        if (env === 'development') {
            console.log(error);
        }
        if (error.response != undefined) {
            let msg = '';
            if (error.response.status === 500) {
                msg = "500,服务器错误!";
            } else if (error.response.status === 401) {
                msg = "401,未登录认证!";
            } else if (error.response.status === 403) {
                msg = "403,权限不足!";
            } else if (error.response.status === 404) {
                msg = "404,请求资源未找到!";
            } else {
                msg = error.response.status;
            }
            // 错误提示拦截器
            Notice.error({
                title: msg,
                desc: error.response.data.msg
            });
        }
        // 没有返回数据 例如超时等
        else {
            Notice.error({
                title: '系统错误，无响应!',
                desc: error
            });
        }
        return Promise.reject(error)
    }
);


/**
 * 封装get方法|查询
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(response => {
            resolve(response.data);
        }).catch(err => {
            reject(err)
        })
    })
}


/**
 * 封装post请求|新增
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                // 如果是登录请求的话
                if(response.config.url === "/api/login"){
                    // 响应 token 放在 cookie 中
                    Cookies.set("token", response.headers.token);
                }
                if (response.data.success) {
                    Message.success(response.data.msg);
                } else {
                    Message.error(response.data.msg);
                }
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装del请求|删除
 * @param url
 * @param data
 * @returns {Promise}
 */

export function del(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.delete(url, data)
            .then(response => {
                if (response.data.success) {
                    Message.success(response.data.msg);
                } else {
                    Message.error(response.data.msg);
                }
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求|修改
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                if (response.data.success) {
                    Message.success(response.data.msg);
                } else {
                    Message.error(response.data.msg);
                }
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

