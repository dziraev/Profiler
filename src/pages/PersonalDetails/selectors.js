export const filterCountriesByPrefix = (countries, prefix) =>
  countries.filter((country) => country.countryName.toLowerCase().startsWith(prefix));

export const selectPersonalDetails = (state) => state.personalDetailsReducer.personalDetails;
export const selectUniqueStudentIdentifier = (state) =>
  state.personalDetailsReducer.personalDetails.uniqueStudentIdentifier;

export const selectIsDirtyFormPD = (state) => state.editModeReducer.isDirtyFormPD;

export const selectLinkIsClicked = (state) => state.linkIsClickedReducer.linkIsClicked;

export const selectPersonalDetailsPhoneCodeId = (state) =>
  state.personalDetailsReducer.personalDetails.phoneCodeId;
