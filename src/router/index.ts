
import Vue from 'vue'
import Router from 'vue-router'
import stores from '../vuex/index'
import user_permissions from "../common/util/user_permissions"
const NoPermission = r => require.ensure([], () => r(require('@/views/NoPermission/NoPermissionPanel.vue')));
const Login = r => require.ensure([], () => r(require('@/views/Login.vue')));
const Home = r => require.ensure([], () => r(require('@/views/layout/Home.vue')));
const clientManager = r => require.ensure([], () => r(require('@/views/client/Manager.vue')));
const clientManager2 = r => require.ensure([], () => r(require('@/views/client/Manager2.vue')));
const userManager = r => require.ensure([], () => r(require('@/views/userManagement/Manager.vue')));
Vue.use(Router)



export const routes = [
  {
    path: "/",
    hidden: true,
    redirect: {
      name: "login"
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    hidden: true
  },
  { path: '*', component: Login },

]

export const asyncRouterMap = [
  {
    path: "/client",
    name: '客户',
    component: Home,
    leaf: false,
    meta: {
    },
    children: [
      {
        path: '/client/clientManager',
        component: clientManager,
        name: 'clientManager',
        meta: {
          title: "clientManager",
        }
      },
      {
        path: '/client/clientManager2',
        component: clientManager2,
        name: 'clientManager2',
        meta: {
          title: "clientManager2",
        }
      }
    ]
  },
  {
    path: "/user",
    name: '用户管理',
    component: Home,
    leaf: true,
    meta: {
    },
    children: [
      {
        path: '/user/userManager',
        component: userManager,
        name: '用户管理',
        meta: {
          title: "用户管理",
        }
      }
    ]
  },

  {
    path: "/NoPermission",
    name: 'NoPermission',
    component: Home,
    leaf: true,
    hidden: true,
    meta: {
    },
    children: [
      {
        path: '/NoPermission/page',
        component: NoPermission,
        name: 'NoPermission',
        meta: {
          title: "NoPermission",
        }
      }
    ]
  }
]

const router = new Router({
  routes
})
router.addRoutes(asyncRouterMap);
router.beforeEach((to, from, next) => {
  // stores.state.asyncRouterMap.push(sessionStorage.getItem('asyncRouterMap'));
  let jwtToken = sessionStorage.getItem('jwtToken');
  stores.state.jwtToken = jwtToken
  // NProgress.start();
  // //判断是否需要登录权限 以及是否登录
  if (!stores.state.jwtToken && to.path !== '/login') {// 判断是否登录
    next({
      path: '/login',
    });
  } else {
    next()
  }
})
// router.beforeEach((to, from, next) => {

//   let jwtToken = sessionStorage.getItem('jwtToken');
//   stores.state.jwtToken = jwtToken;
//   if (!stores.state.jwtToken && to.path !== '/login') {// 判断是否登录
//     next({
//       path: '/login',
//     });
//   } else {
//     stores.dispatch('getPermissionList');

//     const { permissions } = to.meta;
//     if (permissions) {
//       // 判断的权限列表
//       const hasPermission = user_permissions.includePermission(permissions)
//       console.log(hasPermission);

//       if (!hasPermission) {
//         next({
//           path: '/NoPermission/page',
//         });
//         return;
//       }else{
//         next()
//       }
//     }
    
//     next()
//   }

// })
export default router