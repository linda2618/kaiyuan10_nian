import { get } from "lodash";
import { THEME_OPTIONS } from "@/utils/Constants";

// =============================================================================
// =系统主题的定义
const stThemeStorageName: string = "theme"; //储存主题字段的名称

const stDefaultTheme: string = THEME_OPTIONS[0]; //默认主题

let stCurUseTheme: string = ""; //当前使用系统主题

//初始化系统主题
export const initTheme = () => {
  changeTheme(getTheme(), false);
};

//切换主题
export const changeTheme = (
  stArgTheme: string,
  bIsNeedSave: boolean = true
) => {
  if (!THEME_OPTIONS.find((stThemeItem) => stThemeItem == stArgTheme)) {
    return;
  }

  document.documentElement.setAttribute("data-theme", stArgTheme);

  if (!bIsNeedSave || stArgTheme == stCurUseTheme) {
    return;
  }

  //如果用户已登录，那么需要调用API更新2自定义的主题’
  //在本地保存主体
  stCurUseTheme = stArgTheme;
  Tools.LocalStorage.setItem(stThemeStorageName, stCurUseTheme);
};

//获取当前正在使用的主体
export const getTheme = () => {
  if (stCurUseTheme) {
    return stCurUseTheme;
  }

  const iLoginUser = app.getAppCtl().getLoginUser();

  stCurUseTheme = get(iLoginUser, "cust.theme");

  stCurUseTheme =
    stCurUseTheme || Tools.LocalStorage.getItem(stThemeStorageName);

  return stCurUseTheme;
};
