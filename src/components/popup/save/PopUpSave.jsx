import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { linkIsNotClicked } from '../../../redux/actions';
import { Button, CancelButton } from '@components/buttons';
import { useDisableBodyScroll } from '@hooks/useDisableBodyScroll';
import { selectLinkIsClicked } from '../../../pages/PersonalDetails/selectors';
import classnames from 'classnames/bind';
import styles from '../PopUp.module.scss';

const cx = classnames.bind(styles);

export const PopUpSave = ({
  children,
  isSubmitting,
  onClickSave,
  onClickDontSave,
  adaptive = true,
  ...props
}) => {
  useDisableBodyScroll();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const linkIsClicked = useSelector(selectLinkIsClicked);

  return (
    <div className={cx(styles.modal, { modal_adaptive: adaptive })}>
      <div className={styles.modal__bcg}>
        <div className={styles.modal__content}>
          <div
            className={styles.modal__close}
            onClick={() => {
              dispatch(linkIsNotClicked());
            }}
          ></div>
          <div className={styles.modal__header}>
            <div className={styles.modal__title}>{children}</div>
          </div>
          <div className={styles.modal__buttons}>
            <div className={styles.modal__button}>
              <CancelButton
                type='button'
                adaptive={adaptive}
                {...(!isSubmitting && {
                  onClick: () => {
                    if (linkIsClicked === '/auth') {
                      localStorage.removeItem('token');
                      dispatch({ type: 'USER_LOGOUT' });
                    }
                    if (onClickDontSave) {
                      onClickDontSave();
                    }
                    navigate(linkIsClicked);
                  }
                })}
              >
                Don't save
              </CancelButton>
            </div>
            <div className={styles.modal__button}>
              <Button
                type='submit'
                adaptive={adaptive}
                {...(isSubmitting && { type: 'button', isLoading: true })}
                {...(!isSubmitting && {
                  onClick: () => {
                    if (onClickSave) {
                      onClickSave();
                    }
                  }
                })}
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
