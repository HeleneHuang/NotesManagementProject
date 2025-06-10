<script setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import { ref } from 'vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { notesGetListService } from '@/api/notes'
import { formatTime } from '@/utils/format'

const notesList = ref([])
const total = ref(0)
const loading = ref(false)

const params = ref({
    pagenum: 1,
    pagesize: 5,
    cate_id: '',
    state: ''
})

const getNotesList = async () => {
    loading.value = true
    const res = await notesGetListService(params.value)
    notesList.value = res.data.data
    total.value = res.data.total
    loading.value = false
}
getNotesList()

// define pagination
const onSizeChange = (size) => {
    params.value.pagenum = 1
    params.value.pagesize = size
    getNotesList()
}
const onCurrentChange = (page) => {
    params.value.pagenum = page
    getNotesList()
}

// search and reset function
const onSearch = () => {
    params.value.pagenum = 1
    getNotesList()
}

const onReset = () => {
    params.value.pagenum = 1
    params.value.cate_id = ''
    params.value.state = ''
    getNotesList()
}

// define the logic of edit and delete
const onEditNotes = (row) => {
    console.log(row)
}
const onDeleteNotes = (row) => {
    console.log(row)
}
</script>

<template>
    <page-container title="Notes Management">
        <template #extra>
            <el-button type="primary"> Add </el-button>
        </template>

        <el-form inline>
            <el-form-item label="Notes Category：">
                <channel-select v-model="params.cate_id"></channel-select>
            </el-form-item>
            <el-form-item label="Publish State：">
                <el-select v-model="params.state" style="width: 230px">
                    <el-option label="Published" value="published"></el-option>
                    <el-option label="Draft" value="draft"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="onSearch" type="primary">Search</el-button>
                <el-button @click="onReset">Reset</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="notesList" loading.value=false>
            <el-table-column label="Notes Title" width="400">
                <template #default="{ row }">
                    <el-link type="primary" :underline="false">{{ row.title }}</el-link>
                </template>
            </el-table-column>
            <el-table-column label="Category" prop="cate_name"></el-table-column>
            <el-table-column label="Published Date" prop="pub_date">
                <template #default="{ row }">
                    {{ formatTime(row.pub_date) }}
                </template>
            </el-table-column>
            <el-table-column label="State" prop="state"></el-table-column>
            <el-table-column label="Operation" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary" @click="onEditNotes(row)"></el-button>
                    <el-button :icon="Delete" circle plain type="danger" @click="onDeleteNotes(row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="params.pagenum" v-model:page-size="params.pagesize"
            :page-sizes="[2, 3, 5, 10]" layout="jumper, total, sizes, prev, pager, next" :background='true'
            :total="total" @size-change="onSizeChange" @current-change="onCurrentChange"
            style="margin-top: 20px; justify-content: flex-end" />
    </page-container>
</template>

<style lang="scss" scoped></style>