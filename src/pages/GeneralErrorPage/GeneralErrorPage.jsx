import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/buttons/Button/Button';
import styles from './GeneralErrorPage.module.scss';
import logo from '../../static/images/big-logo.svg';

const GeneralErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.page}>
      <div className={styles.page__logo}>
        <img src={logo} alt='logo' />
      </div>
      <div className={styles.page__container}>
        <div className={styles.page__image}>
          <svg
            width='38'
            height='16'
            viewBox='0 0 38 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10.1151 16H0C1.36691 8.25112 8.09208 0.202715 19.6835 0.00274356C31.2748 -0.197228 36.7242 10.5843 38 16H28.4317C28.0671 13.5837 25.8072 8.65106 19.6835 8.25112C13.5597 7.85118 10.753 13.2504 10.1151 16Z'
              fill='#407BFF'
            />
          </svg>
          <svg
            width='38'
            height='16'
            viewBox='0 0 38 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10.1151 0H0C1.36691 7.74888 8.09209 15.7973 19.6835 15.9973C31.2748 16.1972 36.7242 5.41574 38 0H28.4317C28.0671 2.41632 25.8072 7.34894 19.6835 7.74888C13.5597 8.14882 10.753 2.7496 10.1151 0Z'
              fill='#407BFF'
            />
          </svg>
          <svg
            width='38'
            height='16'
            viewBox='0 0 38 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10.1151 16H0C1.36691 8.25112 8.09208 0.202715 19.6835 0.00274356C31.2748 -0.197228 36.7242 10.5843 38 16H28.4317C28.0671 13.5837 25.8072 8.65106 19.6835 8.25112C13.5597 7.85118 10.753 13.2504 10.1151 16Z'
              fill='#407BFF'
            />
          </svg>
          <svg
            width='38'
            height='16'
            viewBox='0 0 38 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10.1151 0H0C1.36691 7.74888 8.09209 15.7973 19.6835 15.9973C31.2748 16.1972 36.7242 5.41574 38 0H28.4317C28.0671 2.41632 25.8072 7.34894 19.6835 7.74888C13.5597 8.14882 10.753 2.7496 10.1151 0Z'
              fill='#407BFF'
            />
          </svg>
          <svg
            width='8'
            height='42'
            viewBox='0 0 8 42'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M8 0H0V42H8V0Z'
              fill='#407BFF'
            />
          </svg>
          <svg
            width='18'
            height='32'
            viewBox='0 0 18 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M0 8.51799V0C8.71749 1.15108 17.7719 6.81439 17.9969 16.5755C18.2219 26.3367 6.09271 30.9257 0 32L0 23.9424C2.71836 23.6355 8.26756 21.7324 8.71749 16.5755C9.16743 11.4187 3.0933 9.05516 0 8.51799Z'
              fill='#407BFF'
            />
          </svg>
          <svg
            width='28'
            height='22'
            viewBox='0 0 28 22'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M16.6494 0.127102C20.2722 0.170682 28 5.30092 28 5.30092L23.6531 10.2399C23.6531 10.2399 18.8229 7.6528 16.4083 6.71205C13.9938 5.77129 7.71457 5.53611 8.19716 12.1217C8.68055 14.7084 11.337 15.414 13.2689 16.3555L9.40529 22C9.40529 22 1.73996 19.3754 0.469505 15.4147C-0.586809 12.1217 0.469381 8.12349 0.469381 8.12349C2.76884 1.59623 10.371 -0.578674 16.6494 0.127102Z'
              fill='#407BFF'
            />
          </svg>
          <svg
            width='28'
            height='22'
            viewBox='0 0 28 22'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d="M11.3506 21.8729C7.72778 21.8293 0 16.6991 0 16.6991L4.34688 11.7601C4.34688 11.7601 9.17714 14.3472 11.5917 15.288C14.0062 16.2287 20.2854 16.4639 19.8028 9.87831C19.3195 7.29156 16.663 6.586 14.7311 5.64451L18.5947 0C18.5947 0 26.26 2.62463 27.5305 6.58527C28.5868 9.87831 27.5306 13.8765 27.5306 13.8765C25.2312 20.4038 17.629 22.5787 11.3506 21.8729Z" fill="#407BFF"/>
          </svg>
          <svg
            width='6'
            height='6'
            viewBox='0 0 6 6'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle
              cx='3'
              cy='3'
              r='3'
              fill='#407BFF'
            />
          </svg>
          <svg
            width='6'
            height='6'
            viewBox='0 0 6 6'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle
              cx='3'
              cy='3'
              r='3'
              fill='#407BFF'
            />
          </svg>
          <svg
            width='6'
            height='6'
            viewBox='0 0 6 6'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle
              cx='3'
              cy='3'
              r='3'
              fill='#407BFF'
            />
          </svg>
        </div>
        <div className={styles.page__content}>
          <h1 className={styles.page__content__title}>
            Something went wrong, please reload the page
          </h1>
          <div className={styles.page__content__button}>
            <Button
              onClick={() => navigate(-1)}
            >
              Reload page
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralErrorPage;
