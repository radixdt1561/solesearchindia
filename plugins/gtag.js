import Vue from "vue";
import VueGtag from "vue-gtag";

export default ({ app }) => {
  Vue.use(
    VueGtag,
    {
      config: { id: "G-LQB4ZTV2RD" },
      appName: "SoleSearch",
      enabled: true,
      pageTrackerScreenviewEnabled: true
    },
    app.router
  );
};
