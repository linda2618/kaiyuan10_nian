import mdlUserApi, { IUser } from "@/api/UserApi";
import { changeLocale, mergeLpk } from "@/config/lpk";
import { LOGIN_PATH, LOGIN_TOKEN } from "@/utils/Constants";
// import { changeTheme } from "@/config/theme";

let iLoginUser: IUser = {} as IUser;

export const initLoginUserInfo = async () => {
  if (Tools.Cookie.getItem(LOGIN_TOKEN)) {
    iLoginUser = await mdlUserApi.getSelfInfo();
  }
};

export default {
  getLoginUser(): IUser {
    return iLoginUser;
  },
  redirectToLogin() {
    document.location.href = LOGIN_PATH;
  },

  changeLocale,
  mergeLpk,
};
