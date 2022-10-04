import syscfg from "./config/syscfg";
// import { initRoutes } from "./router";

const stModuleName = syscfg.module;

//业务模块入口
export const entryInit = async () => {
  //如果未开启当前业务模块，终止初始化处理
  if (!app.checkBmodIsEnable(stModuleName)) {
    return;
  }

  //初始化当前模块语言包
  app.getAppCtl().mergeLpk(import.meta.glob("./locales/*", { eager: true }));

  //初始化当前模块的配置信息

  //初始化当前模块的路由信息
  //   initRoutes();
};

export default {};
