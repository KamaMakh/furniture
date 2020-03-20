const notGmail = (value = "") => {
  return !value.includes("gmail");
};

const isHasNumber = value => {
  if (value === undefined || value === null) return false;
  return /\d/.test(value);
};

const isNotCyrillic = value => {
  if (value === undefined || value === null) return false;
  return !/[а-я]/i.test(value.toLowerCase());
};

const isHasEnglishLetter = value => {
  if (value === undefined || value === null) return false;
  return /[a-z]/i.test(value.toLowerCase());
};

const isEmail = value => {
  if (value === undefined || value === null) return false;
  // eslint-disable-next-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase());
};

const sameAs = (value1, value2) => {
  return value1 === value2;
};

const minLength = (v, length) => {
  if (v === undefined || v === null) return false;
  return v.length >= length;
};

const required = value => {
  if (value === undefined || value === null || value === "") {
    return false;
  } else {
    return true;
  }
};

const requiredMultipleFiles = value => {
  if (
    value === undefined ||
    value === null ||
    value === "" ||
    value.length === 0
  ) {
    return false;
  } else {
    return true;
  }
};

const fileMaxSize = (value, maxSize) => {
  if (value === undefined || value === null) return false;
  return value.size <= maxSize;
};

const fileMultipleSize = (value, maxSize) => {
  if (value === undefined || value === null) return false;
  let validSize = true;
  if (value.length) {
    value.forEach(item => {
      if (item.size >= maxSize) validSize = false;
    });
  }
  return validSize;
};

const fileMaxCount = (value, maxCount) => {
  if (value === undefined || value === null) return false;
  return value.length <= maxCount;
};

const ndsCount = value => {
  if (value === undefined || value === null) return false;
  return parseInt(value) <= 100 && parseInt(value) >= 0;
};

export {
  isEmail,
  sameAs,
  notGmail,
  isHasNumber,
  isNotCyrillic,
  isHasEnglishLetter,
  minLength,
  required,
  fileMaxSize,
  fileMaxCount,
  fileMultipleSize,
  requiredMultipleFiles,
  ndsCount
};
