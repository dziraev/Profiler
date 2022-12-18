import React from 'react';
import { validator } from '../../validators/validators';
import { useDispatch } from 'react-redux';
import { authIn } from '../../redux/actions';
import { Formik, Form } from 'formik';
import Input from '../../components/fields/inputs/Input/Input';
import InputPassword from '../../components/fields/inputs/InputPassword/InputPassword';
import Button from '../../components/buttons/Button/Button';
import AuthService from '../../services/AuthService';
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
              const response = await AuthService.login(values.email.trim(), values.password);
              localStorage.setItem('token', response.data.token);
              dispatch(authIn());
            } catch (e) {
              setFieldValue('password', '', false);
              setFieldError('password', <span>Invalid email or password</span>);
            }
          }}
          validate={validator}
        >
          {(formik) => {
            const { isValid, dirty } = formik;
            return (
              <Form className={styles.form}>
                <div className={styles.form__inputs}>
                  <div className={styles.form__input}>
                    <Input name='email' />
                  </div>
                  <div className={styles.form__input}>
                    <InputPassword name='password' />
                  </div>
                </div>
                <div className={styles.form__button}>
                  <Button type='submit' disabled={!(dirty && isValid)}>
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
