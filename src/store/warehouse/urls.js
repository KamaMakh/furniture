const serverUrl =
  process.env.NODE_ENV === "development"
    ? "//151.248.122.207:8080/test/api"
    : "//stroy-assist-backend.ru:8443/test/api";

export let warehouseUrls = {
  create: `${serverUrl}/storage/create`,
  update: `${serverUrl}/storage/update`,
  getAll: `${serverUrl}/storage/get/all`,
  createGroup: `${serverUrl}/storage/group/create`,
  updateGroup: `${serverUrl}/storage/group/update`,
  createNomenclature: `${serverUrl}/storage/group/nomenclature/create`,
  getGroupNomenclatures: `${serverUrl}/storage/group/nomenclature/getall`,
  getProjectGroupNomenclatures: `${serverUrl}/project/group/nomenclature/getall`,
  getProjectGroups: `${serverUrl}/project/group/getall`,
  updateNomenclature: `${serverUrl}/storage/group/nomenclature/update`,
  getConstructionsUrl: `${serverUrl}/project/get/all`,
  deletePhoto: `${serverUrl}/nomenclature/photo/delete`,
  addphoto: `${serverUrl}/nomenclature/photo/add`,
  getAllSum: `${serverUrl}/storage/group/sum/all`,
  getGroupSum: `${serverUrl}/storage/group/sum`,
  storageToProject: `${serverUrl}/nomenclature/transfer/storagetoproject`
};
