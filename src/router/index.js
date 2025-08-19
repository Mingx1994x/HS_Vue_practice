import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/week1',
      name: 'week1',
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/WeekOneView.vue'),
    },
    {
      path: '/week2',
      name: 'week2',
      component: () => import('../views/WeekTwoView.vue'),
    },
    {
      path: '/week3',
      name: 'week3',
      component: () => import('../views/WeekThreeView.vue'),
      children: [
        {
          path: '',
          component: () => import('../components/LessonExample.vue')
        },
        {
          path: 'week3-task',
          component: () => import('../components/WeekThreeTask.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    },
  ],
})

export default router
