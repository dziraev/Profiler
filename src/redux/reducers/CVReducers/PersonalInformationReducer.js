const initialState = {
  personalInformation: {
    photoUuid: '',
    name: '',
    surname: '',
    country: '',
    countryId: '',
    position: '',
    positionId: '',
    city: '',
    readyToRelocate: 0,
    readyForRemoteWork: 0,
    userInDB: false
  }
};

export const personalInformationReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
