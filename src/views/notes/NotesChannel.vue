<script setup>
import { ref } from 'vue'
import { notesGetChannelsService, notesDelChannelService } from '@/api/notes.js'
import ChannelEdit from './components/ChannelEdit.vue'
import { Edit, Delete } from '@element-plus/icons-vue'

const channelList = ref([])
const loading = ref(false)
const dialog = ref()

const getChannelList = async () => {
    const res = await notesGetChannelsService()
    channelList.value = res.data.data
    loading.value = false
}
getChannelList()

const onDelChannel = async (row) => {
    await ElMessageBox.confirm('Do you want to delete this category?', 'Warning', {
        type: 'warning',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    })
    await notesDelChannelService(row.id)
    ElMessage.success('Deleted Successfully')
    getChannelList()
}

const onEditChannel = (row) => {
    dialog.value.open(row)
}

const onAddChannel = () => {
    dialog.value.open({})
}

const onSuccess = () => {
    getChannelList()
}

</script>

<template>
    <page-container title="Notes Categories">
        <template #extra>
            <el-button @click='onAddChannel' type="primary"> Add </el-button>
        </template>

        <el-table v-loading="loading" :data="channelList" style="width: 100%">
            <el-table-column label="Num" width="100" type="index"> </el-table-column>
            <el-table-column label="Category" prop="cate_name"></el-table-column>
            <el-table-column label="Customed Name" prop="cate_alias"></el-table-column>
            <el-table-column label="Operation" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary" @click="onEditChannel(row)"></el-button>
                    <el-button :icon="Delete" circle plain type="danger" @click="onDelChannel(row)"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="No Data" />
            </template>
        </el-table>

        <channel-edit ref="dialog" @success="onSuccess"></channel-edit>

    </page-container>
</template>

<style lang='scss' scoped></style>