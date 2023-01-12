import React from 'react';
import styles from './Notification.module.scss';

export const Notification = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>{children}</div>
      <div className={styles.tooltip}>
        <span>
          Please fill in all the fields in Profiler in <b>English</b>
        </span>
        <span className={styles.tooltipArrow} />
      </div>
    </div>
  );
};
