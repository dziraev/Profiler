import React from 'react';
import axios from 'axios';
import { validator } from '../../utils/validators/validators';
import { useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';
import { Input, InputPassword } from '@components/fields';
import { Button } from '@components/buttons';
import { authInAndPersonalDetailsLoad } from '../../redux/actions';
import logo from '../../static/images/logo.svg';
import styles from './LoginPage.module.scss';

const LoginPage = (props) => {
  const dispatch = useDispatch();
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
              const response = await axios.post(`${process.env.API_URL}/api/v1/auth/login`, {
                email: values.email.trim(),
                password: values.password
              });
              localStorage.setItem('token', response.data.token);
              dispatch(authInAndPersonalDetailsLoad());
            } catch (e) {
              setFieldValue('password', '', false);
              setFieldError('password', <span>Wrong email or password</span>);
            }
          }}
          validate={validator}
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
                  <Button type='submit' disabled={!(dirty && isValid) || isSubmitting}>
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
