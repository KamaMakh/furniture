const serverUrl =
  process.env.NODE_ENV === "development"
    ? "//151.248.122.207:8080/test/api"
    : "//stroy-assist-backend.ru:8443/test/api";

export let statisticsUrls = {
  getConstructionsUrl: `${serverUrl}/project/get/all`,
  allTransfers: `${serverUrl}/nomenclature/transfer/storageandproject/getall`,
  searchTransfer: `${serverUrl}/nomenclature/transfer/search`
};
