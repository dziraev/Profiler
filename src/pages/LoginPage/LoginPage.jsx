import React, { useState } from 'react';
import styles from './LoginPage.module.scss';
import Input from '../../components/fields/inputs/Input/Input';
import InputPassword from '../../components/fields/inputs/InputPassword/InputPassword';
import Button from '../../components/buttons/Button/Button';

const LoginPage = () => {
  const [formValues, setFormValues] = useState({ email: '', password: '' });

  return (
    <div className={styles.page}>
      <div className={styles.page__container}>
        <h1 className={styles.page__header}>Sign in</h1>
        <p className={styles.page__title}>Sign in and start managing your candidates!</p>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className={styles.form__input}>
            <Input
              label='Email'
              value={formValues.email}
              onChange={(event) => {
                const email = event.target.value;
                setFormValues({ ...formValues, email });
              }}
            />
          </div>
          <div className={styles.form__input}>
            <InputPassword
              label='Enter your password'
              value={formValues.password}
              onChange={(event) => {
                const password = event.target.value;
                setFormValues({ ...formValues, password });
              }}
            />
          </div>
          <div className={styles.form__button}>
            <Button type='submit'>Sign In </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
