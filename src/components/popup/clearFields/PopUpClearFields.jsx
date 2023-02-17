import React from 'react';
import { Button, CancelButton } from '@components/buttons';
import { useDisableBodyScroll } from '@hooks/useDisableBodyScroll';
import classnames from 'classnames/bind';
import styles from '../PopUp.module.scss';

const cx = classnames.bind(styles);

export const PopUpClearFields = ({ adaptive = true, clearFields, dontClearFields }) => {
  useDisableBodyScroll();
  return (
    <div className={cx(styles.modal, { modal_adaptive: adaptive })}>
      <div className={styles.modal__bcg}>
        <div className={styles.modal__content}>
          <div className={styles.modal__header}>
            <p className={styles.modal__title}>Do you want to clear all fields on this page?</p>
          </div>
          <div className={styles.modal__buttons}>
            <div className={styles.modal__button}>
              <Button type='button' adaptive={adaptive} onClick={clearFields}>
                Clear
              </Button>
            </div>
            <div className={styles.modal__button}>
              <CancelButton type='button' adaptive={adaptive} onClick={dontClearFields}>
                Don't clear
              </CancelButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
