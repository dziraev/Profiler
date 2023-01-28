import React from 'react';
import { Button, CancelButton } from '@components/buttons';
import styles from '../PopUp.module.scss';

export const PopUpClearFields = ({ clearFields, dontClearFields }) => {
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
              <Button type='button' onClick={clearFields}>
                Clear
              </Button>
            </div>
            <div className={styles.modal__content__btns__cancel}>
              <CancelButton type='button' onClick={dontClearFields}>
                Don't clear
              </CancelButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
