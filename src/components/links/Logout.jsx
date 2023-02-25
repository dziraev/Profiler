import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { linkIsClicked } from '../../redux/actions';
import styles from './Logout.module.scss';
import { selectIsDirtyFormPD } from '../../pages/PersonalDetails/selectors';
import {
  selectIsDirtyFormConstructorCv,
  selectIsDirtyFormSpecificCv
} from '../../pages/CVsteps/selectors';

const Logout = ({ tabIndex = 0 , closeMenu, ...props }) => {
  const dispatch = useDispatch();
  const isDirtyFormPD = useSelector(selectIsDirtyFormPD);
  const isDirtyFormConstructorCv = useSelector(selectIsDirtyFormConstructorCv);
  const isDirtyFormSpecificCv = useSelector(selectIsDirtyFormSpecificCv);
  const handleClick = (e) => {
    if (isDirtyFormPD || isDirtyFormConstructorCv || isDirtyFormSpecificCv) {
      e.preventDefault();
      dispatch(linkIsClicked(e.currentTarget.getAttribute('href')));
      closeMenu && closeMenu();
    } else {
      localStorage.removeItem('token');
      dispatch({ type: 'USER_LOGOUT' });
    }
  };
  return (
    <NavLink
      to='/auth'
      tabIndex={tabIndex}
      onClick={handleClick}
      className={styles.logout__link}
    >
      <div className={styles.logout__icon}>
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M15.1 16.44C14.79 20.04 12.94 21.51 8.88998 21.51L8.75998 21.51C4.28998 21.51 2.49998 19.72 2.49998 15.25L2.49998 8.73001C2.49998 4.26001 4.28998 2.47001 8.75998 2.47001L8.88998 2.47001C12.91 2.47001 14.76 3.92001 15.09 7.46001'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M9 12L20.38 12'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M18.15 15.35L21.5 12L18.15 8.64997'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
      <p>Log out</p>
    </NavLink>
  );
};

export default Logout;
