import React from 'react';
import styles from '../PopUp.module.scss';
import { Button } from '@components/buttons';
import { CancelButton } from '@components/buttons';

export const PopUpTryAgain = ({ children, ...props }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modal__bcg}>
        <div className={styles.modal__content}>
          <div className={styles.modal__content__titles}>
            {children.length >= 2 ? (
              <>
                <p className={styles.modal__content__title}>{children[0]}</p>
                <p className={styles.modal__content__subtitle}>{children[1]}</p>
              </>
            ) : (
              <p className={styles.modal__content__title}>{children}</p>
            )}
          </div>
          <div className={styles.modal__content__btns}>
            <div className={styles.modal__content__btns__cancel}>
              <CancelButton type='reset' onReset={props.onCancel}>
                Cancel
              </CancelButton>
            </div>
            <div className={styles.modal__content__btns__again}>
              <Button type='submit' onSubmit={props.onSubmit}>
                Try again
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
