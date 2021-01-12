import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import "animate.css/animate.css";
import "vue-simple-spinner/dist/vue-simple-spinner";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
library.add(faUndo);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
