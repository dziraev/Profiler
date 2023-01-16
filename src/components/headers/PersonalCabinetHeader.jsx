import React from 'react';
import { useSelector } from 'react-redux';
import { selectPersonalDetails } from '../../pages/PersonalDetails/selectors';
import styles from './PersonalCabinetHeader.module.scss';

const PersonalCabinetHeader = (props) => {
  const { name, userInDB } = useSelector(selectPersonalDetails);
  return (
    <div className={styles.CabinetHeader}>
      <h1 className={styles.CabinetHeader__title}>
        {!!name && userInDB && (
          <span className={styles.CabinetHeader__welcome}>Hello, {name}!</span>
        )}
        <p className={styles.CabinetHeader__subtitle}>
          Welcome to{' '}
          <span className={styles.CabinetHeader__subtitle_highlighted}>
            Profiler's personal cabinet
          </span>{' '}
          — an employment program for our best students
        </p>
      </h1>
    </div>
  );
};

export default PersonalCabinetHeader;
