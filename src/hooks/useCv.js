import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allCvLoad } from '../redux/actions';
import { selectAllCv } from '../pages/CVsteps/selectors';

export const useCv = () => {
  const dispatch = useDispatch();
  const allCv = useSelector(selectAllCv);
  useEffect(() => {
    dispatch(allCvLoad());
  }, []);

  return allCv;
};
