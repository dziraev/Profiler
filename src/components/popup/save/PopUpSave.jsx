import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editModeOff } from '../../../redux/actions';
import styles from '../PopUp.module.scss';
import { Button } from '../../buttons/Button/Button';
import { CancelButton } from '../../buttons/CancelButton/CancelButton';

export const PopUpSave = ({ children, ...props }) => {
    const isEdit = useSelector((state) => state.editModeReducer.isEdit);
    const dispatch = useDispatch();
  return (
    <div className={styles.modal}>
        <div className={styles.modal__bcg}>
            <div className={styles.modal__content}>
                <div className={styles.modal__content__close} onClick={props.close}></div>
                <div className={styles.modal__content__titles}>
                    <p className={styles.modal__content__title}>{children}</p>
                </div>
                <div className={styles.modal__content__btns}>
                    <div className={styles.modal__content__btns__cancel}> 
                        <CancelButton type='button' onClick={() => {
                            dispatch(editModeOff())
                            props.close()
                        }}>Don't save</CancelButton>
                    </div>
                    <div className={styles.modal__content__btns__again}>
                        <Button type='button' onClick={() => {
                            dispatch(editModeOff())
                            props.close()
                        }}>Save</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};