import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  countriesLoad,
  getPersonalInformation,
  linkIsNotClicked,
  positionsLoad,
  resetDirtyStatusFormCv
} from '../redux/actions';
import { useParams } from 'react-router-dom';
import { selectLinkIsClicked } from '../pages/PersonalDetails/selectors';

export const usePersonalInformation = () => {
  const { uuid } = useParams();
  const dispatch = useDispatch();
  const linkIsClicked = useSelector(selectLinkIsClicked);
  useEffect(() => {
    dispatch(countriesLoad());
    dispatch(positionsLoad());
    if (uuid) {
      dispatch(getPersonalInformation(uuid));
    }
    return () => {
      dispatch(linkIsNotClicked());
      dispatch(resetDirtyStatusFormCv());
    };
  }, []);

  if (uuid) {
    const { personalInformation } = useSelector((state) => state.specificCvReducer);
    return { personalInformation, linkIsClicked };
  } else {
    const { personalInformation } = useSelector((state) => state.constructorCvReducer);
    return { personalInformation, linkIsClicked };
  }
};
