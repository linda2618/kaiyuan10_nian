// 定义将会用到的系统配置信息

export interface ISysCfgBModItem {
  //业务模块
  name: string; //模块名称
  enable: boolean; //是否启用
}

//配置信息的类型
export interface ISysCfg {
  baseUrl: string; //主机地址 监听端口
  bmodNames: ISysCfgBModItem[];
}

const iSysCfg: ISysCfg = {
  baseUrl: "http://localhost:5173/",
  bmodNames: [
    {
      name: "blog",
      enable: false,
    },
  ],
};

export default iSysCfg;
