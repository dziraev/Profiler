import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUploadPhotoCV } from '@hooks/useUploadPhotoCV';
import { useChangePhotoCV } from '@hooks/useChangePhotoCV';
import { Button } from '@components/buttons';
import { CancelButton } from '@components/buttons';
import { useDisableBodyScroll } from '@hooks/useDisableBodyScroll';
import { savedSuccessfully } from '../../../../redux/actions';
import classnames from 'classnames/bind';
import styles from '../../PopUp.module.scss';

const cx = classnames.bind(styles);

export const PopUpTryAgainPhotoCV = ({
  children,
  adaptive = false,
  ...props
}) => {
  useDisableBodyScroll();
  const dispatch = useDispatch();
  const sendFile = useUploadPhotoCV();
  const changeFile = useChangePhotoCV();
  const [isLoading, setIsLoading] = useState(false);
  const image = useSelector((state) => state.photoCVReducer.photo);
  const file = useSelector((state) => state.photoCVReducer.failedPhoto);
  const close = (e) => {
    dispatch(savedSuccessfully());
  };
  const saveFile = (e) => {
    if (isLoading) return;
    setIsLoading(true);
    image ? changeFile(file) : sendFile(file);
  };
  return (
    <div className={cx(styles.modal, { modal_adaptive: adaptive })}>
      <div className={styles.modal__bcg}>
        <div className={styles.modal__content}>
          <div className={styles.modal__header}>
            {Array.isArray(children) ? (
              <>
                <div className={styles.modal__title}>{children[0]}</div>
                <div className={styles.modal__subtitle}>{children[1]}</div>
              </>
            ) : (
              <div className={styles.modal__title}>{children}</div>
            )}
          </div>
          <div className={styles.modal__buttons}>
            <div className={styles.modal__button}>
              <CancelButton
                adaptive={adaptive}
                type='submit'
                onClick={close}
              >
                Cancel
              </CancelButton>
            </div>
            <div className={styles.modal__button}>
              <Button
                type='submit'
                adaptive={adaptive}
                onClick={saveFile}
                isLoading={isLoading}
              >
                Try again
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
