import axios from 'axios'
import {useUserStore} from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  baseURL,
  timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 携带token
    const useStore = useUserStore()
    if(useStore.token){
        config.headers.Authorization = useStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    if (res.data.code ===0){
        return res
    }
    // 处理业务失败, 给错误提示, 抛出错误
    ElMessage.error(res.data.message || 'server failure')
    return Promise.reject(res.data)
  },
  (err) => {
    // 401 error
    if (err.response?.status === 401){
        router.push('/login')
    }

    // default error
    ElMessage.error(err.response.data.message || 'server failure')
    return Promise.reject(err)
  }
)

export default instance
export { baseURL}