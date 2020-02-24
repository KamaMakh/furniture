/* eslint-disable */
export function isNameJoe(value) {
  if (!value) return true;
  return value === "Joe";
}

export function notGmail(value = "") {
  return !value.includes("gmail");
}

export function isHasNumber(value) {
  if(value === undefined || value === null) return false;
  return /\d/.test(value);
}

export function isNotCyrillic(value) {
  if(value === undefined || value === null) return false;
  return !/[а-я]/i.test(value.toLowerCase());
}

export function isHasEnglishLetter(value) {
  if(value === undefined || value === null) return false;
  return /[a-z]/i.test(value.toLowerCase());
}

export function isEmail(value) {
  if(value === undefined || value === null) return false;
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(value).toLowerCase());
}

export function sameAs(value1, value2) {
  return value1 === value2
}
