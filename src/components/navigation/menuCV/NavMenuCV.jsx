import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavMenuCV.module.scss';
import logo from '../../../static/images/menu-logo.svg';

const NavMenu = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__logo}>
        <img src={logo} alt='logo' />
      </div>
        <NavLink to='/main/my-cv'>
          <div className={styles.sidebar__link}>
            <svg
              width='18' 
              height='14' 
              viewBox='0 0 18 14' 
              fill='none' 
              xmlns='http://www.w3.org/2000/svg'
            >
              <path 
                d='M7.1517 12.6859C7.43668 12.9865 7.43668 13.4739 7.1517 13.7745C6.86672 14.0752 6.40468 14.0752 6.1197 13.7745L0.213734 7.54433C0.0768824 7.39996 0 7.20416 0 7C0 6.79584 0.0768824 6.60004 0.213734 6.45567L6.1197 0.225468C6.40468 -0.0751562 6.86672 -0.0751562 7.1517 0.225468C7.43668 0.526091 7.43668 1.0135 7.1517 1.31412L2.49177 6.22988H17.2703C17.6733 6.22988 18 6.57453 18 6.99968C18 7.42482 17.6733 7.76947 17.2703 7.76947H2.49116L7.1517 12.6859Z' 
                fill='#407BFF'
              />
            </svg>
            <p>Personal cabinet</p>
          </div>
        </NavLink>
      <nav className={styles.sidebar__nav}>

      </nav>
    </div>
  );
};

export default NavMenu;
