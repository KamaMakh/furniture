// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
// const fs = require("fs");
module.exports = {
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true
    }
  },
  devServer: {
    // port: 8080, // CHANGE YOUR PORT HERE!
    // https: false,
    // hotOnly: false
    // https: {
    //   key: fs.readFileSync("./certs/server.key"),
    //   cert: fs.readFileSync("./certs/server.crt"),
    //   ca: fs.readFileSync("./certs/ca.crt")
    // }
  }
};
