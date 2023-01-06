import React from 'react';
import styles from '../PopUp.module.scss';
import { CancelButton } from '../../buttons/CancelButton/CancelButton';
import { Button } from '../../buttons/Button/Button';

export const PopUpCancelChanges = ({ children, ...props}) => {
    return (
    <div className={styles.modal}>
        <div className={styles.modal__bcg}>
            <div className={styles.modal__content}>
                <div className={styles.modal__content__titles}>
                    <p className={styles.modal__content__title}>{children}</p>
                </div>
                <div className={styles.modal__content__btns}>
                    <div className={styles.modal__content__btns__again}>
                        <Button
                        type='reset'
                        onClick={(e) => {
                          props.handleReset(e);
                          props.setCancelIsClicked(false)
                        }}
                        >
                            Yes
                        </Button>
                    </div>
                    <div className={styles.modal__content__btns__cancel} >
                        <CancelButton 
                        type='submit'
                        onClick={(e) => {
                            props.setCancelIsClicked(false)
                          }}
                        >
                            No
                        </CancelButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};