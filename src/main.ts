import { createApp } from "vue";
import App from "./App.vue";
import "./assets/fonts/iconfont.css";
import "./assets/styles/global.less";
import "normalize.css/normalize.css";
import { initApp, initGlobalComponents } from "./config/init";

(async () => {
  //初始化系统基础配置信息（保证所有模块的基础数据加载完后，才创建UI）
  //1.全局变量（app），语言包(lpk),Ajax, Tools 的定义
  //2.异步加载基础模块的配置信息
  //  1)加载系统当前的状态信息
  //  2）加载当前登录用户的个人信息
  //3.异步加载业务模块，并完成基础的初始化
  initApp();

  //初始化UI
  const uiApp = createApp(App);

  //注册全局组件
  initGlobalComponents(uiApp);

  //------------------------------
  //向根组件绑定全局对象
  uiApp.config.globalProperties.app = window.app;
  uiApp.config.globalProperties.Tools = window.Tools;
  uiApp.config.globalProperties.lpk = window.lpk; //语言包

  //初始化状态管理与路由，并渲染根组件

  uiApp.mount("#app");
})();
