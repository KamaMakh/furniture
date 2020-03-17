const serverUrl =
  process.env.NODE_ENV === "development"
    ? "//151.248.122.207:8080/test"
    : "//stroy-assist-backend.ru:8443/test";

export let furnitureUrls = {
  createGroupUrl: `${serverUrl}/api/furniture/group/create`,
  updateGroupUrl: `${serverUrl}/api/furniture/group/update`,
  getFurnitureUrl: `${serverUrl}/api/furniture/get`,
  getUnitsUrl: `${serverUrl}/api/directory/units/get`,
  getNomenclatureUrl: `${serverUrl}/api/furniture/nomenclature/get`,
  createNomenclatureUrl: `${serverUrl}/api/furniture/nomenclature/create`,
  deleteNomenclatureUrl: `${serverUrl}/api/furniture/nomenclature/delete`,
  updateNomenclatureUrl: `${serverUrl}/api/furniture/nomenclature/update`,
  buyNomenclatureUrl: `${serverUrl}/api/furniture/nomenclature/status/buy`,
  getAllSumUrl: `${serverUrl}/api/furniture/group/sum/all`,
  getGroupSumUrl: `${serverUrl}/api/furniture/group/sum`
};
