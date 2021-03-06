import Vue from "vue";
import VueRouter from "vue-router";
import AppContainer from "../containers/AppContainer";
import AuthContainer from "../containers/AuthContainer";
import Furniture from "../views/Furniture";
import Projects from "../views/Projects";
import Statistics from "../views/Statistics";
import Login from "../views/Login";
import Registration from "../views/Registration";
import Settings from "../views/Settings";
import Documents from "../views/Documents";
import Planning from "../views/Planning";
import Users from "../views/Users";
import Index from "../views/Index";
import ConfirmText from "../views/ConfirmText";

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
        path: "/furniture",
        name: "Furniture",
        component: Furniture
      },
      {
        path: "/projects",
        name: "Projects",
        component: Projects
      },
      {
        path: "/stats",
        name: "Statistics",
        component: Statistics
      },
      {
        path: "/settings",
        name: "Settings",
        component: Settings
      },
      {
        path: "/documents",
        name: "Documents",
        component: Documents
      },
      {
        path: "/planning",
        name: "Planning",
        component: Planning
      },
      {
        path: "/users",
        name: "Users",
        component: Users
      },
      {
        path: "/privacy_policy",
        name: "ConfirmText",
        component: ConfirmText
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
  },
  {
    path: "/index",
    name: "Index",
    component: Index
  }
];

const router = new VueRouter({
  routes,
  linkActiveClass: "active"
});

export default router;
