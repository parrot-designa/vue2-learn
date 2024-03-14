import Vue from "../src/my-vue";
//import Vue from "vue";
import App from "./App.vue";

new Vue({
  render: (h) =>
    h(
      "h1",
      {
        style: {
          color: "red",
        },
      },
      "hello"
    ),
}).$mount("#app");
