<script setup>
import {
    Management,
    Promotion,
    UserFilled,
    User,
    Crop,
    EditPen,
    SwitchButton,
    CaretBottom
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import { useUserStore } from '@/stores'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'

const userStore = useUserStore()
const router = useRouter()

onMounted(() => {
    userStore.getUser()
})

const handleCommand = async (key) => {
    if (key === 'logout') {
        await ElMessageBox.confirm('Do you want to exist?', 'Warning', {
            type: 'warning',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        })
        // jump out and remove all the info (tokens and user info)
        userStore.removeToken()
        userStore.setUser({})
        router.push('/login')
    } else {
        router.push(`/user/${key}`)
    }
}

</script>

<template>
    <el-container class="layout-container">
        <el-aside width="200px">
            <div class="el-aside__logo"></div>
            <el-menu active-text-color="#ADE7FA" background-color="#232323" :default-active="$route.path"
                text-color="#fff" router>
                <el-menu-item index="/notes/channel">
                    <el-icon>
                        <Management />
                    </el-icon>
                    <span>Notes Class</span>
                </el-menu-item>
                <el-menu-item index="/notes/manage">
                    <el-icon>
                        <Promotion />
                    </el-icon>
                    <span>Notes Management</span>
                </el-menu-item>
                <el-sub-menu index="/user">
                    <template #title>
                        <el-icon>
                            <UserFilled />
                        </el-icon>
                        <span>Profile</span>
                    </template>
                    <el-menu-item index="/user/profile">
                        <el-icon>
                            <User />
                        </el-icon>
                        <span>My Account</span>
                    </el-menu-item>
                    <el-menu-item index="/user/avatar">
                        <el-icon>
                            <Crop />
                        </el-icon>
                        <span>Profile Picture</span>
                    </el-menu-item>
                    <el-menu-item index="/user/password">
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        <span>Reset Password</span>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>
                <div>User: <strong>{{
                    userStore.user.nickname || userStore.user.username
                        }}</strong></div>

                <el-dropdown placement="bottom-end" @command="handleCommand">
                    <span class="el-dropdown__box">
                        <el-avatar :src="userStore.user.user_pic || avatar" />
                        <el-icon>
                            <CaretBottom />
                        </el-icon>
                    </span>

                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="profile" :icon="User">My Account</el-dropdown-item>
                            <el-dropdown-item command="avatar" :icon="Crop">Profile Picture</el-dropdown-item>
                            <el-dropdown-item command="password" :icon="EditPen">Reset Password</el-dropdown-item>
                            <el-dropdown-item command="logout" :icon="SwitchButton">Log Out</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
            <el-footer>Notes Manage Project ©2025 Created by Helene</el-footer>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
    height: 100vh;

    .el-aside {
        background-color: #232323;

        &__logo {
            height: 120px;
            background: url('@/assets/logo.png') no-repeat center / 120px auto;
        }

        .el-menu {
            border-right: none;
        }
    }

    .el-header {
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .el-dropdown__box {
            display: flex;
            align-items: center;

            .el-icon {
                color: #999;
                margin-left: 10px;
            }

            &:active,
            &:focus {
                outline: none;
            }
        }
    }

    .el-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #666;
    }
}
</style>