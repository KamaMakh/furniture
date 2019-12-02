/* eslint-disable */
import axios from "axios";
import VueCookies from "vue-cookies";

export default ({ Vue, ssrContext }) => {
  const headers = {"Accept-Language": VueCookies.get("lang") || "en"};
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common = headers;

  Vue.prototype.$axios = axios;
};

export { axios };
