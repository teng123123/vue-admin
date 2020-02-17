import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
// 引入布局组件
import Layout from "@/views/Layout/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login",
    hidden:true,
    meta:{
      name:"主页"
    }
  },
  {
    path: "/login",
    name: "Login",
    hidden:true,
    meta:{
      name:"登录"
    },
    component: () => import("../views/Login/index.vue")
  },
  {
    path: "/console",
    name: "Console",
    redirect:"index",
    hidden:false,
    meta:{
      name:"控制台",
      icon:"menu"
    },
    component: Layout,
    children:[
      {  
      path: "/index",
      name: "Index",
      meta:{
        name:"首页"
      },
      component: () => import("../views/Console/index.vue")}
    ]
  },
  /**
   * 信息管理************************************************
   */
  {
    path: "/info",
    name: "Info",
    hidden:false,
    meta:{
      name:"信息管理",
      icon:"info"
    },
    component: Layout,
    children:[
      {  
      path: "/infoIndex",
      name: "InfoIndex",
      meta:{
        name:"信息列表"
      },
      component: () => import("../views/Info/index.vue")},
      {  
        path: "/category",
        name: "CategoryIndex",
        meta:{
          name:"信息分类"
        },
        component: () => import("../views/Info/category.vue")}
    ]
  },
  /**
   * 用户管理************************************************
   */
  {
    path: "/user",
    name: "User",
    hidden:false,
    meta:{
      name:"用户管理",
      icon:"admin"
    },
    component: Layout,
    children:[
      {  
      path: "/userIndex",
      name: "UserIndex",
      meta:{
        name:"用户列表"
      },
      component: () => import("../views/User/index.vue")},
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
