import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavMenu from '../../components/navigation/menuCabinet/NavMenu';
import PersonalCabinetHeader from '../../components/headers/PersonalCabinetHeader';
import Logout from '../../components/links/Logout';
import PhotoMobile from '../../components/photo/photoMobile/PhotoMobile';
import PopUpUploadPhotoCabinet from '../../components/popup/uploadPhoto/uploadPhotoCabinet/PopUpUploadPhotoCabinet';
import PopUpInvalidUploadCabinet from '../../components/popup/invalidUpload/invalidUploadCabinet/PopUpInvalidUploadCabinet';
import { PopUpTryAgainPhotoCabinet } from '../../components/popup/tryAgainPhoto/tryAgainPhotoCabinet/PopUpTryAgainPhotoCabinet';
import styles from './PersonalCabinetPage.module.scss';

const PersonalCabinetPage = (props) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const openModal = useSelector((state) => state.photoModalReducer.openModal);
  const invalidUpload = useSelector((state) => state.invalidUploadReducer.invalidUpload);
  const failedToSave = useSelector((state) => state.failedToSaveReducer.failedToSave);
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
            height='30'
            viewBox='0 0 30 30'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M5.25 6C5.25 5.58579 5.58579 5.25 6 5.25H14C14.4142 5.25 14.75 5.58579 14.75 6C14.75 6.41421 14.4142 6.75 14 6.75H6C5.58579 6.75 5.25 6.41421 5.25 6ZM5.25 15C5.25 14.5858 5.58579 14.25 6 14.25H19C19.4142 14.25 19.75 14.5858 19.75 15C19.75 15.4142 19.4142 15.75 19 15.75H6C5.58579 15.75 5.25 15.4142 5.25 15ZM5.25 24C5.25 23.5858 5.58579 23.25 6 23.25H24C24.4142 23.25 24.75 23.5858 24.75 24C24.75 24.4142 24.4142 24.75 24 24.75H6C5.58579 24.75 5.25 24.4142 5.25 24Z'
              fill='#407BFF'
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
      {invalidUpload && <PopUpInvalidUploadCabinet />}
      {failedToSave && (
        <PopUpTryAgainPhotoCabinet>Failed to save data. Please try again</PopUpTryAgainPhotoCabinet>
      )}
    </div>
  );
};

export default PersonalCabinetPage;
