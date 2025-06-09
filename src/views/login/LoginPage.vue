<script setup>
import { userRegisterService } from '@/api/user.js'
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'

const isRegister = ref(true)
const form = ref()

// define form model
const formModel = ref({
    username: '',
    password: '',
    repassword: ''
})

// define validation rules
const rules = {
    username: [
        { required: true, message: 'please input the username', trigger: 'blur' },
        { min: 3, max: 10, message: 'the username should be within 5-10 characters', trigger: 'blur' }
    ],
    password: [
        { required: true, message: 'please input the password', trigger: 'blur' },
        { pattern: /^\S{6,15}$/, message: '- the password should be within 6-15 characters \n- empty is not allowed', trigger: 'blur' }
    ],
    repassword: [
        { required: true, message: 'please reinput the password', trigger: 'blur' },
        { pattern: /^\S{6,15}$/, message: '- the password should be within 6-15 characters \n- empty is not allowed', trigger: 'blur' }
        ,
        {
            validator: (rule, value, callback) => {
                if (value !== formModel.value.password) {
                    callback(new Error('the passwords do not match'))
                } else {
                    callback()
                }
            },
            trigger: 'change'
        }
    ]
}

// validate before register
const register = async () => {
    await form.value.validate()
    await userRegisterService(formModel.value)
    ElMessage.success('Registered Successfully!')
    // switch to login page
    isRegister.value = false
}

</script>

<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">
            <!-- bind model and rules with form -->
            <el-form :model='formModel' :rules='rules' ref="form" size="large" autocomplete="off" v-if="isRegister">
                <el-form-item>
                    <h1>Register</h1>
                </el-form-item>
                <!-- bind v-model with username -->
                <el-form-item prop='username'>
                    <el-input v-model='formModel.username' :prefix-icon="User" placeholder="user name"></el-input>
                </el-form-item>
                <el-form-item prop='password'>
                    <el-input v-model='formModel.password' :prefix-icon="Lock" type="password"
                        placeholder="password"></el-input>
                </el-form-item>
                <el-form-item prop='repassword'>
                    <el-input v-model='formModel.repassword' :prefix-icon="Lock" type="password"
                        placeholder="double check your password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="register" class="button" type="primary" auto-insert-space>
                        Register
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = false">
                        ← Back
                    </el-link>
                </el-form-item>
            </el-form>
            <el-form ref="form" size="large" autocomplete="off" v-else>
                <el-form-item>
                    <h1>Login</h1>
                </el-form-item>
                <el-form-item>
                    <el-input :prefix-icon="User" placeholder="user name"></el-input>
                </el-form-item>
                <!-- bind the password -->
                <el-form-item>
                    <el-input :prefix-icon="Lock" type="password" placeholder="password"></el-input>
                </el-form-item>
                <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox>Remember me</el-checkbox>
                        <el-link type="primary" :underline="false">Forget password?</el-link>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space>Login</el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = true">
                        Register →
                    </el-link>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
.login-page {
    height: 100vh;
    background-color: #fff;

    .bg {
        background: url('@/assets/logo2.png') no-repeat center center / 1300px auto,
            url('@/assets/login_bg.png') no-repeat center / cover;
        border-radius: 0 80px 0 0;
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;

        .title {
            margin: 0 auto;
        }

        .button {
            width: 100%;
        }

        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
}

:deep(.el-form-item) {
    margin-bottom: 40px;
}

:deep(.el-form-item__error) {
    white-space: pre-line;
}
</style>