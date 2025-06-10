<script setup>
import { ref } from 'vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { userUploadAvatarService } from '@/api/user'

const userStore = useUserStore()
const imgUrl = ref(userStore.user.user_pic)
const uploadRef = ref()

const onSelectFile = (uploadFile) => {
  // based on File reader, read pic and make preview
  const reader = new FileReader()
  reader.readAsDataURL(uploadFile.raw)
  reader.onload = () => {
    imgUrl.value = reader.result
  }
}

const onUpdateAvatar = async () => {
  // send request to update Avatar
  await userUploadAvatarService(imgUrl.value)
  // userstore udated
  await userStore.getUser()
  // alert user
  ElMessage({ type: 'success', message: 'Updated Avatar Successfullly!' })
}

</script>

<template>
  <page-container title="Change your Avatar">
    <el-row>
      <el-col :span="12">
        <el-upload ref="uploadRef" class="avatar-uploader" :auto-upload="false" :show-file-list="false"
          :on-change="onSelectFile">
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <img v-else src="@/assets/logo.png" width="278" />
        </el-upload>
        <br />
        <el-button @click="uploadRef.$el.querySelector('input').click()" type="primary" :icon="Plus" size="large">
          Choose pic
        </el-button>
        <el-button type="success" :icon="Upload" size="large" @click="onUpdateAvatar">
          Upload Pic
        </el-button>
      </el-col>
    </el-row>
  </page-container>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
      display: block;
    }

    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
</style>