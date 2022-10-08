import app from "./app";
import Tools from "@/utils/Tools";
import { lpk, initLpk } from "@/config/lpk";
import { initLoginUserInfo } from "@/controller/APPCtl";
import { App } from "vue";
import { initTheme } from "./theme";

//声明全局变量相关的类型
type IGlobalVarsKey = "app" | "ipk" | "Tools" | "Ajax";
type IGlobalVars = {
  [key in IGlobalVarsKey]?: any;
};
const IGlobalVars: GlobalType.IRecord = {
  app, //全局应用对象，包含一些全局数据与操作的方法
  Tools, //全局工具库对象，其中包含一些公用方法
  lpk, //全局语言包支持函数
};

//开始向window上面挂载全局变量
Object.keys(IGlobalVars).forEach((stKey) => {
  (window as any)[stKey as IGlobalVarsKey] =
    IGlobalVars[stKey as IGlobalVarsKey];
});

//初始化系统的实现，导出初始化系统配置的实现，供主入口处调用
export const initApp = async () => {
  await initLoginUserInfo();

  //主题定制
  //1.针对不同主题去书写不同的样式，在系统初始化时，更具当前使用主题
  //到Server端去加载对应样式文件来使用
  //2.

  //设置系统主题样式

  initTheme();

  initLpk();

  //----------------------------
  //初始化业务模块
  const iAllEntry: GlobalType.IRecord = import.meta.glob("@/bmod/*/entry.ts", {
    eager: true,
  });
  for (const path in iAllEntry) {
    const iEntryFile = iAllEntry[path];
    iEntryFile && iEntryFile.entryInit && (await iEntryFile.entryInit());
  }
};

//-------------------------------
// /注册全局组件
export const initGlobalComponents = (uiApp: App<Element>) => {
  const iAllGlobalComponents: GlobalType.IRecord = import.meta.glob(
    "@/components/*/src/*.vue",
    { eager: true }
  );

  Object.keys(iAllGlobalComponents).map((path: string) => {
    const paths = path.split("/");
    const stCmpName = paths[paths.length - 3];

    uiApp.component(stCmpName, iAllGlobalComponents[path].default);
  });
};
