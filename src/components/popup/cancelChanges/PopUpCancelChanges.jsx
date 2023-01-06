import React from 'react';
import styles from '../PopUp.module.scss';
import { CancelButton } from '../../buttons/CancelButton/CancelButton';
import { Button } from '../../buttons/Button/Button';
import { useDispatch } from 'react-redux';
import { editModeOff, cancelIsNotClicked } from '../../../redux/actions';

export const PopUpCancelChanges = ({ children, ...props }) => {
    const dispatch = useDispatch();
  
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
                        type='submit'
                        >
                            Yes
                        </Button>
                    </div>
                    <div className={styles.modal__content__btns__cancel} >
                        <CancelButton 
                        type='reset'
                        // onClick={(e) => {
                        //   dispatch(editModeOff());
                        //   dispatch(linkIsNotClicked());
                        //   props.handleReset(e);
                        // }}
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