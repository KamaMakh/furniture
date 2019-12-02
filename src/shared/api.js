let axios = require("axios");
// import router from "./../router";
import VueCookies from "vue-cookies";

let axiosInstance = axios.create({
  // baseURL: process.env.NODE_ENV == "production" && process.env.VUE_APP_API_URL ? process.env.VUE_APP_API_URL : process.env.VUE_APP_API_URL_DEV,
  headers: {
    // Authorization: "Bearer " + getCookie("token"),
    "Accept-Language": VueCookies.get("lang") || "en"
  },
  // transformRequest: [
  //   function(data, headers) {
  //     headers["Authorization"] = getToken();
  //     if (
  //       headers["Content-Type"] &&
  //       headers["Content-Type"].includes("multipart/form-data")
  //     ) {
  //       return data;
  //     } else {
  //       headers["Content-Type"] = "application/json";
  //       return JSON.stringify(data);
  //     }
  //   }
  // ],
  // validateStatus: function (status) {
  //   if (status === 401 && !document.location.pathname.includes("auth/")){
  //     VueCookies.remove("token");
  //     router.push("/auth/login");
  //   }
  //   else {
  //     return true;
  //   }
  // }
  /* other custom settings */
});



// function getCookie(name) {
//   let value = "; " + document.cookie;
//   let parts = value.split("; " + name + "=");
//   if (parts.length === 2) return parts.pop().split(";").shift();
// }

// function getToken(){
//   return "Bearer " + getCookie("token");
// }

//module.exports = axiosInstance;
export default axiosInstance;
