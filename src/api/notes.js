import request from '@/utils/request'
export const notesGetChannelsService = () => request.get('/my/cate/list')

// add notes caegories
export const notesAddChannelService = (data) => request.post('/my/cate/add', data)

// edit notes categories
export const notesEditChannelService = (data) => request.put('/my/cate/info', data)

// delete notes categories
export const notesDelChannelService = (id) =>
  request.delete('/my/cate/del', {
    params: { id }
  })

// get the notes list
export const notesGetListService = (params) => request.get('/my/article/list', { params })

// publish notes
export const notesPublishService = (data) => request.post('/my/article/add', data)

// get the details of notes
export const notesGetDetailService = (id) => request.get('my/article/info', { params: { id } })

// edit notes 
export const notesEditService = (data) => request.put('my/article/info', data)

//delete notes
export const notesDelService = (id) => request.delete('my/article/info', { params: { id } })