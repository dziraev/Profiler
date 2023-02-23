import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input, InputPassword } from '@components/fields';
import { Button } from '@components/buttons';
import { validateAuthorization } from '@validators/validateAuthorization';
import { Form, Formik } from 'formik';
import axios from 'axios';
import logo from '../../static/images/logo.svg';
import styles from './LoginPage.module.scss';

const LoginPage = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location?.state?.from?.pathname || '/';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <img src={logo} alt='logo' />
      </header>
      <div className={styles.page__container}>
        <h1 className={styles.page__header}>Hello</h1>
        <p className={styles.page__title}>We’re glad to see you on our platform </p>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          onSubmit={async (values, { setFieldValue, setFieldError }) => {
            try {
              const response = await axios.post(`${window?._env_?.API_URL || process.env.API_URL}/api/v1/auth/login`, {
                email: values.email.trim(),
                password: values.password
              });
              localStorage.setItem('token', response.data.token);
              navigate(fromPage);
            } catch (e) {
              setFieldValue('password', '', false);
              setFieldError('password', <span>Wrong email or password</span>);
            }
          }}
          validateOnChange={false}
          validate={validateAuthorization}
        >
          {(formik) => {
            const { isValid, dirty, isSubmitting } = formik;

            return (
              <Form className={styles.form}>
                <div className={styles.form__inputs}>
                  <div className={styles.form__input}>
                    <Input
                      name='email'
                      label={'Email'}
                      activeLabel={'Enter your email'}
                      maxLength={50}
                    />
                  </div>
                  <div className={styles.form__input}>
                    <InputPassword name='password' maxLength={15} />
                  </div>
                </div>
                <div className={styles.form__button}>
                  <Button
                    type={!(dirty && isValid) ? 'button' : 'submit'}
                    {...(isSubmitting && { type: 'button', isLoading: true })}
                  >
                    Sign In
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
