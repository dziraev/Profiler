import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  countriesLoad,
  getPersonalInformationInSpecificCv,
  linkIsNotClicked,
  positionsLoad,
  resetDirtyStatusInConstructorCv,
  resetDirtyStatusInSpecificCv
} from '@actions';
import { useParams } from 'react-router-dom';

export const usePersonalInformation = () => {
  const { uuid } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(countriesLoad());
    dispatch(positionsLoad());
    if (uuid) {
      dispatch(getPersonalInformationInSpecificCv(uuid));
    }
    return () => {
      dispatch(linkIsNotClicked());
      if (uuid) {
        dispatch(resetDirtyStatusInSpecificCv());
      } else {
        dispatch(resetDirtyStatusInConstructorCv());
      }
    };
  }, []);

  if (uuid) {
    const { personalInformation } = useSelector((state) => state.specificCvReducer);
    return personalInformation;
  } else {
    const { personalInformation } = useSelector((state) => state.constructorCvReducer);
    return personalInformation;
  }
};
