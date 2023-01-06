import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { linkIsClicked } from '../../redux/actions';
import styles from './NavMenu.module.scss';
import logo from '../../static/images/menu-logo.svg';
import mobilelogo from '../../static/images/menu-logo-mobile.svg';
import Logout from '../../components/links/Logout';

const NavMenu = ({ menuIsOpen, closeMenu, ...props }) => {
  const dispatch = useDispatch();
  const [studentNumber, setStudentNumber] = useState('123455');
  const isEdit = useSelector((state) => state.editModeReducer.isEdit);
  const handleClick = (e) => {
    if (isEdit) {
      e.preventDefault();
      dispatch(linkIsClicked());
    }
    if (menuIsOpen) {
      closeMenu();
    }
  };
  return (
    <div className={`${styles.sidebar} ${menuIsOpen ? styles.sidebar_open : styles.sidebar}`}>
      <div className={styles.sidebar__logo}>
        <img src={logo} alt='logo' />
      </div>
      <div className={styles.sidebar_open__header}>
        <img src={mobilelogo} alt='logo' />
        <div className={styles.sidebar_open__header_exit} onClick={closeMenu}>
          <svg
            width='24'
            height='25'
            viewBox='0 0 24 25'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M6.758 17.743L12.001 12.5M17.244 7.25702L12 12.5M12 12.5L6.758 7.25702M12.001 12.5L17.244 17.743'
              stroke='black'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
      </div>
      <div className={styles.sidebar__photo}>
        <div className={styles.sidebar__photo__button}>
        <svg 
          width='12' 
          height='12' 
          viewBox='0 0 12 12' 
          fill='none' 
          xmlns='http://www.w3.org/2000/svg'
        >
          <path 
            d='M10.5 6.75H6.75V10.5C6.75 10.6989 6.67098 10.8897 6.53033 11.0303C6.38968 11.171 6.19891 11.25 6 11.25C5.80109 11.25 5.61032 11.171 5.46967 11.0303C5.32902 10.8897 5.25 10.6989 5.25 10.5V6.75H1.5C1.30109 6.75 1.11032 6.67098 0.96967 6.53033C0.829018 6.38968 0.75 6.19891 0.75 6C0.75 5.80109 0.829018 5.61032 0.96967 5.46967C1.11032 5.32902 1.30109 5.25 1.5 5.25H5.25V1.5C5.25 1.30109 5.32902 1.11032 5.46967 0.96967C5.61032 0.829017 5.80109 0.75 6 0.75C6.19891 0.75 6.38968 0.829017 6.53033 0.96967C6.67098 1.11032 6.75 1.30109 6.75 1.5V5.25H10.5C10.6989 5.25 10.8897 5.32902 11.0303 5.46967C11.171 5.61032 11.25 5.80109 11.25 6C11.25 6.19891 11.171 6.38968 11.0303 6.53033C10.8897 6.67098 10.6989 6.75 10.5 6.75Z'
            fill='#407BFF'
          />
        </svg>
        </div>
        <p className={styles.sidebar__photo__title}>Add your photo</p>
      </div>
      <div className={styles.sidebar__number}>
        <p>
          Student’s number<span className={styles.sidebar__number__id}>{studentNumber}</span>
        </p>
      </div>
      <nav className={styles.sidebar__nav}>
        <ul>
          <NavLink
            to='/main/to-cv'
            onClick={handleClick}
            className={(isActive) =>
              window.location.pathname === '/main/to-cv' ? styles.active : ''
            }
          >
            <li className={styles.sidebar__nav__link}>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M21.1654 10V15C21.1654 20 19.332 22 14.7487 22H9.2487C4.66536 22 2.83203 20 2.83203 15V9C2.83203 4 4.66536 2 9.2487 2H13.832'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M21.1654 10H17.4987C14.7487 10 13.832 9 13.832 6V2L21.1654 10Z'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <p>My CV</p>
            </li>
          </NavLink>
          <NavLink
            to='/main/personal-details'
            onClick={handleClick}
            className={(isActive) =>
              isActive && window.location.pathname === '/main/personal-details' ? styles.active : ''
            }
          >
            <li className={styles.sidebar__nav__link}>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M11.0781 18.9229H20.3089'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M11.0781 12.4614H20.3089'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M11.0781 6H20.3089'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M3.69336 5.99996L4.61644 6.92304L7.38567 4.15381'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M3.69336 12.4614L4.61644 13.3845L7.38567 10.6152'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M3.69336 18.9228L4.61644 19.8459L7.38567 17.0767'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <p>Personal details</p>
            </li>
          </NavLink>
        </ul>
      </nav>
      <div className={styles.exit}>
        <Logout />
      </div>
    </div>
  );
};

export default NavMenu;
