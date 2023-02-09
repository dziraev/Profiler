export const selectCvsObj = (state) => state.cvsReducer;

export const selectIsDirtyFormConstructorCv = (state) => state.constructorCvReducer.isDirtyFormCv;
export const selectIsDirtyFormSpecificCv = (state) => state.specificCvReducer.isDirtyFormCv;

export const selectIsLoadingConstructorCv = (state) => state.constructorCvReducer.isLoading;
export const selectIsLoadingSpecificCv = (state) => state.specificCvReducer.isLoading;
export const selectNotFoundSpecificCv = (state) => state.specificCvReducer.notFound;

export const selectIsContactsExists = (state) => state.specificCvReducer.isContactsExists;
export const selectContactsFromSpecificCv = (state) => state.specificCvReducer.contacts;
export const selectContactsFromConstructorCv = (state) => state.constructorCvReducer.contacts;
