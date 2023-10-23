const mainLayout = () => import('@/layout/index.vue');

export const PageRoutes = [
  {
    path: '/login',
    name: Symbol(),
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录' },
  },
  {
    path: '/forget-password',
    name: Symbol(),
    component: () => import('@/views/forgetPassword/index.vue'),
    meta: { title: '忘记密码' },
  },
  {
    path: '/',
    name: Symbol(),
    component: mainLayout,
    children: [
      // {
      //   path: 'index',
      //   name: Symbol(),
      //   component: () => import('@/views/home/index.vue'),
      //   meta: {
      //     title: '首页',
      //     needLogin: false,
      //   },
      // },
      {
        path: '',
        name: Symbol(),
        component: () => import('@/views/productManage/index.vue'),
        meta: {
          title: '全部商品',
          needLogin: false,
        },
      },
      {
        path: 'product/detail',
        name: Symbol(),
        component: () => import('@/views/productManage/productDetail.vue'),
        meta: {
          title: '商品细节',
          needLogin: false,
        },
      },
      {
        path: 'create',
        name: Symbol(),
        component: () => import('@/views/create/create.vue'),
        meta: {
          title: '设计器',
          needLogin: true,
        },
      },
      {
        path: 'gallery/index',
        name: Symbol(),
        component: () => import('@/views/galleryManage/index.vue'),
        meta: {
          title: '图库管理',
          needLogin: true,
        },
      },
      {
        path: 'custom/products/index',
        name: Symbol(),
        component: () => import('@/views/customManage/products/index.vue'),
        meta: {
          title: '定制商品',
          needLogin: true,
        },
      },
      {
        path: 'settle/index',
        name: Symbol(),
        component: () => import('@/views/settleManage/index.vue'),
        meta: {
          title: '结算页',
          needLogin: true,
        },
      },
      {
        path: 'order/index',
        name: Symbol(),
        component: () => import('@/views/orderManage/list/index.vue'),
        meta: {
          title: '所有订单',
          needLogin: false,
        },
      },
      {
        path: 'order/detail',
        name: Symbol(),
        component: () => import('@/views/orderManage/detail/index.vue'),
        meta: {
          title: '订单详情',
          needLogin: true,
        },
      },
      {
        path: 'order/order-template/index',
        name: Symbol(),
        component: () => import('@/views/orderManage/orderTemplate/index.vue'),
        meta: {
          title: '导入模板',
          needLogin: true,
        },
      },
      {
        path: 'order/order-import/index',
        name: Symbol(),
        component: () => import('@/views/orderManage/orderImportList/index.vue'),
        meta: {
          title: '导入记录',
          needLogin: true,
        },
      },
      {
        path: 'order/product-relate/index',
        name: Symbol(),
        component: () => import('@/views/orderManage/productRelate/index.vue'),
        meta: {
          title: '商品关联',
          needLogin: true,
        },
      },
    ],
  },
];

export const noFoundRoutes = [
  {
    path: '/:pathMatch(.*)*',
    name: Symbol(),
    component: () => import('@/views/exception/exception404.vue'),
    meta: {
      title: '404',
    },
  },
];

export const routes = [...PageRoutes, ...noFoundRoutes];
