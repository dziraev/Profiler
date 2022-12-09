import React, { useState } from 'react';
import styles from './LoginPage.module.scss';
import Input from '../../components/fields/inputs/Input/Input';
import InputPassword from '../../components/fields/inputs/InputPassword/InputPassword';
import Button from '../../components/buttons/Button/Button';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

const LoginForm = (props) => {

  return (
    <form
    className={styles.form}
    onSubmit={props.handleSubmit}
    >
    <div className={styles.form__input}>
      <Field name="email" component={Input} label='Email'></Field>
    </div>
    <div className={styles.form__input}>
      <Field name="password" component={InputPassword} label='Password'></Field>
    </div>
    <div className={styles.form__button}>
      <Button type='submit'>Sign In</Button>
    </div>
  </form>
  );
};

const LoginReduxForm = reduxForm({
  form: 'login'
})(LoginForm);

const LoginPage = (props) => {
  const onSubmit = (formData) => {
    console.log(formData);
  }
  return (
    <div className={styles.page}>
      <div className={styles.page__container}>
        <h1 className={styles.page__header}>Sign in</h1>
        <p className={styles.page__title}>Sign in and start managing your candidates!</p>
        <LoginReduxForm onSubmit={onSubmit}></LoginReduxForm>
        <NavLink to="/error">
          <p className={styles.page__title}>to 404</p>
        </NavLink>
      </div>
    </div>
  );
};

export default LoginPage;
