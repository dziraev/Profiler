export const findPhoneCodeByCountryId = (phoneCodes, countryId) => {
  return phoneCodes.find((phoneCode) => phoneCode.country.id === countryId);
};
export const findCountryFlagByPhoneCodeId = (phoneCodes, phoneCodeId) => {
  const phoneCodeObj = phoneCodes.find((obj) => obj.id === +phoneCodeId);
  if (phoneCodeObj && phoneCodeObj.country) return phoneCodeObj.country.countryName;
};

export const findCountryFlagByPhoneCode = (phoneCodes, phoneCode) => {
  const phoneCodeObj = phoneCodes.find((obj) => obj.code === phoneCode);
  if (phoneCodeObj && phoneCodeObj.country) return phoneCodeObj.country.countryName;
};
