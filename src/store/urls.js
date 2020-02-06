const serverUrl =
  process.env.NODE_ENV === "development"
    ? "//151.248.122.207:8080"
    : "//stroy-assist-backend.ru:8443";
const loginUrl = `${serverUrl}/api/auth/login`;
const registerUrl = `${serverUrl}/api/auth/reg`;
const furnitureConstructsUrl = `${serverUrl}/api/furniture/project/get/all`;
const createConstructUrl = `${serverUrl}/api/project/create`;
const updateConstructUrl = `${serverUrl}/api/project/update`;
const createFurnitureGroup = `${serverUrl}/api/furniture/group/create`;
const updateFurnitureGroup = `${serverUrl}/api/furniture/group/update`;
const getFurniture = `${serverUrl}/api/furniture/get`;
const getUnitsUrl = `${serverUrl}/api/directory/units/get`;
const createNomenclatureUrl = `${serverUrl}/api/furniture/nomenclature/create`;
const getNomenclatureUrl = `${serverUrl}/api/furniture/nomenclature/get`;
const deleteNomenclatureUrl = `${serverUrl}/api/furniture/nomenclature/delete`;
const updateNomenclatureUrl = `${serverUrl}/api/furniture/nomenclature/update`;
const getMe = `${serverUrl}/api/user/profile/get`;
const statusConfirmUrl = `${serverUrl}/api/furniture/nomenclature/status/confirm`;
const deletePhotoUrl = `${serverUrl}/api/furniture/nomenclature/photo/delete`;
const addPhotoUrl = `${serverUrl}/api/furniture/nomenclature/photo/add`;
const getCurrenciesUrl = `${serverUrl}/api/directory/currency/get`;
const getCodeUrl = `${serverUrl}/api/auth/resetpswd/getcode`;
const sendCodeUrl = `${serverUrl}/api/auth/resetpswd/sendcode`;
const sendNewPasswordUrl = `${serverUrl}/api/auth/resetpswd/newpswd`;
const getSubscribesListUrl = `${serverUrl}/api/payment/price/get`;
const createOrderUrl = `${serverUrl}/api/payment/tinkoff/order/create`;
const uploadAvatarUrl = `${serverUrl}/api/user/profile/avatar/update`;
const inviteUserUrl = `${serverUrl}/api/furniture/project/invite`;

export {
  serverUrl,
  loginUrl,
  registerUrl,
  furnitureConstructsUrl,
  createConstructUrl,
  updateConstructUrl,
  createFurnitureGroup,
  updateFurnitureGroup,
  getFurniture,
  getUnitsUrl,
  createNomenclatureUrl,
  getNomenclatureUrl,
  getMe,
  statusConfirmUrl,
  deleteNomenclatureUrl,
  updateNomenclatureUrl,
  deletePhotoUrl,
  addPhotoUrl,
  getCurrenciesUrl,
  getCodeUrl,
  sendCodeUrl,
  sendNewPasswordUrl,
  getSubscribesListUrl,
  createOrderUrl,
  uploadAvatarUrl,
  inviteUserUrl
};
