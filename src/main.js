import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "element-plus/theme-chalk/src/index.scss";
import "./styles/index.scss";
import * as elIcons from "@element-plus/icons-vue";

const app = createApp(App);
app.use(router).use(createPinia()).mount("#app");
const icons = elIcons;
for (const i in icons) {
  app.component(icons[i].name, icons[i]);
}
