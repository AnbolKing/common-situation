import axios from 'axios';

//url 请求地址
//params 相关配置
//data post请求的相关数据

export const get = (url, params={}) => {
  return new Promise((resolve, reject) => {
    axios.get(url, params).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    })
  })
}

export const post = (url, params, data={}) => {
  return new Promise((resolve, reject) => {
    axios.post(url, data, params).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    })
  })
}