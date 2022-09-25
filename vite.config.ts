import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

import autoprefixer from "autoprefixer";
import postCssPxToRem from "postcss-pxtorem";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", "json", ".vue", ".mjs"],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/global-scss-var.scss" as *;`,
      },
    },
    // vite 中已集成了 postcss
    // https://vitejs.cn/config/#css-postcss
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: [
            "Android 4.1",
            "iOS 7.1",
            "Chrome > 31",
            "ff > 31",
            "ie >= 8",
            "> 1%",
          ],
          grid: true,
        }),
        {
          // 去除警告: [WARNING] "@charset" must be the first rule in the file
          postcssPlugin: "internal:charset-removal",
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === "charset") {
                atRule.remove();
              }
            },
          },
        },
        postCssPxToRem({
          rootValue: 100,
          propList: ["*"],
          selectorBlackList: [".norem"],
          exclude: /node_modules/i,
        }),
      ],
    },
  },
});
