import sysCfg, { ISysCfg, ISysCfgBModItem } from "./syscfg";
import appCtl from "@/controller/APPCtl";

const app = {
  //获取系统配置信息
  getConfig<T>(key: keyof ISysCfg): T {
    return sysCfg[key] as unknown as T;
  },
  //判断是否启用了指定的业务模块
  checkBmodIsEnable(stModultName: string) {
    const bmodName: ISysCfgBModItem[] =
      app.getConfig<ISysCfgBModItem[]>("bmodNames");

    if (bmodName.find((item) => item.name == stModultName && item.enable)) {
      return true;
    }
    return false;
  },
  getAppCtl() {
    return appCtl;
  },
};
export type IApp = typeof app;
export default app;
