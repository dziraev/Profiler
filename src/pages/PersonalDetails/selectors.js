export const filterCountriesByPrefix = (countries, prefix) =>
  countries.filter((country) => country.name.toLowerCase().startsWith(prefix));

export const selectPersonalDetails = (state) => state.personalDetailsReducer.personalDetails;
