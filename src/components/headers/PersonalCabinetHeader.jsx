import React from 'react';
import { useSelector } from 'react-redux';
import { selectNamePersonalDetails } from '../../pages/PersonalDetails/selectors';
import styles from './PersonalCabinetHeader.module.scss';

const PersonalCabinetHeader = (props) => {
  const name = useSelector(selectNamePersonalDetails);
  return (
    <div className={styles.CabinetHeader}>
      <h1 className={styles.CabinetHeader__title}>
        {!!name && <span className={styles.CabinetHeader__welcome}>Hello, {name}!</span>}
        Welcome to{' '}
        <span className={styles.CabinetHeader__title_highlighted}>
          Profiler's personal cabinet
        </span>{' '}
        — an employment program for our best students
      </h1>
    </div>
  );
};

export default PersonalCabinetHeader;
