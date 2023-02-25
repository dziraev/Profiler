import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  photoUpdateCV,
  photoUpdateInSpecificCV,
  photoUploadCV,
  uploadedPhoto,
  photoFailedCV,
  failedToSave,
  savedSuccessfully,
  closePhotoModal
} from '@actions';
import photoapi from '../http/photoapi';

export const useUploadPhotoCV = (file) => {
  const dispatch = useDispatch();
  const { uuid } = useParams();
  return async (file) => {
    dispatch(photoFailedCV(file));
    try {
      const response = await photoapi.post('/images', {
        image: file
      });
      if (uuid) {
        dispatch(photoUpdateInSpecificCV(response.data.uuid));
      } else {
        dispatch(photoUpdateCV(response.data.uuid));
      }
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
  };
};
