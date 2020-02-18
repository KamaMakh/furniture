const serverUrl =
  process.env.NODE_ENV === "development"
    ? "//151.248.122.207:8080"
    : "//stroy-assist-backend.ru:8443";

export let userUrls = {
  getVerifyCodeUrl: `${serverUrl}/api/user/mail/getcode`,
  sendVerifyCodeUrl: `${serverUrl}/api/user/mail/send`,
  getCountriesUrl: `${serverUrl}/api/directory/countries/get`,
  getCitiesUrl: `${serverUrl}/api/directory/cities/get`,
  updateProfileUrl: `${serverUrl}/api/user/profile/update`
};
