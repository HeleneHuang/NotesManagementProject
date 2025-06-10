<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { useUserStore } from '@/stores'
import { ref } from 'vue'
import { userUpdateInfoService } from '@/api/user'

const { user: { username, nickname, email, id }, getUser } = useUserStore()

const userInfo = ref({ username, nickname, email, id })

const rules = {
    nickname: [
        { required: true, message: 'please input the Nickname', trigger: 'blur' },
        {
            pattern: /^\S{2,10}$/,
            message: 'Nickname should be within 2-10',
            trigger: 'blur'
        }
    ],
    email: [
        { required: true, message: 'please input the E-mail', trigger: 'blur' },
        { type: 'email', message: 'the format of the E-mail is wrong ', trigger: 'blur' }
    ]
}

const formRef = ref()
const onSubmit = async () => {
    // wait for the validation result
    await formRef.value.validate()
    // submit the change
    await userUpdateInfoService(userInfo.value)
    // inform the user module, and update the modele
    getUser()
    // inform the user
    ElMessage.success('Edited Successfully!')
}

</script>

<template>
    <page-container title="Basic Info">
        <el-row>
            <el-col :span="12">
                <el-form :model="userInfo" :rules="rules" ref="formRef" label-width="130px" size="large">
                    <el-form-item label="Login Name">
                        <el-input v-model="userInfo.username" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="New Name" prop="nickname">
                        <el-input v-model="userInfo.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="E-mail" prop="email">
                        <el-input v-model="userInfo.email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">Change</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </page-container>
</template>