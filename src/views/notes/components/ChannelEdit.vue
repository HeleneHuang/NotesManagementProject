<script setup>
import { ref } from 'vue'
import { notesEditChannelService, notesAddChannelService } from '@/api/notes'
import { ElMessage } from 'element-plus'

const dialogVisible = ref(false)

const open = async (row) => {
  dialogVisible.value = true
  formModel.value = { ...row }
}

defineExpose({
  open
})

const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
// define the rules for input in prompt
const rules = {
  cate_name: [
    { required: true, message: 'please input category', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: 'category should be within 1-10, no empty allowed',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: 'please input customed name', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: 'customed name should be withn 1-15',
      trigger: 'blur'
    }
  ]
}

// validate in the page when submit
const formRef = ref()
const emit = defineEmits(['success'])
const onSubmit = async () => {
  await formRef.value.validate()
  const isEdit = formModel.value.id
  if (isEdit) {
    await notesEditChannelService(formModel.value)
    ElMessage.success('Edited Successfully')
  } else {
    await notesAddChannelService(formModel.value)
    ElMessage.success('Added Successfully')
  }
  dialogVisible.value = false
  emit('success')
}

</script>

<template>
  <el-dialog v-model="dialogVisible" :title="formModel.id ? 'Edit category' : 'Add category'" width="30%">
    <el-form ref='formRef' :model="formModel" :rules="rules" label-width="150px" style="padding-right: 30px">
      <el-form-item label="Category" prop="cate_name">
        <el-input v-model="formModel.cate_name" minlength="1" maxlength="10"></el-input>
      </el-form-item>
      <el-form-item label="Customed Name" prop="cate_alias">
        <el-input v-model="formModel.cate_alias" minlength="1" maxlength="15"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false"> Cancel </el-button>
        <el-button type="primary" @click="onSubmit"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>