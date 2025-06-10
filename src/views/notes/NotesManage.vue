<script setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import { ref } from 'vue'
const notesList = ref([
    {
        id: 5961,
        title: 'Notes001',
        pub_date: '2025-04-10 14:53:52.604',
        state: 'Published',
        cate_name: 'News'
    },
    {
        id: 5962,
        title: 'Notes002',
        pub_date: '2025-5-10 14:54:30.904',
        state: 'Draft',
        cate_name: 'Reminder'
    }
])

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
                <el-select>
                    <el-option label="News" value="001"></el-option>
                    <el-option label="Reminder" value="002"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Publish State：">
                <el-select>
                    <el-option label="Published" value="published"></el-option>
                    <el-option label="Draft" value="draft"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">Search</el-button>
                <el-button>Reset</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="notesList">
            <el-table-column label="Notes Title" width="400">
                <template #default="{ row }">
                    <el-link type="primary" :underline="false">{{ row.title }}</el-link>
                </template>
            </el-table-column>
            <el-table-column label="Category" prop="cate_name"></el-table-column>
            <el-table-column label="Published Date" prop="pub_date"> </el-table-column>
            <el-table-column label="State" prop="state"></el-table-column>
            <el-table-column label="Operation" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary" @click="onEditNotes(row)"></el-button>
                    <el-button :icon="Delete" circle plain type="danger" @click="onDeleteNotes(row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
    </page-container>
</template>

<style lang="scss" scoped></style>