<script setup>
import { notesGetChannelsService } from '@/api/notes';
import { ref } from 'vue'

const channelList = ref([])
const getChannelList = async () => {
    const res = await notesGetChannelsService()
    channelList.value = res.data.data
}
getChannelList()

</script>
<template>
    <el-select style="width: 230px">
        <el-option v-for="channel in channelList" :key="channel.id" :label="channel.cate_name" value="001"></el-option>
    </el-select>
</template>