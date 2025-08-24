import { toast } from "sonner"

import axios from 'axios'

axios.defaults.withCredentials = false

// request interceptor
axios.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem('userToken')
    // do something before request is sent
    if (userToken) {
      // let each request carry token
      config.headers.Authorization = `Bearer ${userToken}`
    }

    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
axios.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  async (response) => {
    const { data,config } = response
    // @ts-ignore
    const { retry, showErrorMsg = true } = config;
    return new Promise((resolve,reject) => {
      if (data.code !== 200) {
          if (showErrorMsg) {
            toast(data.message || 'Error');
          }
          return reject(data);
      }

      resolve(data.data)
    })
  },
  (error) => {
    console.error('err' + error)
    const { config, statusText, status } = error.response
    const { showErrorMsg = true } = config
    if (showErrorMsg) {
      toast(statusText)
    }
    return Promise.reject({ code: status, message: statusText })
  }
)
