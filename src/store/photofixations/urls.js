const serverUrl =
  process.env.NODE_ENV === "development"
    ? "//151.248.122.207:8080/test"
    : "//stroy-assist-backend.ru:8443/test";

export let galleryUrls = {
  addFixationUrl: `${serverUrl}/api/photofixation/add`,
  updateFixationUrl: `${serverUrl}/api/photofixation/update`,
  addPhotoUrl: `${serverUrl}/api/photofixation/photo/add`,
  deletePhotoUrl: `${serverUrl}/api/photofixation/photo/delete`,
  getOnePhotoUrl: `${serverUrl}/api/photofixation/photo/get`,
  getAllPhotosUrl: `${serverUrl}/api/photofixation/getall`,
  getConstructionsUrl: `${serverUrl}/api/photofixation/project/get/all`
};
