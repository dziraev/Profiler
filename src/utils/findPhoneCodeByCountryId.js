export const findPhoneCodeByCountryId = (phoneCodes, countryId) => {
  return phoneCodes.find((phoneCode) => phoneCode.country.id === countryId);
};
