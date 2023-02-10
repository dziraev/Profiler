import { useSelector } from 'react-redux';
import { selectIsLoadingSpecificCv, selectNotFoundSpecificCv } from '../pages/CVsteps/selectors';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const useLoadingSpecificCv = () => {
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoadingSpecificCv);
  const notFound = useSelector(selectNotFoundSpecificCv);
  useEffect(() => {
    if (notFound) {
      navigate('/main/my-cv');
    }
  }, [notFound]);
  return isLoading;
};
