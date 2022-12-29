export const findPhoneCodeByCountryId = (phoneCodes, countryId) => {
  return phoneCodes.find((phoneCode) => phoneCode.country.id === countryId);
};
export const findCountryFlagByPhoneCodeId = (phoneCodes, phoneCodeId) => {
  const phoneCode = phoneCodes.find((phoneCode) => phoneCode.id === phoneCodeId);
  if (phoneCode && phoneCode.country) return phoneCode.country.countryName;
};
