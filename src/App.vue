<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/modules/user';

const router = useRouter()
const rout = useRoute()
const userStore = useUserStore()

const goList = () => {
  console.log(router, rout)
}

</script>

<template>

  <router-view></router-view>
  <hr />

  <div> im the app</div>
  <el-button @click="$router.push('/home')"> home page </el-button>
  <el-button @click="goList"> another page </el-button>

  <p>{{ userStore.token }}</p>
  <el-button @click="userStore.setToken(123)">log in </el-button>
  <el-button @click="userStore.removeToken()">cancel</el-button>
</template>

<style scoped></style>
