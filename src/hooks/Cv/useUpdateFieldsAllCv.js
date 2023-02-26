import { useUpdateFieldsConstructorCv, useUpdateFieldsSpecificCv } from '@hooks';

//This hook is used to update fields in ConstructorCv and SpecificCv  to up their default values
//with help two hooks useUpdateFieldsConstructorCv and useUpdateFieldsSpecificCv
export const useUpdateFieldsAllCv = () => {
  const updateFieldsConstructorCv = useUpdateFieldsConstructorCv();
  const updateFieldsSpecificCv = useUpdateFieldsSpecificCv();

  return () => {
    updateFieldsSpecificCv();
    updateFieldsConstructorCv();
  };
};
