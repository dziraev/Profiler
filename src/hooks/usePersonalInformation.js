import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { countriesLoad, getPersonalInformation, positionsLoad } from '../redux/actions';
import { useParams } from 'react-router-dom';

export const usePersonalInformation = () => {
  const { uuid } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(countriesLoad());
    dispatch(positionsLoad());
    if (uuid) {
      dispatch(getPersonalInformation(uuid));
    }
  }, []);

  if (uuid) {
    const { personalInformation } = useSelector((state) => state.specificCvReducer);
    return personalInformation;
  } else {
    const { personalInformation } = useSelector((state) => state.personalInformationReducer);
    return personalInformation;
  }
};
