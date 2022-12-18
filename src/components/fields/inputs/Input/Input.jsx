import React, { useState } from 'react';
import styles from '../Input.module.scss';
import { useField } from 'formik';

const Input = (props) => {
  const [active, setActive] = useState(false);
  const [field, meta, helper] = useField(props);

  function handleBlur(e) {
    field.onBlur(e);
    setActive(false);
  }

  function handleFocus(e) {
    setActive(true);
  }

  return (
    <>
      <div className={styles.inputContainer}>
        <input
          {...props}
          {...field}
          onBlur={handleBlur}
          onFocus={handleFocus}
          type='text'
          maxLength={50}
          className={`${styles.input} ${meta.error && meta.touched ? styles.input__error : ''}`}
          placeholder={!active ? 'Email' : 'Enter your email'}
        />
      </div>
      {meta.touched && meta.error && (
        <div className={styles.error}>
          {meta.error}
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12 13.2C12.34 13.2 12.6252 13.0848 12.8556 12.8544C13.0852 12.6248 13.2 12.34 13.2 12V7.17C13.2 6.83 13.0852 6.55 12.8556 6.33C12.6252 6.11 12.34 6 12 6C11.66 6 11.3752 6.1148 11.1456 6.3444C10.9152 6.5748 10.8 6.86 10.8 7.2V12.03C10.8 12.37 10.9152 12.65 11.1456 12.87C11.3752 13.09 11.66 13.2 12 13.2ZM12 18C12.34 18 12.6252 17.8848 12.8556 17.6544C13.0852 17.4248 13.2 17.14 13.2 16.8C13.2 16.46 13.0852 16.1748 12.8556 15.9444C12.6252 15.7148 12.34 15.6 12 15.6C11.66 15.6 11.3752 15.7148 11.1456 15.9444C10.9152 16.1748 10.8 16.46 10.8 16.8C10.8 17.14 10.9152 17.4248 11.1456 17.6544C11.3752 17.8848 11.66 18 12 18ZM12 24C10.34 24 8.78 23.6848 7.32 23.0544C5.86 22.4248 4.59 21.57 3.51 20.49C2.43 19.41 1.5752 18.14 0.9456 16.68C0.3152 15.22 0 13.66 0 12C0 10.34 0.3152 8.78 0.9456 7.32C1.5752 5.86 2.43 4.59 3.51 3.51C4.59 2.43 5.86 1.5748 7.32 0.9444C8.78 0.3148 10.34 0 12 0C13.66 0 15.22 0.3148 16.68 0.9444C18.14 1.5748 19.41 2.43 20.49 3.51C21.57 4.59 22.4248 5.86 23.0544 7.32C23.6848 8.78 24 10.34 24 12C24 13.66 23.6848 15.22 23.0544 16.68C22.4248 18.14 21.57 19.41 20.49 20.49C19.41 21.57 18.14 22.4248 16.68 23.0544C15.22 23.6848 13.66 24 12 24ZM12 21.6C14.66 21.6 16.9252 20.6652 18.7956 18.7956C20.6652 16.9252 21.6 14.66 21.6 12C21.6 9.34 20.6652 7.0748 18.7956 5.2044C16.9252 3.3348 14.66 2.4 12 2.4C9.34 2.4 7.0752 3.3348 5.2056 5.2044C3.3352 7.0748 2.4 9.34 2.4 12C2.4 14.66 3.3352 16.9252 5.2056 18.7956C7.0752 20.6652 9.34 21.6 12 21.6Z'
              fill='#D40000'
            />
          </svg>
        </div>
      )}
    </>
  );
};

export default Input;
