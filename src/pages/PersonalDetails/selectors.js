export const filterCountriesByPrefix = (countries, prefix) =>
  countries.filter((country) => country.countryName.toLowerCase().startsWith(prefix));

export const selectPersonalDetails = (state) => state.personalDetailsReducer.personalDetails;
export const selectPersonalDetailsPhoneCodeId = (state) =>
  state.personalDetailsReducer.personalDetails.phoneCodeId;
