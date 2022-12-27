import React from 'react';
import styles from '../PopUp.module.scss';
import Button from '../../buttons/Button/Button';
import CancelButton from '../../buttons/CancelButton/CancelButton';

export const PopUpSave = ({ children }) => {
  return (
    <div className={styles.modal}>
        <div className={styles.modal__bcg}>
            <div className={styles.modal__content}>
                <div className={styles.modal__content__close}></div>
                <div className={styles.modal__content__titles}>
                    <p className={styles.modal__content__title}>{children}</p>
                </div>
                <div className={styles.modal__content__btns}>
                    <div className={styles.modal__content__btns__cancel}>
                        <CancelButton>Don't save</CancelButton>
                    </div>
                    <div className={styles.modal__content__btns__again}>
                        <Button>Save</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};