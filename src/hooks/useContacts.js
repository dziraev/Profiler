import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  linkIsNotClicked,
  phoneCodesLoad,
  resetDirtyStatusFormCv
} from '../redux/actions';

export const useContacts = () => {
  const { uuid } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(phoneCodesLoad());
    if (uuid) {
    }
    return () => {
      dispatch(linkIsNotClicked());
      dispatch(resetDirtyStatusFormCv());
    };
  }, []);

  const { contacts } = useSelector((state) => state.constructorCvReducer);
  return contacts;
};
