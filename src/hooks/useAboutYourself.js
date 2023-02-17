import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  getAboutYourselfSpecificCv,
  linkIsNotClicked,
  resetDirtyStatusInConstructorCv,
  resetDirtyStatusInSpecificCv
} from '@actions';
import {
  selectAboutYourselfFromConstructorCv,
  selectAboutYourselfFromSpecificCv,
  selectIsAboutYourselfExists
} from '@cvSteps/selectors';

export const useAboutYourself = () => {
  const { uuid } = useParams();
  const dispatch = useDispatch();
  const isAboutYourselfExists = useSelector(selectIsAboutYourselfExists);
  useEffect(() => {
    // dispatch(getAboutYourselfSpecificCv(uuid));
    return () => {
      dispatch(linkIsNotClicked());
      if (isAboutYourselfExists) {
        dispatch(resetDirtyStatusInSpecificCv());
      } else {
        dispatch(resetDirtyStatusInConstructorCv());
      }
    };
  }, [isAboutYourselfExists]);

  if (false) {
    return {
      aboutYourself: useSelector(selectAboutYourselfFromSpecificCv),
      isAboutYourselfExists
    };
  } else {
    return {
      aboutYourself: useSelector(selectAboutYourselfFromConstructorCv),
      isAboutYourselfExists
    };
  }
};
