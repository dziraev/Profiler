import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { linkIsNotClicked } from '@actions';
import { Button, CancelButton } from '@components/buttons';
import { useDisableBodyScroll } from '@hooks/useDisableBodyScroll';
import { selectLinkIsClicked } from '../../../pages/PersonalDetails/selectors';
import { navigationLinkPopUp } from '@utils/navigationLinkPopUp';
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
          >
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
                d='M0.46972 0.469619C0.762642 0.176754 1.23752 0.176799 1.53038 0.46972L7.99877 6.93934L14.4697 0.469619C14.7626 0.176754 15.2375 0.176799 15.5304 0.46972C15.8232 0.762642 15.8232 1.23752 15.5303 1.53038L9.06004 7.99938L15.5303 14.4697C15.8232 14.7626 15.8232 15.2374 15.5303 15.5303C15.2374 15.8232 14.7626 15.8232 14.4697 15.5303L8 9.06066L1.53033 15.5303C1.23744 15.8232 0.762563 15.8232 0.46967 15.5303C0.176777 15.2374 0.176777 14.7626 0.46967 14.4697L6.93872 8.00062L0.469619 1.53028C0.176754 1.23736 0.176799 0.762485 0.46972 0.469619Z'
                fill='#25225D'
              />
            </svg>
          </div>
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
                    navigationLinkPopUp(linkIsClicked, dispatch, navigate);
                    if (onClickDontSave) {
                      onClickDontSave();
                    }
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
