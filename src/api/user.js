import request from '@/utils/request'

// send registration request to backend API
export const userRegisterService = ({username, password, repassword}) => {
    return request.post('/api/reg', {username, password, repassword})
}

// send login request to backend API
export const userLoginService = ({username, password}) => {
    return request.post('/api/login', {username, password})
}

// get the basic information of customer
export const userGetInfoService = () => request.get('/my/userinfo')