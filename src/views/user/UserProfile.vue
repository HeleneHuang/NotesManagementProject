<script setup>
import PageContainer from '@/components/PageContainer.vue'

</script>

<template>
    <page-container title="基本资料">
        <el-row>
            <el-col :span="12">
                <el-form :model="userInfo" :rules="rules" ref="formRef" label-width="100px" size="large">
                    <el-form-item label="登录名称">
                        <el-input v-model="userInfo.username" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="用户昵称" prop="nickname">
                        <el-input v-model="userInfo.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="用户邮箱" prop="email">
                        <el-input v-model="userInfo.email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">提交修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </page-container>
</template>