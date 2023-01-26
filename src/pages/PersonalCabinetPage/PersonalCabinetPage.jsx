import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavMenu from '../../components/navigation/menuCabinet/NavMenu';
import PersonalCabinetHeader from '../../components/headers/PersonalCabinetHeader';
import Logout from '../../components/links/Logout';
import PhotoMobile from '../../components/photo/photoMobile/PhotoMobile';
import PopUpUploadPhotoCabinet from '../../components/popup/uploadPhoto/uploadPhotoCabinet/PopUpUploadPhotoCabinet';
import PopUpInvalidUpload from '../../components/popup/invalidUpload/PopUpInvalidUpload';
import styles from './PersonalCabinetPage.module.scss';

const PersonalCabinetPage = (props) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const openModal = useSelector((state) => state.photoModalReducer.openModal);
  const invalidUpload = useSelector((state) => state.invalidUploadReducer.invalidUpload);
  function openAndCloseMenu(e) {
    setMenuIsOpen(!menuIsOpen);
  }
  useEffect(() => {
    const checkInnerWidth = () => {
      if (window.innerWidth >= 1365) setMenuIsOpen(false);
    };

    window.addEventListener('resize', checkInnerWidth);

    return () => window.removeEventListener('resize', checkInnerWidth);
  }, []);
  return (
    <div className={`${styles.page} ${menuIsOpen ? styles.page_hidden : ''}`}>
      <div className={styles.header}>
        <div className={styles.header__burger} onClick={openAndCloseMenu}>
          <svg
            width='30'
            height='31'
            viewBox='0 0 30 31'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M3.75 6.67859H13.75M3.75 15.4286H20M3.75 24.1786H26.25'
              stroke='#407BFF'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
        <div className={styles.header__photo__icon}>
          <PhotoMobile />
        </div>
      </div>
      <div className={styles.page__container}>
        <div className={styles.page__sidebar}>
          <NavMenu menuIsOpen={menuIsOpen} closeMenu={openAndCloseMenu} />
        </div>
        <div className={styles.page__content}>
          <div className={styles.exit}>
            <Logout />
          </div>
          <header className={styles.page__header}>
            <PersonalCabinetHeader />
          </header>
          <main className={styles.page__main}>
            <Outlet />
          </main>
        </div>
      </div>
      {openModal && <PopUpUploadPhotoCabinet />}
      {invalidUpload && <PopUpInvalidUpload />}
    </div>
  );
};

export default PersonalCabinetPage;
