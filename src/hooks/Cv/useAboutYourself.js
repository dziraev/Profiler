import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAboutYourselfSpecificCv, linkIsNotClicked } from '@actions';
import {
  selectAboutYourselfFromConstructorCv,
  selectAboutYourselfFromSpecificCv,
  selectIsAboutExists
} from '@cvSteps/selectors';

export const useAboutYourself = () => {
  const { uuid } = useParams();
  const dispatch = useDispatch();
  const isAboutExists = useSelector(selectIsAboutExists);
  useEffect(() => {
    dispatch(getAboutYourselfSpecificCv(uuid));
    return () => {
      dispatch(linkIsNotClicked());
    };
  }, []);

  if (isAboutExists) {
    return {
      aboutYourself: useSelector(selectAboutYourselfFromSpecificCv),
      isAboutExists
    };
  } else {
    return {
      aboutYourself: useSelector(selectAboutYourselfFromConstructorCv),
      isAboutExists
    };
  }
};
