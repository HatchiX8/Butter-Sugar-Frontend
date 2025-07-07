import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    // 始終平滑滾動到頂部
    return { top: 0, behavior: 'smooth' } as ScrollToOptions
  },
  routes: [
    {
      path: '/',
      redirect: '/Home', // ✅ 訪問 / 時導向 /Home/homeDashboard
    },
    {
      path: '/home',
      component: () => import('@/views/home/index.vue'), // 母頁
      children: [
        {
          path: '',
          name: 'HomeDashboard',
          component: () => import('@/views/home/homeDashboard/index.vue'), // 預設首頁內容
        },
        {
          path: 'course/:id',
          name: 'Course',
          component: () => import('@/views/home/courseIntroduction/index.vue'), // 課程介紹
        },
        {
          path: 'course/course-page/:id',
          name: 'CourseVideo',
          component: () => import('@/views/home/coursePage/index.vue'), // 課程影片
        },
        {
          path: 'course-info',
          name: 'CourseInfoList',
          component: () => import('@/views/home/courseList/index.vue'), // 所有課程資訊
        },
        {
          path: 'my-course',
          name: 'MyCourse',
          component: () => import('@/views/home/myCourse/index.vue'), // 我的課程列表
        },
        {
          path: 'course-chapter/:id',
          name: 'courseChapter',
          component: () => import('@/views/home/courseChapter/index.vue'), // 課程章節列表
          props: true
        },
        {
          path: 'memberCenter',
          name: 'StudentMemberCenter',
          component: () => import('@/views/home/memberCenter/index.vue'), // 學生個人資訊
          children: [
            {
              path: 'profile',
              name: 'StudentProfile',
              component: () => import('@/views/home/memberCenter/profile/index.vue'),
            },
            {
              path: 'orders',
              name: 'Orders',
              component: () => import('@/views/home/memberCenter/orders/index.vue'),
            },
          ],
        },
        {
          path: 'cart-flow',
          component: () => import('@/views/home/cart/index.vue'), // 購物車流程
          children: [
            {
              path: 'cart',
              name: 'Cart',
              component: () => import('@/views/home/cart/pages/cart/index.vue'),
            },
            {
              path: 'checkout',
              name: 'Checkout',
              component: () => import('@/views/home/cart/pages/checkout/index.vue'),
            },
            {
              path: 'order-success',
              name: 'OrderSuccess',
              component: () => import('@/views/home/cart/pages/orderSuccess/index.vue'),
            },
          ],
        },
        {
          path: 'highlighted-instructor/:id?',
          name: 'highlightedInstructor',
          component: () => import('@/views/home/highlightedInstructor/index.vue'), // 精選講師
        },
        {
          path: 'others',
          redirect:  { name: 'AboutUs' },
          component: () => import('@/views/home/others/index.vue'), // footer 連結三頁面
          children: [
            {
              path: 'aboutUs',
              name: 'AboutUs',
              component: () => import('@/views/home/others/aboutUs/index.vue'),
            },
            {
              path: 'faq',
              name: 'QuestionAnswer',
              component: () => import('@/views/home/others/faq/index.vue'),
            },
            {
              path: 'terms-of-service',
              name: 'TermsOfService',
              component: () => import('@/views/home/others/termsOfService/index.vue'),
            },
          ]
        },
      ],
    },
    // 其他路由（如講師後台）可放在外層
    {
      path: '/Teacher',
      name: 'TeacherBackend',
      redirect: '/Teacher/basicInfo',
      component: () => import('@/views/dashboard/index.vue'),
      children: [
        {
          path: 'basicInfo',
          name: 'BasicInfo',
          component: () => import('@/views/dashboard/basicInfo/index.vue'),
        },
        {
          path: 'courseInfo',
          name: 'CourseInfo',
          component: () => import('@/views/dashboard/courseInfo/index.vue'),
        },
        {
          path: 'courseAction',
          name: 'CourseAction',
          component: () => import('@/views/dashboard/courseAction/index.vue'),
          children: [
            {
              path: 'courseManage',
              name: 'CourseManage',
              component: () => import('@/views/dashboard/courseAction/courseManage/index.vue'),
            },
          ],
        },
        {
          path: 'memberCenter',
          name: 'TeacherMemberCenter',
          component: () => import('@/views/dashboard/memberCenter/index.vue'),
          children: [
            {
              path: 'revenue',
              name: 'Revenue',
              component: () => import('@/views/dashboard/memberCenter/revenue/index.vue'),
            },
            {
              path: 'profile',
              name: 'TeacherProfile',
              component: () => import('@/views/dashboard/memberCenter/profile/index.vue'),
            },
          ],
        },
      ], // 講師後台
    },
    {
      path: '/Admin',
      name: 'AdminBackend',
      component: () => import('@/views/admin/index.vue'), // 管理者後台
      redirect: '/admin/teacherManage',
      children: [
        {
          path: 'teacherManage',
          name: 'TeacherManage',
          component: () => import('@/views/admin/teacherManage/index.vue'),
        },
      ],
    },
    {
      path: '/login-success',
      name: 'loginSuccess',
      component: () => import('@/views/loginSuccess/index.vue'), // 登入
    },
    {
      path: '/compTest',
      name: 'CompTest',
      component: () => import('@/views/CompTest/index.vue'), // 測試元件用頁面
    },
  ],
});

router.beforeEach((to) => {
  const publicPages = [
    'login',
    'loginSuccess',
    'HomeDashboard',
    'Cart',
    'CompTest',
    'Course',
    'CourseInfoList',
    'highlightedInstructor',
  ]; // 不用驗證的 route name
  const token = localStorage.getItem('access_token');

  if (!token && !publicPages.includes(to.name as string)) {
    // 如果没有 token，又不是公開页，就重定向到 HomeDashboard
    return { name: 'HomeDashboard' };
  }
  return true;
});

export default router;
