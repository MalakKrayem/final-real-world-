import Vue from "vue";
import VueRouter from "vue-router";
import EventList from "../views/EventList.vue";
import EventShow from "../views/EventShow.vue";
import EventCreate from "../views/EventCreate.vue";
import NProgress from "nprogress";
import store from "@/store";
import NotFound from "../views/NotFound.vue";
import NetworkIssue from "../views/NetworkIssue.vue";
import Example from "../views/Example.vue";
import LogOut from "../views/LogOut.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "list",
    component: EventList,
    props: true,
  },
  {
    path: "/event/:id",
    name: "show",
    component: EventShow,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store
        .dispatch("event/fetchEvent", routeTo.params.id)
        .then((event) => {
          routeTo.params.event = event;
          next();
        })
        .catch((error) => {
          if (error.response && error.response.status == 404) {
            next({ name: "404", params: { resource: "event" } });
          } else {
            next({ name: "Network" });
          }
        });
    },
  },
  {
    path: "/",
    name: "create",
    component: EventCreate,
  },
  {
    path: "/404",
    name: "404",
    component: NotFound,
    props: true,
  },
  {
    path: "/network-issue",
    name: "Network",
    component: NetworkIssue,
  },
  {
    path: "*",
    redirect: { name: "404", params: { resource: "page" } },
  },
  {
    path: "/example",
    component: Example,
  },
  {
    path: "/log-out",
    name: "logout",
    component: LogOut,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((routeTO, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
