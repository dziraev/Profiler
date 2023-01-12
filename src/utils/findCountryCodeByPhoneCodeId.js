export const findCountryCodeByPhoneCodeId = (phoneCodes, phoneCodeId) => {
  const phoneCode = phoneCodes.find((phoneCode) => phoneCode.id === phoneCodeId);
  if (phoneCode && phoneCode.country) return phoneCode;
};
