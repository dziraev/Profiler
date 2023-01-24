export const initialState = {
  personalInformation: {
    name: '',
    surname: '',
    country: '',
    countryId: '',
    position: '',
    positionId: '',
    city: '',
    readyToRelocate: 0,
    readyForRemoteWork: 0
  }
};

export const personalInformationReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
