import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { linkIsNotClicked } from '../../../redux/actions';
import { Button, CancelButton } from '@components/buttons';
import { selectLinkIsClicked } from '../../../pages/PersonalDetails/selectors';
import styles from '../PopUp.module.scss';

export const PopUpStayOrLeave = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const linkIsClicked = useSelector(selectLinkIsClicked);
  return (
    <div className={styles.modal}>
      <div className={styles.modal__bcg}>
        <div className={styles.modal__content}>
          <div className={styles.modal__content__titles}>
            <p className={styles.modal__content__title}>The data is entered incorrectly.</p>
            <p className={styles.modal__content__subtitle}>
              If you leave this page, the data will not be saved.
            </p>
          </div>
          <div className={styles.modal__content__btns}>
            <div className={styles.modal__content__btns__again}>
              <Button
                type='button'
                onClick={() => {
                  if (linkIsClicked === '/auth') {
                    localStorage.removeItem('token');
                    dispatch({ type: 'USER_LOGOUT' });
                  }
                  navigate(linkIsClicked);
                }}
              >
                Leave
              </Button>
            </div>
            <div className={styles.modal__content__btns__cancel}>
              <CancelButton type='button' onClick={() => dispatch(linkIsNotClicked())}>
                Stay
              </CancelButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
