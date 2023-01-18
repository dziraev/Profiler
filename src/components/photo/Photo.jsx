import React, { useState } from 'react';
import styles from './Photo.module.scss';

const Photo = (props) => {
  const [page, setPage] = useState(props.page);
  return (
    <div className={`${styles.photo} ${page === 'cabinet' ? styles.Cabinet : styles.CV}`}>
      <div className={`${styles.photo__button} ${page === 'cabinet' ? styles.Cabinet : styles.CV}`}>
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
      <p className={`${styles.photo__title} ${page === 'cabinet' ? styles.Cabinet : styles.CV}`}>Add your photo</p>
    </div>
  );
};

export default Photo;
