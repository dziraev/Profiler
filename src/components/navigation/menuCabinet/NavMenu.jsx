import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { linkIsClicked } from '@actions';
import {
  selectIsDirtyFormPD,
  selectUniqueStudentIdentifier
} from '../../../pages/PersonalDetails/selectors';
import Logout from '../../links/Logout';
import PhotoCabinet from '../../photo/photoCabinet/PhotoCabinet';
import styles from './NavMenu.module.scss';
import logo from '../../../static/images/menu-logo.svg';
import mobilelogo from '../../../static/images/menu-logo-mobile.svg';

const NavMenu = ({ menuIsOpen, closeMenu, ...props }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const uniqueStudentIdentifier = useSelector(selectUniqueStudentIdentifier);
  const isDirtyFormPD = useSelector(selectIsDirtyFormPD);

  const handleClick = (e) => {
    const href = e.currentTarget.getAttribute('href');

    if (menuIsOpen) {
      closeMenu();
    }

    if (isDirtyFormPD && pathname !== href) {
      e.preventDefault();
      dispatch(linkIsClicked(e.currentTarget.getAttribute('href')));
    }
  };

  const isActiveLink = ({ isActive }) => (isActive ? styles.active : '');

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
        <PhotoCabinet />
      </div>
      <div className={styles.sidebar__number}>
        {!!uniqueStudentIdentifier && (
          <p>
            Student’s number
            <span className={styles.sidebar__number__id}>{uniqueStudentIdentifier}</span>
          </p>
        )}
      </div>
      <nav className={styles.sidebar__nav}>
        <ul>
          <NavLink to='/main/my-cv' onClick={handleClick} className={isActiveLink}>
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
          <NavLink to='/main/personal-details' onClick={handleClick} className={isActiveLink}>
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
        <Logout menuIsOpen={menuIsOpen} closeMenu={closeMenu} />
      </div>
    </div>
  );
};

export default NavMenu;
