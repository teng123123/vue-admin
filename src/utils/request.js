import axios from "axios";
import { Message } from "element-ui";
const BASEURL = process.env.NODE_ENV === "production" ? "" : "/devapi";
// http://www.web-jshtml.cn/productApi
const service = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
});
/**
 * 添加请求拦截器
 */
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 请求头部添加参数
    console.log("请求拦截器");
    config.headers['Tokey'] = 'tokey';
    config.headers['userId'] = 'userId';
    config.headers['sui'] = 'sui';
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    let data = response.data;
    if(data.resCode !== 0){
      console.log("响应拦截器");
      Message.error(data.message);
      return Promise.reject(data);
    }else{
      return response;
      // return Promise.resolve;
    }
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
//   service.request({
//     method: 'post',
//     url: '/user/12345',
//     data: {
//       firstName: 'Fred',
//       lastName: 'Flintstone'
//     }
//   })
export default service;