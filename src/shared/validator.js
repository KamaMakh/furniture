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
