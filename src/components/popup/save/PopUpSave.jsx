import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { linkIsNotClicked } from '../../../redux/actions';
import { Button, CancelButton } from '@components/buttons';
import { selectLinkIsClicked } from '../../../pages/PersonalDetails/selectors';
import styles from '../PopUp.module.scss';

export const PopUpSave = ({ children, isSubmitting, handleReset, ...props }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const linkIsClicked = useSelector(selectLinkIsClicked);
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
                {...(!isSubmitting && {
                  onClick: () => {
                    if (linkIsClicked === '/auth') {
                      localStorage.removeItem('token');
                      dispatch({ type: 'USER_LOGOUT' });
                    }
                    navigate(linkIsClicked);
                  }
                })}
              >
                Don't save
              </CancelButton>
            </div>
            <div className={styles.modal__content__btns__again}>
              <Button type='submit' {...(isSubmitting && { type: 'button', isLoading: true })}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
