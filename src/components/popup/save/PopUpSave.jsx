import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editModeOff, linkIsNotClicked } from '../../../redux/actions';
import styles from '../PopUp.module.scss';
import { Button } from '../../buttons/Button/Button';
import { CancelButton } from '../../buttons/CancelButton/CancelButton';

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
              <CancelButton
                type='reset'
                onClick={(e) => {
                  props.handleReset(e);
                  dispatch(editModeOff());
                  dispatch(linkIsNotClicked());
                }}
              >
                Don't save
              </CancelButton>
            </div>
            <div className={styles.modal__content__btns__again}>
              <Button
                type='submit'
                onClick={(e) => {
                  props.handleSubmit(e);
                  dispatch(editModeOff());
                  dispatch(linkIsNotClicked());
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
