import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getContactsSpecificCv, linkIsNotClicked, phoneCodesLoad } from '@actions';
import {
  selectContactsFromConstructorCv,
  selectContactsFromSpecificCv,
  selectIsContactsExists
} from '@cvSteps/selectors';

export const useContacts = () => {
  const { uuid } = useParams();
  const dispatch = useDispatch();
  const isContactsExists = useSelector(selectIsContactsExists);
  useEffect(() => {
    dispatch(phoneCodesLoad());
    dispatch(getContactsSpecificCv(uuid));
    return () => {
      dispatch(linkIsNotClicked());
    };
  }, []);

  if (isContactsExists) {
    return {
      contacts: useSelector(selectContactsFromSpecificCv),
      isContactsExists
    };
  } else {
    return {
      contacts: useSelector(selectContactsFromConstructorCv),
      isContactsExists
    };
  }
};
