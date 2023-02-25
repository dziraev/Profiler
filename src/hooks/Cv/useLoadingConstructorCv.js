import { useSelector } from 'react-redux';
import { selectIsLoadingConstructorCv } from '@cvSteps/selectors';

export const useLoadingConstructorCv = () => {
  const isLoading = useSelector(selectIsLoadingConstructorCv);
  return isLoading;
};
