import { get } from "lodash";
import { LOCALE_OPTIONS } from "@/utils/Constants";

import { Locale } from "vant";
// 引入英文语言包
import enUS from "vant/es/locale/lang/en-US";

const stLocalStorageName = "locale"; //存储语言字段的名称
const tblLpk: Record<string, string | string[]> = {}; //缓存语言包内容索引

//初始系统语言环境
export const initLpk = () => {
  mergeLpk(import.meta.glob("@/locales/*", { eager: true }));
};

//初始化第三方UI库的语言包
const initThirdUILpk = () => {
  const tblThirdLpk: GlobalType.IRecord = {
    "en-US": enUS,
  };
  const stLocale = getLocale();
  tblThirdLpk[stLocale] && Locale.use(stLocale, enUS);
};

export const getLocale: () => string = () => {
  const stDefaultLocale = "zh-CN";
  let stLanguage = stDefaultLocale;

  //1优先从登录者自定义信息中获取语言环境
  stLanguage = get(app.getAppCtl().getLoginUser(), "cust.locale");
  //2.其次从本地存储中获取
  stLanguage = stLanguage || Tools.LocalStorage.getItem("");
  //3.最终使用默认语言包
  stLanguage = stLanguage || stDefaultLocale;

  return stLanguage;
};

type LpkFiles = {
  [path: string]: {
    default: Record<string, string | string[]>;
  };
};
/*
{
    'zh-CN.ts': {
        default: {
            'Index': '涓婚〉'
        }
    },
    'en-US.ts': {
        default: {
            'Index': 'Home'
        }
    }
}
*/

export const mergeLpk = (importLpkFiles: LpkFiles) => {
  const stLocaleLanguage = getLocale();
  for (const path in importLpkFiles) {
    if (-1 == path.indexOf(stLocaleLanguage)) {
      continue;
    }
    const { default: iLpkFileItem } = importLpkFiles[path];
    for (const stLpkKey in iLpkFileItem) {
      tblLpk[stLpkKey] = iLpkFileItem[stLpkKey];
    }
  }
};

export type IFnLpk = (
  key: string,
  option?: { index?: number; default?: string }
) => string | string[];

export const lpk: IFnLpk = (key, option = {}) => {
  const mixValue = tblLpk[key];

  if (Array(mixValue)) {
    return mixValue[option.index || 0] || option.default || key;
  }

  return mixValue || option.default || key;
};

//
export const changeLocale = (stLocale: string) => {
  if (!LOCALE_OPTIONS.find((stLocaleItem) => stLocaleItem == stLocale)) {
    return;
  }

  // 1.如果用户已登录，那么需要调用API 更新用户自定义语言环境信息
  // 2. 在本地缓存最新的语言包
  Tools.LocalStorage.setItem(stLocalStorageName, stLocale);
  // 3. 重新加载页面
  document.location.reload();
};
