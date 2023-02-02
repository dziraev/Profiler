import React from 'react';
import { CancelButton } from '@components/buttons';
import { Button } from '@components/buttons';
import { useDisableBodyScroll } from '@hooks/useDisableBodyScroll';
import classnames from 'classnames/bind';
import styles from '../PopUp.module.scss';

const cx = classnames.bind(styles);

export const PopUpCancelChanges = ({ children, setCancelIsClicked, adaptive = true, ...props }) => {
  useDisableBodyScroll();
  return (
    <div className={cx(styles.modal, { modal_adaptive: adaptive })}>
      <div className={styles.modal__bcg}>
        <div className={styles.modal__content}>
          <div className={styles.modal__header}>
            <p className={styles.modal__title}>{children}</p>
          </div>
          <div className={styles.modal__buttons}>
            <div className={styles.modal__button}>
              <Button type='reset'>Yes</Button>
            </div>
            <div className={styles.modal__button}>
              <CancelButton type='button' onClick={(e) => setCancelIsClicked(false)}>
                No
              </CancelButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
