import React, { useState } from 'react';
import styles from './NavMenu.module.scss';
import logo from '../../static/images/menu-logo.svg';
import mobilelogo from '../../static/images/menu-logo-mobile.svg';
import { NavLink } from 'react-router-dom';
import Logout from '../../components/links/Logout';

const NavMenu = (props) => {
  const [studentNumber, setStudentNumber] = useState('123455');
  return (
    <div className={`${styles.sidebar} ${props.menuIsOpen ? styles.sidebar_open : styles.sidebar}`}>
      <div className={styles.sidebar__logo}>
        <img src={logo} alt='logo' />
      </div>
      <div className={styles.sidebar_open__header}>
        <img src={mobilelogo} alt='logo' />
        <div className={styles.sidebar_open__header_exit} onClick={props.closeMenu}>
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.758 17.743L12.001 12.5M17.244 7.25702L12 12.5M12 12.5L6.758 7.25702M12.001 12.5L17.244 17.743" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <div className={styles.sidebar__photo}>
        <div className={styles.sidebar__photo__button}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 8H8V13C8 13.2652 7.89464 13.5196 7.70711 13.7071C7.51957 13.8946 7.26522 14 7 14C6.73478 14 6.48043 13.8946 6.29289 13.7071C6.10536 13.5196 6 13.2652 6 13V8H1C0.734784 8 0.48043 7.89464 0.292893 7.70711C0.105357 7.51957 0 7.26522 0 7C0 6.73478 0.105357 6.48043 0.292893 6.29289C0.48043 6.10536 0.734784 6 1 6H6V1C6 0.734784 6.10536 0.480429 6.29289 0.292893C6.48043 0.105357 6.73478 0 7 0C7.26522 0 7.51957 0.105357 7.70711 0.292893C7.89464 0.480429 8 0.734784 8 1V6H13C13.2652 6 13.5196 6.10536 13.7071 6.29289C13.8946 6.48043 14 6.73478 14 7C14 7.26522 13.8946 7.51957 13.7071 7.70711C13.5196 7.89464 13.2652 8 13 8Z" fill="#407BFF"/>
          </svg>
        </div>
        <p className={styles.sidebar__photo__title}>Add your photo</p>
      </div>
      <div className={styles.sidebar__number}>
        <p>Student’s number<span className={styles.sidebar__number__id}>{studentNumber}</span></p>
      </div>
      <nav className={styles.sidebar__nav}>
        <ul>
          <NavLink to='/main/to-cv' className={ isActive => window.location.pathname === '/main/to-cv' ? styles.active : ''}>
            <li className={styles.sidebar__nav__link}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.1654 10V15C21.1654 20 19.332 22 14.7487 22H9.2487C4.66536 22 2.83203 20 2.83203 15V9C2.83203 4 4.66536 2 9.2487 2H13.832" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21.1654 10H17.4987C14.7487 10 13.832 9 13.832 6V2L21.1654 10Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p>My CV</p>
            </li>
          </NavLink>
          <NavLink to='/main/personal-details' className={ isActive => isActive && window.location.pathname === '/main/personal-details' ? styles.active : ''}>
            <li className={styles.sidebar__nav__link}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.0781 18.9229H20.3089" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.0781 12.4614H20.3089" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.0781 6H20.3089" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.69336 5.99996L4.61644 6.92304L7.38567 4.15381" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.69336 12.4614L4.61644 13.3845L7.38567 10.6152" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.69336 18.9228L4.61644 19.8459L7.38567 17.0767" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
