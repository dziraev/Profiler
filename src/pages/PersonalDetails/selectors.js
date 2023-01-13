export const filterCountriesByPrefix = (countries, prefix) =>
  countries.filter((country) => country.countryName.toLowerCase().startsWith(prefix));

export const selectPersonalDetails = (state) => state.personalDetailsReducer.personalDetails;

export const selectNamePersonalDetails = (state) =>
  state.personalDetailsReducer.personalDetails.name;

export const selectIsDirtyFormPD = (state) => state.editModeReducer.isDirtyFormPD;

export const selectLinkIsClicked = (state) => state.linkIsClickedReducer.linkIsClicked;

export const selectPersonalDetailsPhoneCodeId = (state) =>
  state.personalDetailsReducer.personalDetails.phoneCodeId;
