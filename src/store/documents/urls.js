const serverUrl =
  process.env.NODE_ENV === "development"
    ? "//151.248.122.207:8080/test"
    : "//stroy-assist-backend.ru:8443/test";

export let documentsUrls = {
  addDocUrl: `${serverUrl}/api/estimate/add`,
  getOneDocUrl: `${serverUrl}/api/estimate/get`,
  getAllDocsUrl: `${serverUrl}/api/estimate/findbyproject`,
  changeDocStatusUrl: `${serverUrl}/api/estimate/status/change`,
  getConstructionsUrl: `${serverUrl}/api/estimate/project/get/all`
};
