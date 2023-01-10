import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editModeOff, linkIsClicked, linkIsNotClicked } from '../../../redux/actions';
import { Button, CancelButton } from '@components/buttons';
import styles from '../PopUp.module.scss';

export const PopUpSave = ({ children, handleReset, handleSubmit, isSubmitting, ...props }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const linkIsClicked = useSelector((state) => state.linkIsClickedReducer.linkIsClicked);
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
                type='button'
                onClick={(e) => {
                  if (linkIsClicked === '/auth') {
                    localStorage.removeItem('token');
                    dispatch({ type: 'USER_LOGOUT' });
                  }
                  navigate(linkIsClicked);
                  handleReset();
                }}>
                  Don't save
                </CancelButton>
            </div>
            <div className={styles.modal__content__btns__again}>
              <Button
                type={isSubmitting ? 'button' : 'submit'}
                onClick={(e) => {
                  if (linkIsClicked === '/auth') {
                    localStorage.removeItem('token');
                    dispatch({ type: 'USER_LOGOUT' });
                  }
                  navigate(linkIsClicked);
                  handleSubmit();
                }}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
