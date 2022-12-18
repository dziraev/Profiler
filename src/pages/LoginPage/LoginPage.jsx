import React from 'react';
import styles from './LoginPage.module.scss';
import Input from '../../components/fields/inputs/Input/Input';
import InputPassword from '../../components/fields/inputs/InputPassword/InputPassword';
import Button from '../../components/buttons/Button/Button';
import logo from '../../static/images/logo.svg';
import { emailValidator, required, validator } from '../../validators/validators';
import AuthService from '../../services/AuthService';
import { useDispatch } from 'react-redux';
import { authIn } from '../../redux/actions';
import { Formik, Form } from 'formik';

const LoginPage = (props) => {

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
          onSubmit={ async (values, {resetForm}) => {
            try {
              console.log(values)
              const response = await AuthService.login(values.email.trim(), values.password);
              localStorage.setItem('token', response.data.token);
              dispatch(authIn());
            } catch (e) {
              console.log(e.response.data.message);
              /*resetForm({values : {
                password: ''
              }});*/
            }
          }}
          validate={validator}
        >
          {(formik) => {
            const {
              values,
              handleChange,
              handleSubmit,
              errors,
              touched,
              handleBlur,
              isValid,
              dirty
            } = formik;
            return (
              <Form className={styles.form}>
                <div className={styles.form__inputs}>
                  <div className={styles.form__input}>
                    <Input
                      name='email'
                    />
                  </div>
                  <div className={styles.form__input}>
                    <InputPassword
                      name='password'
                    />
                  </div>
                </div>
                <div className={styles.form__button}>
                  <Button
                    type='submit'
                    disabled={!(dirty && isValid)}
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
