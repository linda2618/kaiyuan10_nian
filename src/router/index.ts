import { get } from "lodash";
import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from "vue-router";
import { ROUTER_VIEW_KEY, LOGIN_PATH } from "@/utils/Constants";
import Index from "@/views/Index/Index.vue";
import { lpk } from "@/config/lpk";

type RouteRecordRawExt = RouteRecordRaw & { children?: RouteRecordRawExt[] };
let giAllRoutes: RouteRecordRawExt[] = [];

export const initRouter: () => Router = () => {
  let routes: RouteRecordRawExt[] = [
    { path: "/", redirect: "/index" },
    {
      path: "/index",
      name: "index",
      component: Index,
      meta: {
        title: lpk("page.index.Title"),
        requireAuth: false,
        hostRouterViewKey: ROUTER_VIEW_KEY.Index,
      },
      children: [
        {
          path: "",
          name: "home",
          component: () => import("@/views/Index/Home.vue"),
          meta: {
            requireAuth: false,
          },
        },
        {
          path: "/my",
          name: "my",
          component: () => import("@/views/My/My.vue"),
          meta: {
            title: lpk("page.my.Title"),
            keepAlive: false,
          },
        },
      ],
    },
    {
      path: LOGIN_PATH,
      name: "login",
      component: () => import("@/views/Login/Login.vue"),
      meta: { title: lpk("page.login.Title"), requireAuth: false },
    },
    {
      path: "/regist",
      name: "regist",
      component: () => import("@/views/Login/Regist.vue"),
      meta: { title: lpk("page.regist.Title"), requireAuth: false },
    },
  ];

  routes.push({
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  });
  giAllRoutes = routes;

  gatherBelongToRoute();

  /*
       
        location / {
            try_files $uri $uri/ @router;
            index  index.html index.htm;
        }

        location @router {
            rewrite ^.*$ /index.html last;
        }
    */
  const iRouter = createRouter({
    history: createWebHistory(),
    routes: [],
  });

  iRouter.beforeEach((to, from, next) => {
    const stLoginUserId = get(app.getAppCtl().getLoginUser(), "id", "");
    if (
      !stLoginUserId &&
      to.matched.some(
        (record) => false !== get(record, "meta.requireAuth", true)
      )
    ) {
      next({
        path: LOGIN_PATH,
        query: { redirect: to.fullPath },
      });

      return;
    }
    if (stLoginUserId && to.path == LOGIN_PATH) {
      next("/");
      return;
    }

    next();
  });

  iRouter.afterEach((to, from) => {
    const title = get(to, "meta.title", "");
    title && (document.title = title);
  });

  return iRouter;
};

//! 鏀堕泦鎵€鏈?瀹夸富RouterView"瀵瑰簲鐨勫悇涓氬姟妯″潡娉ㄥ唽鐨?灞炰簬瀛愯矾鐢?
const gatherBelongToRoute = () => {
  const _Do = (hostRoute: RouteRecordRawExt, giRoutes: RouteRecordRawExt[]) => {
    const stHoldRouterViewKey = get(hostRoute, "meta.hostRouterViewKey");
    if (!stHoldRouterViewKey || !giRoutes.length) {
      return;
    }

    for (let i = 0; i < giRoutes.length; ) {
      const iFindItem = giRoutes[i];
      // 瀹夸富璺敱涓哄皢瑕佹煡鎵捐矾鐢辨暟缁勪腑鐨勪竴鍛? 鍒欏仠姝㈡煡鎵?
      if (hostRoute == iFindItem) {
        i++;
        continue;
      }

      if (stHoldRouterViewKey == get(iFindItem, "meta.belongToRouterViewKey")) {
        hostRoute.children = hostRoute.children || [];
        hostRoute.children.push(iFindItem);
        giRoutes.splice(i, 1);
      } else {
        iFindItem.children && _Do(hostRoute, iFindItem.children);
        i++;
      }
    }
  };

  giAllRoutes.map((item) => _Do(item, giAllRoutes));
};

function next(): any {
  throw new Error("Function not implemented.");
}
