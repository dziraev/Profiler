import { useDispatch, useSelector } from 'react-redux';
import { 
  photoUpdateCabinet,
  photoUploadCabinet,
  uploadedPhoto,
  failedToSave,
  closePhotoModal,
  photoFailedCabinet,
  savedSuccessfully
 } from '../redux/actions';
import { selectPersonalDetails } from '../pages/PersonalDetails/selectors';
import photoapi from '../http/photoapi';

export const useChangePhotoCabinet = (file) => {
  const dispatch = useDispatch();
  dispatch(photoFailedCabinet(file));
  const personalDetails = useSelector(selectPersonalDetails);
  return async (file) => {
    try {
      const response = await photoapi.put(`/images/${personalDetails.profileImageUuid}`, {
        image: file
      })
      dispatch(photoUpdateCabinet(response.data.uuid));
      dispatch(photoUploadCabinet(URL.createObjectURL(file)));
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