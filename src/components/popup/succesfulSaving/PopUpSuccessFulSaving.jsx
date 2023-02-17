import React from 'react';
import { Portal } from '@utils/Portal';
import { useMount } from './useMount';
import Layout from '@popUps/succesfulSaving/Layout';

export const PopUpSuccessFulSaving = ({ children, show }) => {
  const { mounted } = useMount({ show });
  if (!mounted) {
    return null;
  }

  return (
    <Portal>
      <Layout show={show}>{children}</Layout>
    </Portal>
  );
};
