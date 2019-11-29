import Vue from "vue";
import VueRouter from "vue-router";
import AppContainer from "../containers/AppContainer";
import Furniture from "../views/Furniture"

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: {
            name: 'Furniture'
        },
        name: "AppContainer",
        component: AppContainer,
        props: true,
        children:[
            {
                path: '/',
                name: 'Furniture',
                component: Furniture
            },
        ]
    },
];

const router = new VueRouter({
  routes
});

export default router;
