<script setup>
import { ref } from 'vue'
import ChannelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { notesPublishService, notesGetDetailService, notesEditService } from '@/api/notes'
import { baseURL } from '@/utils/request'
import axios from 'axios'

// define the drawer
const visibleDrawer = ref(false)

const defaultForm = {
    title: '',
    cate_id: '',
    cover_img: '',
    content: '',
    state: ''
}

// prepare the data
const formModel = ref({
    ...defaultForm
})

// set the logic of uploading files
const imgUrl = ref('')
const onSelectFile = (uploadFile) => {
    imgUrl.value = URL.createObjectURL(uploadFile.raw)  //preview
    formModel.value.cover_img = uploadFile.raw
}

//publish
const emit = defineEmits(['success'])
const onPublish = async (state) => {
    formModel.value.state = state

    const fd = new FormData()
    for (let key in formModel.value) {
        fd.append(key, formModel.value[key])
    }

    // tell the edit mode and the add mode
    if (formModel.value.id) {
        await notesEditService(fd)
        ElMessage.success('Edited Successfully')
        visibleDrawer.value = false
        emit('success', 'edit')
    } else {
        await notesPublishService(fd)
        ElMessage.success('Added Successfully!')
        visibleDrawer.value = false
        emit('success', 'add')
    }
}

// after using open, the drawer will open
const editorRef = ref()
const open = async (row) => {
    visibleDrawer.value = true  // show the drawer
    if (row.id) {
        // redisplay the edited info
        const res = await notesGetDetailService(row.id)
        formModel.value = res.data.data
        // the Avatar should be dealt with independently
        imgUrl.value = baseURL + formModel.value.cover_img
        // transfer the pic url to file object, it is easier to submit in the future
        const file = await imageUrlToFile(imgUrl.value, formModel.value.cover_img)
        formModel.value.cover_img = file
    } else {
        formModel.value = { ...defaultForm }
        imgUrl.value = ''
        editorRef.value.setHTML('')
    }
}

// transfer the url to the filr object
async function imageUrlToFile(url, fileName) {
    try {
        // use axios to get the data
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const imageData = response.data;

        // transfer the image data to blob
        const blob = new Blob([imageData], { type: response.headers['content-type'] });

        // create new file object
        const file = new File([blob], fileName, { type: blob.type });

        return file;
    } catch (error) {
        console.error('将图片转换为File对象时发生错误:', error);
        throw error;
    }
}

defineExpose({
    open
})
</script>

<template>
    <el-drawer v-model="visibleDrawer" :title="formModel.id ? 'Edit Notes' : 'Add Notes'" direction="rtl" size="50%">
        <!-- publish the notes form -->
        <el-form :model="formModel" ref="formRef" label-width="120px">
            <el-form-item label="Notes Title" prop="title">
                <el-input v-model="formModel.title" placeholder="please input the title of the notes"></el-input>
            </el-form-item>
            <el-form-item label="Notes Category" prop="cate_id">
                <channel-select v-model="formModel.cate_id" width="100%"></channel-select>
            </el-form-item>
            <!-- cancel the auto auto-upload -->
            <el-form-item label="User's Avatar">
                <el-upload class="avatar-uploader" :show-file-list="false" :auto-upload="false"
                    :on-change="onSelectFile">
                    <img v-if="imgUrl" :src="imgUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>

            <el-form-item label="Notes Content" prop="content">
                <div class="editor">
                    <quill-editor ref="editorRef" theme="snow" v-model:content="formModel.content" contentType="html">
                    </quill-editor>
                </div>
            </el-form-item>

            <el-form-item>
                <el-button @click="onPublish('已发布')" type="primary">Publish</el-button>
                <el-button @click="onPublish('草稿')" type="info">Draft</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
    :deep() {
        .avatar {
            width: 178px;
            height: 178px;
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
            width: 178px;
            height: 178px;
            text-align: center;
        }
    }
}

.editor {
    width: 100%;

    :deep(.ql-editor) {
        min-height: 200px;
    }
}
</style>