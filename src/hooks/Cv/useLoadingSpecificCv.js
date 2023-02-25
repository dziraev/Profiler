import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoadingSpecificCv, selectNotFoundSpecificCv } from '@cvSteps/selectors';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { specificCvNotFoundReset, updateFieldsInSpecificCv } from '@actions';

export const useLoadingSpecificCv = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoadingSpecificCv);
  const notFound = useSelector(selectNotFoundSpecificCv);
  useEffect(() => {
    if (notFound) {
      navigate('/main/my-cv');
      dispatch(specificCvNotFoundReset());
    }
    return () => dispatch(updateFieldsInSpecificCv({ isLoading: true }));
  }, [notFound]);

  return isLoading;
};
