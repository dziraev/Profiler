import { useEffect, useState } from 'react';
import { ANIMATION_TIME } from './Layout/consts';

export const useMount = ({ show }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (show && !mounted) {
      setMounted(true);
    } else if (!show && mounted) {
      setTimeout(() => {
        setMounted(false);
      }, ANIMATION_TIME);
    }
  }, [show]);
  return {
    mounted
  };
};
