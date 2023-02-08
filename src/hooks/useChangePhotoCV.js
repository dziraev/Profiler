import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { 
  photoUploadCV,
  uploadedPhoto,
  photoFailedCV,
  failedToSave,
  savedSuccessfully
 } from '../redux/actions';
import photoapi from '../http/photoapi';

export const useChangePhotoCV = (file) => {
  const dispatch = useDispatch();
  dispatch(photoFailedCV(file));
  const { uuid } = useParams();
  const personalInformationConstructor = useSelector((state) => state.constructorCvReducer.personalInformation);
  const personalInformationSpecific = useSelector((state) => state.specificCvReducer.personalInformation);
  const personalInformation = uuid ? personalInformationSpecific : personalInformationConstructor;

  return async (file) => {
    try {
      const response = await photoapi.put(`/images/${personalInformation.imageUuid}`, {
        image: file
      })
      dispatch(photoUploadCV(URL.createObjectURL(file)));
      dispatch(closePhotoModal());
      dispatch(uploadedPhoto());
      dispatch(savedSuccessfully());
    } catch (e) {
      dispatch(savedSuccessfully());
      dispatch(closePhotoModal());
      dispatch(failedToSave());
      console.error(e);
    }
  }
};