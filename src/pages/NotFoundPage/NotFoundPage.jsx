import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';
import logo from '../../static/images/big-logo.svg';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.page}>
      <div className={styles.page__logo}>
        <img src={logo} alt='logo' />
      </div>
      <div className={styles.page__container}>
        <div className={styles.page__content}>
          <h1 className={styles.page__title}>Sorry, the page you are looking for doesn't exist or has been moved</h1>
          <p className={styles.page__subtitle}>Please check entered address or <span onClick={() => navigate(-1)}>go back</span> where you came from</p>
        </div>
        <div className={styles.page__image}>
          <svg width="84" height="112" viewBox="0 0 84 112" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M84 0H53.3832L0 112H31.4019L84 0Z" fill="#407BFF"/>
          </svg>
          <svg width="28" height="84" viewBox="0 0 28 84" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28 0H0V84H28V0Z" fill="#407BFF"/>
          </svg>
          <svg width="110" height="52" viewBox="0 0 110 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.2806 52H0C3.95683 26.8161 23.4245 0.658823 56.9784 0.00891655C90.5324 -0.64099 106.307 34.3988 110 52H82.3022C81.247 44.147 74.705 28.1159 56.9784 26.8161C39.2518 25.5163 31.1271 43.0638 29.2806 52Z" fill="#407BFF"/>
          </svg>
          <svg width="110" height="52" viewBox="0 0 110 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M80.7194 0L110 0C106.043 25.1839 86.5755 51.3412 53.0216 51.9911C19.4676 52.641 3.69304 17.6012 -7.62939e-06 0L27.6978 0C28.753 7.85303 35.295 23.8841 53.0216 25.1839C70.7482 26.4837 78.8729 8.93621 80.7194 0Z" fill="#407BFF"/>
          </svg>
          <svg width="84" height="112" viewBox="0 0 84 112" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M84 0H53.3832L0 112H31.4019L84 0Z" fill="#407BFF"/>
          </svg>
          <svg width="28" height="84" viewBox="0 0 28 84" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28 0H0V84H28V0Z" fill="#407BFF"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
