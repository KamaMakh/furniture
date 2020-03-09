const serverUrl =
  process.env.NODE_ENV === "development"
    ? "//151.248.122.207:8080/test"
    : "//stroy-assist-backend.ru:8443/test";

export let constructionUrls = {
  inviteUserUrl: `${serverUrl}/api/furniture/project/invite`, //устарело
  invitemultipartUrl: `${serverUrl}/api/reginvite/invite`,
  getConstructionUrl: `${serverUrl}/api/project/getone`,
  removeUserUrl: `${serverUrl}/api/reginvite/delete`
};
