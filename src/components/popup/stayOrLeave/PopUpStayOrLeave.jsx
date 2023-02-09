import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, CancelButton } from '@components/buttons';
import { useDisableBodyScroll } from '@hooks/useDisableBodyScroll';
import { selectLinkIsClicked } from '../../../pages/PersonalDetails/selectors';
import classnames from 'classnames/bind';
import styles from '../PopUp.module.scss';

const cx = classnames.bind(styles);

export const PopUpStayOrLeave = ({ children, onClickStay, onClickLeave, adaptive = true }) => {
  useDisableBodyScroll();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const linkIsClicked = useSelector(selectLinkIsClicked);
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
              <Button
                type='button'
                adaptive={adaptive}
                onClick={() => {
                  if (linkIsClicked === '/auth') {
                    localStorage.removeItem('token');
                    dispatch({ type: 'USER_LOGOUT' });
                  }
                  navigate(linkIsClicked);

                  if (onClickLeave) {
                    onClickLeave();
                  }
                }}
              >
                Leave
              </Button>
            </div>
            <div className={styles.modal__button}>
              <CancelButton type='button' adaptive={adaptive} onClick={onClickStay}>
                Stay
              </CancelButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
