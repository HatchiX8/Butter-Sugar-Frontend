import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Home',
      component: () => import('@/views/home/index.vue'), // 母頁
      children: [
        {
          path: '',
          name: 'HomeDashboard',
          component: () => import('@/views/home/homeDashboard/index.vue'), // 預設首頁內容
        },
        {
          path: 'course',
          name: 'Course',
          component: () => import('@/views/home/courseIntroduction/index.vue'), // 課程介紹
        },
        {
          path: 'course-info',
          name: 'CourseInfo',
          component: () => import('@/views/home/courseList/index.vue'), // 所有課程資訊
        },
        {
          path: 'student',
          name: 'Student',
          component: () => import('@/views/home/student/index.vue'), // 學生個人資訊
        },
      ],
    },
    // 其他路由（如講師後台）可放在外層
    {
      path: '/Teacher',
      name: 'TeacherBackend',
      component: () => import('@/views/dashboard/index.vue'), // 講師後台
    },
    {
      path: '/login-success',
      name: 'loginSuccess',
      component: () => import('@/views/loginSuccess/index.vue'), // 登入
    },
  ],
});

export default router;
