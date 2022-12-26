export const findCodeByCountryId = (phoneCodes, countryId) => {
  const foundPhoneCode = phoneCodes.find((phoneCode) => phoneCode.country.id === countryId);
  return foundPhoneCode?.code;
};
