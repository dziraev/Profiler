import React, { useState } from 'react';
import styles from './Logout.module.scss';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authOut } from '../../redux/actions';

const Logout = (props) => {
  const dispatch = useDispatch();
  function logout(e) {
    localStorage.removeItem('token');
    dispatch(authOut());
    console.log('i work')
  }
  return (
    <div className={styles.logout} onClick={logout}>
      <NavLink to='/auth'>
        <div className={styles.logout__link}>
          <div className={styles.logout__icon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.1 16.44C14.79 20.04 12.94 21.51 8.88998 21.51L8.75998 21.51C4.28998 21.51 2.49998 19.72 2.49998 15.25L2.49998 8.73001C2.49998 4.26001 4.28998 2.47001 8.75998 2.47001L8.88998 2.47001C12.91 2.47001 14.76 3.92001 15.09 7.46001" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 12L20.38 12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.15 15.35L21.5 12L18.15 8.64997" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p>Log out</p>
        </div>
      </NavLink>
    </div>
  );
};

export default Logout;