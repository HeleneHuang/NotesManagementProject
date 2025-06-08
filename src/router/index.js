import { createRouter, createWebHistory } from 'vue-router'

// createRouter instance
// createWebHistory & createWebHashHistory (#)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/login', component: ()=>import('@/views/login/LoginPage.vue')},
    {
      path: '/', 
      component: ()=>import('@/views/layout/LayoutContainer.vue'),
      redirect: '/notes/manage',
      children:[
        { 
          path: '/notes/manage', 
          component: ()=> import('@/views/notes/NotesManage.vue')
        },
        { 
          path: '/notes/channel', 
          component: ()=> import('@/views/notes/NotesChannel.vue')
        },
        { 
          path: '/user/profile', 
          component: ()=> import('@/views/user/UserProfile.vue')
        },
        { 
          path: '/user/avatar', 
          component: ()=> import('@/views/user/UserAvatar.vue')
        },
        { 
          path: '/user/password', 
          component: ()=> import('@/views/user/UserPassword.vue')
        },
      ]
    }
  ],
})

export default router
