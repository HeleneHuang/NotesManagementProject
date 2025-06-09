import { userGetInfoService } from '@/api/user'
import { defineStore } from 'pinia' 
import {ref} from 'vue'

export const useUserStore = defineStore('big-user', ()=>{
    const token = ref('')
    const setToken = (newToken)=>{
        token.value = newToken
    }
    const removeToken = ()=>{
        token.value = ''
    }

    // request to get data
    const user = ref({})
    const getUser = async () =>{
        const res = await userGetInfoService()
        user.value = res.data.data
    }

    return {
        token,
        setToken,
        removeToken,
        user,
        getUser
    }
}, {
    persist: true
})