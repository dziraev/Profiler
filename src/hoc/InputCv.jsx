import React from 'react';
import { InputPersonalDetails } from '@components/fields';

export const InputCv = ({ actionOnBlur, ...props }) => {
  return <InputPersonalDetails actionOnBlur={actionOnBlur} {...props} />;
};
