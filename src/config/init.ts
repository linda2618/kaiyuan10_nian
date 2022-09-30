import app from "./app";
import Tools from "@/utils/Tools";

//声明全局变量相关的类型
type IGlobalVarsKey = "app" | "ipk" | "Tools" | "Ajax";
type IGlobalVars = {
  [key in IGlobalVarsKey]?: any;
};
const IGlobalVars: GlobalType.IRecord = {
  app, //全局应用对象，包含一些全局数据与操作的方法
  Tools,
};

//开始向window上面挂载全局变量
Object.keys(IGlobalVars).forEach((stKey) => {
  (window as any)[stKey as IGlobalVarsKey] =
    IGlobalVars[stKey as IGlobalVarsKey];
});

export const initApp = async () => {};
