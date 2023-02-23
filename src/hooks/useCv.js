import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allCvLoad } from '@actions';
import { selectCvsObj } from '@cvSteps/selectors';

export const useCv = () => {
  const dispatch = useDispatch();
  const cvs = useSelector(selectCvsObj);
  useEffect(() => {
    dispatch(allCvLoad());
  }, []);

  return cvs;
};
