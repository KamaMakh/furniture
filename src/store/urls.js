const serverUrl = "//151.248.122.207:8080";
const loginUrl = `${serverUrl}/api/auth/login`;
const registerUrl = `${serverUrl}/api/auth/reg`;
const furnitureConstructsUrl = `${serverUrl}/api/furniture/project/get/all`;
const createConstructUrl = `${serverUrl}/api/project/create`;
const createFurnitureGroup = `${serverUrl}/api/furniture/group/create`;
const getFurniture = `${serverUrl}/api/furniture/get`;
const getUnitsUrl = `${serverUrl}/api/directory/units/get`;
const createNomenclatureUrl = `${serverUrl}/api/furniture/nomenclature/create`;
const getNomenclatureUrl = `${serverUrl}/api/furniture/nomenclature/get`;
const getMe = `${serverUrl}/api/user/profile/get`;
const statusConfirmUrl = `${serverUrl}/api/furniture/nomenclature/status/confirm`;

export {
  serverUrl,
  loginUrl,
  registerUrl,
  furnitureConstructsUrl,
  createConstructUrl,
  createFurnitureGroup,
  getFurniture,
  getUnitsUrl,
  createNomenclatureUrl,
  getNomenclatureUrl,
  getMe,
  statusConfirmUrl
};
