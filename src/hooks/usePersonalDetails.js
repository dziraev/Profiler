import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLinkIsClicked, selectPersonalDetails } from '../pages/PersonalDetails/selectors';
import {
  countriesLoad,
  linkIsNotClicked,
  phoneCodesLoad,
  positionsLoad,
  resetDirtyStatusFormPD
} from '../redux/actions';

export const usePersonalDetails = () => {
  const dispatch = useDispatch();
  const personalDetails = useSelector(selectPersonalDetails);
  const linkIsClicked = useSelector(selectLinkIsClicked);
  useEffect(() => {
    dispatch(countriesLoad());
    dispatch(phoneCodesLoad());
    dispatch(positionsLoad());
    return () => {
      dispatch(resetDirtyStatusFormPD());
      dispatch(linkIsNotClicked());
    };
  }, []);

  return {
    personalDetails,
    linkIsClicked
  };
};
