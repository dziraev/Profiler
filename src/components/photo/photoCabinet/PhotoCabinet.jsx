import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDeletePhotoCabinet } from '@hooks/useDeletePhotoCabinet';
import { openPhotoModal, photoUploadCabinet } from '../../../redux/actions';
import { selectPersonalDetails } from '../../../pages/PersonalDetails/selectors';
import photoapi from '../../../http/photoapi';
import styles from './PhotoCabinet.module.scss';
import stylesLoader from '../../buttons/Loader.module.scss';

const PhotoCabinet = (props) => {
  const dispatch = useDispatch();
  const deleteFile = useDeletePhotoCabinet();
  const personalDetails = useSelector(selectPersonalDetails);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!personalDetails.isLoading && personalDetails.profileImageUuid) getFile();
    if (!personalDetails.isLoading && !personalDetails.profileImageUuid) setIsLoading(false);
  }, [personalDetails.isLoading]);

  const getFile = async () => {
    try {
      const response = await photoapi.get(`/images/${personalDetails.profileImageUuid}`, {
        responseType: 'blob'
      });
      const reader = new FileReader();
      reader.onload = function (e) {
        dispatch(photoUploadCabinet(e.target.result));
      };
      reader.readAsDataURL(response.data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  const deletePhoto = (e) => {
    deleteFile();
  };
  const image = useSelector((state) => state.photoCabinetReducer.photo);
  return (
    <>
      {!image && !isLoading && (
        <div className={styles.photo} onClick={() => dispatch(openPhotoModal())}>
          <div className={styles.photo__button}>
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M8.75 1.40039C8.75 0.986177 8.41421 0.650391 8 0.650391C7.58579 0.650391 7.25 0.986177 7.25 1.40039V7.25H1.40039C0.986177 7.25 0.650391 7.58579 0.650391 8C0.650391 8.41421 0.986177 8.75 1.40039 8.75H7.25V14.6004C7.25 15.0146 7.58579 15.3504 8 15.3504C8.41421 15.3504 8.75 15.0146 8.75 14.6004V8.75H14.6004C15.0146 8.75 15.3504 8.41421 15.3504 8C15.3504 7.58579 15.0146 7.25 14.6004 7.25H8.75V1.40039Z'
                fill='#407BFF'
              />
            </svg>
          </div>
          <p className={styles.photo__title}>Add your photo</p>
        </div>
      )}
      {isLoading && (
        <div className={styles.photo__loader}>
          <span className={`${stylesLoader.loader} ${stylesLoader.loader_borderColor}`} />
        </div>
      )}
      {image && !isLoading && (
        <div className={styles.wrapper}>
          <img className={styles.photo__image} src={image} alt='preview image' />
          <div className={styles.photo__image__change} onClick={() => dispatch(openPhotoModal())}>
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M1.37272 1.37278C2.36577 0.379685 3.85176 0 5.7672 0H8.74381C9.05205 0 9.30193 0.249888 9.30193 0.55814C9.30193 0.866392 9.05205 1.11628 8.74381 1.11628H5.7672C3.96186 1.11628 2.84331 1.48078 2.16201 2.16211C1.48072 2.84343 1.11623 3.96203 1.11623 5.76744V10.2326C1.11623 11.0613 1.19303 11.7453 1.34202 12.3087L4.41495 10.2455C5.20605 9.71474 6.33104 9.76827 7.05432 10.3897L7.05906 10.3938L7.30196 10.6073C7.67351 10.9244 8.30046 10.9238 8.67104 10.6055L11.7667 7.94875C12.5563 7.27065 13.803 7.27053 14.5925 7.94873L14.8831 8.19829V6.51163C14.8831 6.20338 15.133 5.95349 15.4412 5.95349C15.7494 5.95349 15.9993 6.20338 15.9993 6.51163V9.38662C16.0002 9.40501 16.0002 9.42346 15.9993 9.44188V10.2326C15.9993 12.1481 15.6197 13.6341 14.6266 14.6272C13.6336 15.6203 12.1476 16 10.2321 16H5.7672C3.85176 16 2.36577 15.6203 1.37272 14.6272C0.379668 13.6341 0 12.1481 0 10.2326V5.76744C0 3.85193 0.379668 2.36587 1.37272 1.37278ZM14.8831 9.66979L13.8653 8.79554C13.494 8.47661 12.8653 8.47659 12.494 8.79552L9.39837 11.4523C8.60876 12.1304 7.36206 12.1305 6.57252 11.4523L6.56774 11.4482L6.32484 11.2346C5.99118 10.9498 5.42102 10.9148 5.03715 11.1723L1.78131 13.3583C1.89446 13.5382 2.0215 13.6974 2.16201 13.8379C2.84331 14.5192 3.96186 14.8837 5.7672 14.8837H10.2321C12.0375 14.8837 13.156 14.5192 13.8373 13.8379C14.5186 13.1566 14.8831 12.038 14.8831 10.2326V9.66979Z'
                fill='white'
              />
              <path
                d='M10.7906 2.23256C10.4824 2.23256 10.2325 2.48245 10.2325 2.7907C10.2325 3.09895 10.4824 3.34884 10.7906 3.34884H12.2785V4.83703C12.2785 5.14528 12.5284 5.39517 12.8367 5.39517C13.1449 5.39517 13.3948 5.14528 13.3948 4.83703V3.34884H14.8835C15.1917 3.34884 15.4416 3.09895 15.4416 2.7907C15.4416 2.48245 15.1917 2.23256 14.8835 2.23256H13.3948V0.744004C13.3948 0.435752 13.1449 0.185865 12.8367 0.185865C12.5284 0.185865 12.2785 0.435752 12.2785 0.744004V2.23256H10.7906Z'
                fill='white'
              />
            </svg>
          </div>
          <div className={styles.photo__image__delete} onClick={deletePhoto}>
            <svg
              width='16'
              height='18'
              viewBox='0 0 16 18'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M4.70225 1.91371L4.52578 2.98593C3.75992 3.02811 2.9941 3.08866 2.22832 3.16757L0.555382 3.33492C0.217138 3.36876 -0.0301803 3.67598 0.00298086 4.02111C0.036142 4.36625 0.337225 4.6186 0.675469 4.58477L2.34931 4.41732L2.35111 4.41714C3.95527 4.2518 5.55923 4.16915 7.16308 4.16915C9.88276 4.16915 12.6112 4.3104 15.3239 4.5847C15.6621 4.6189 15.9634 4.36687 15.997 4.02177C16.0305 3.67667 15.7835 3.36919 15.4453 3.33499C14.1271 3.2017 12.8051 3.09935 11.4818 3.02889L11.4789 3.0097L11.2987 1.92322L11.291 1.87446C11.2371 1.53216 11.1562 1.01953 10.8221 0.626616C10.4354 0.171965 9.84256 0 9.07527 0H6.92553C6.16746 0 5.57399 0.15917 5.18502 0.60924C4.85132 0.995351 4.76844 1.50616 4.71194 1.85434L4.70225 1.91371ZM5.91597 2.12199L5.78245 2.93322C6.24265 2.91995 6.70286 2.91332 7.16308 2.91332C8.18288 2.91332 9.20371 2.93287 10.2243 2.97156L10.0843 2.12713C10.0157 1.69761 9.97225 1.54344 9.89253 1.4497C9.84842 1.39783 9.69463 1.25583 9.07527 1.25583H6.92553C6.29695 1.25583 6.14786 1.39388 6.10812 1.43986C6.03253 1.52732 5.98988 1.67425 5.91597 2.12199Z'
                fill='white'
              />
              <path
                d='M2.99394 6.56495C2.97205 6.21888 2.67936 5.95644 2.3402 5.97878C2.00104 6.00112 1.74384 6.29977 1.76574 6.64584L2.29907 15.0767L2.29929 15.0801L2.30038 15.096C2.322 15.411 2.34577 15.7574 2.40939 16.0797C2.47535 16.4139 2.59161 16.7666 2.82718 17.0796C3.32045 17.7348 4.15988 18 5.36649 18H10.6342C11.8408 18 12.6802 17.7348 13.1735 17.0796C13.409 16.7666 13.5253 16.4139 13.5913 16.0797C13.6549 15.7574 13.6786 15.411 13.7003 15.096L13.7013 15.0801L13.7016 15.0767L14.2349 6.64584C14.2568 6.29977 13.9996 6.00112 13.6604 5.97878C13.3213 5.95644 13.0286 6.21888 13.0067 6.56495L12.4736 14.9923L12.4735 14.994C12.4503 15.3312 12.4307 15.5987 12.3847 15.8318C12.3399 16.0588 12.2777 16.2079 12.1974 16.3146C12.0589 16.4986 11.7168 16.7442 10.6342 16.7442H5.36649C4.28388 16.7442 3.94178 16.4986 3.80326 16.3146C3.72293 16.2079 3.66073 16.0588 3.61592 15.8318C3.56992 15.5987 3.55032 15.3312 3.52716 14.9941L2.99394 6.56495Z'
                fill='white'
              />
              <path
                d='M6.01443 12.7674C6.01443 12.4207 6.28995 12.1395 6.62981 12.1395H9.36211C9.70197 12.1395 9.97749 12.4207 9.97749 12.7674C9.97749 13.1142 9.70197 13.3954 9.36211 13.3954H6.62981C6.28995 13.3954 6.01443 13.1142 6.01443 12.7674Z'
                fill='white'
              />
              <path
                d='M5.94833 8.79084C5.60846 8.79084 5.33295 9.07197 5.33295 9.41876C5.33295 9.76555 5.60846 10.0467 5.94833 10.0467H10.0509C10.3907 10.0467 10.6663 9.76555 10.6663 9.41876C10.6663 9.07197 10.3907 8.79084 10.0509 8.79084H5.94833Z'
                fill='white'
              />
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoCabinet;
