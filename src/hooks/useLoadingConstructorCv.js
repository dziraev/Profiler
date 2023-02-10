import { useSelector } from 'react-redux';
import { selectIsLoadingConstructorCv } from '../pages/CVsteps/selectors';

export const useLoadingConstructorCv = () => {
  const isLoading = useSelector(selectIsLoadingConstructorCv);
  return isLoading;
};
