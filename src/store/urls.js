import { userUrls } from "../store/user/urls";
import { documentsUrls } from "../store/documents/urls";
import { galleryUrls } from "./photofixations/urls";
import { constructionUrls } from "./constructions/urls";
import { furnitureUrls } from "./furniture/urls";
import { warehouseUrls } from "./warehouse/urls";
import { statisticsUrls } from "./statistics/urls";

const serverUrl =
  process.env.NODE_ENV === "development"
    ? "//151.248.122.207:8080/test"
    : "//stroy-assist-backend.ru:8443/test";
const loginUrl = `${serverUrl}/api/auth/login`;
const registerUrl = `${serverUrl}/api/auth/reg`;
const furnitureConstructsUrl = `${serverUrl}/api/furniture/project/get/all`;
const createConstructUrl = `${serverUrl}/api/project/create`;
const updateConstructUrl = `${serverUrl}/api/project/update`;
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
const removeUserUrl = `${serverUrl}/api/reginvite/delete`;
// const buyNomenclatureUrl = `${serverUrl}/api/furniture/nomenclature/status/buy`;
const requestModuleUrl = `${serverUrl}/api/order/module`;
const invitemultipartUrl = `${serverUrl}/api/reginvite/invite`;
const getConstructionUrl = `${serverUrl}/api/project/getone`;

export {
  serverUrl,
  loginUrl,
  registerUrl,
  furnitureConstructsUrl,
  createConstructUrl,
  updateConstructUrl,
  getMe,
  statusConfirmUrl,
  deletePhotoUrl,
  addPhotoUrl,
  getCurrenciesUrl,
  getCodeUrl,
  sendCodeUrl,
  sendNewPasswordUrl,
  getSubscribesListUrl,
  createOrderUrl,
  uploadAvatarUrl,
  inviteUserUrl,
  userUrls,
  documentsUrls,
  galleryUrls,
  requestModuleUrl,
  invitemultipartUrl,
  removeUserUrl,
  getConstructionUrl,
  constructionUrls,
  furnitureUrls,
  warehouseUrls,
  statisticsUrls
};
