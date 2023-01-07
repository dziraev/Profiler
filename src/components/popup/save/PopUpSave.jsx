import React from 'react';
import { useDispatch } from 'react-redux';
import { editModeOff, linkIsNotClicked } from '../../../redux/actions';
import { Button, CancelButton } from '@components/buttons';
import styles from '../PopUp.module.scss';

export const PopUpSave = ({ children, ...props }) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.modal}>
      <div className={styles.modal__bcg}>
        <div className={styles.modal__content}>
          <div
            className={styles.modal__content__close}
            onClick={() => {
              dispatch(linkIsNotClicked());
            }}
          ></div>
          <div className={styles.modal__content__titles}>
            <p className={styles.modal__content__title}>{children}</p>
          </div>
          <div className={styles.modal__content__btns}>
            <div className={styles.modal__content__btns__cancel}>
              <CancelButton type='reset'>Don't save</CancelButton>
            </div>
            <div className={styles.modal__content__btns__again}>
              <Button type='submit' {...props}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
