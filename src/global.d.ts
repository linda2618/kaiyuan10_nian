//扩展window对象的类型
import { IApp } from "./config/app";
import { ITools } from "./utils/Tools";
declare global {
  declare namespace GlobalType {
    type IKey = string | number;
    type IRecord = Record<IKey, any>;
  }

  const app: IApp;
  const Tools: ITools;
  interface Window {
    app: GlobalType.IRecord;
  }
}
declare module "vue" {
  interface ComponentCustomProperties {
    app: IApp; //全局app对象， 挂载一些全局数据与操作方法
    tools: ITools; //全局工具库对象，其中包含一些公用方法
  }
}
export {};
