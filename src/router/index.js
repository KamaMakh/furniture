import Vue from "vue";
import VueRouter from "vue-router";
import AppContainer from "../containers/AppContainer";
import AuthContainer from "../containers/AuthContainer";
import Furniture from "../views/Furniture";
import Login from "../views/Login";
import Registration from "../views/Registration";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: {
      name: "Furniture"
    },
    name: "AppContainer",
    component: AppContainer,
    props: true,
    children: [
      {
        path: "/",
        name: "Furniture",
        component: Furniture
      }
    ]
  },
  {
    path: "/auth",
    // name: "AuthContainer",
    component: AuthContainer,
    props: true,
    children: [
      {
        path: "/",
        name: "Login",
        component: Login
      },
      {
        path: "/register",
        name: "Registration",
        component: Registration
      }
    ]
  }
];

const router = new VueRouter({
  routes,
  linkActiveClass: "active"
});

export default router;
