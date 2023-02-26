import React from 'react';
import { Button } from '@components/buttons';
import { CancelButton } from '@components/buttons';
import { useDisableBodyScroll } from '@hooks/useDisableBodyScroll';
import classnames from 'classnames/bind';
import styles from '../PopUp.module.scss';

const cx = classnames.bind(styles);

export const PopUpTryAgain = ({
  children,
  adaptive = true,
  type,
  isSubmitting,
  onClickHandler,
  ...props
}) => {
  useDisableBodyScroll();
  return (
    <div className={cx(styles.modal, { modal_adaptive: adaptive })}>
      <div className={styles.modal__bcg}>
        <div className={styles.modal__content}>
          <div className={styles.modal__header}>
            {Array.isArray(children) ? (
              <>
                <div className={styles.modal__title}>{children[0]}</div>
                <div className={styles.modal__subtitle}>{children[1]}</div>
              </>
            ) : (
              <div className={styles.modal__title}>{children}</div>
            )}
          </div>
          <div className={styles.modal__buttons}>
            <div className={styles.modal__button}>
              <CancelButton
                adaptive={adaptive}
                {...(type
                  ? {
                      type,
                      onClick: !isSubmitting ? onClickHandler : undefined
                    }
                  : { type: isSubmitting ? 'button' : 'reset' })}
              >
                Cancel
              </CancelButton>
            </div>
            <div className={styles.modal__button}>
              <Button
                type='submit'
                adaptive={adaptive}
                {...(isSubmitting && { type: 'button', isLoading: true })}
              >
                Try again
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
