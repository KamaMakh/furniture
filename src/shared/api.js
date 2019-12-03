let axios = require("axios");

import router from "./../router";
import VueCookies from "vue-cookies";

let axiosInstance = axios.create({
  headers: {
    // "Accept-Language": VueCookies.get("lang") || "en",
    "Content-type": "application/json"
  },

  transformRequest: [(data, headers) => {
    headers["Accept-Language"] = VueCookies.get("lang") || "en";
    if (VueCookies.get("token")) {
      headers["Authorization"] = "Bearer " + VueCookies.get("token")
    }
    if (typeof data === "string") {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }, ...axios.defaults.transformRequest],
  validateStatus: function(status) {
    if (status === 401 && !document.location.pathname.includes("auth/")) {
      // VueCookies.remove("token");
      // router.push("/auth");
    } else if(
      VueCookies.get("token") ||
      ( document.location.pathname.includes("auth") ||
      document.location.pathname.includes("register") )) {
      router.push("Furniture");
    } else {
      return true;
    }
  }
  /* other custom settings */
});
export default axiosInstance;
