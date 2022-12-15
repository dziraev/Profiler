import React from 'react';
import styles from './LoginPage.module.scss';
import Input from '../../components/fields/inputs/Input/Input';
import InputPassword from '../../components/fields/inputs/InputPassword/InputPassword';
import Button from '../../components/buttons/Button/Button';
import logo from '../../static/images/logo.svg';
import { clearFields, Field, reduxForm, SubmissionError, untouch } from 'redux-form';
import { emailValidator, required } from '../../validators/validators';
import AuthService from '../../services/AuthService';
import { useDispatch } from 'react-redux';
import { authIn } from '../../redux/actions';

const LoginForm = (props) => {
  const { invalid, pristine, submitting } = props;
  return (
    <form className={styles.form} onSubmit={props.handleSubmit}>
      <div className={styles.form__inputs}>
        <div className={styles.form__input}>
          <Field
            name='email'
            component={Input}
            label='Email'
            maxLength={50}
            validate={[required, emailValidator]}
          />
        </div>
        <div className={styles.form__input}>
          <Field name='password' component={InputPassword} label='Password' validate={[required]} />
        </div>
      </div>
      <div className={styles.form__button}>
        <Button disabled={invalid || pristine || submitting} type='submit'>
          Sign In
        </Button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({
  form: 'login'
})(LoginForm);

const LoginPage = (props) => {
  const dispatch = useDispatch();
  const onSubmit = async (formData) => {
    try {
      const response = await AuthService.login(formData.email, formData.password);
      localStorage.setItem('token', response.data.token);
      dispatch(authIn());
    } catch (e) {
      throw new SubmissionError({ password: <span>Wrong email or password</span> });
    }
  };
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <img src={logo} alt='logo' />
      </header>
      <div className={styles.page__container}>
        <h1 className={styles.page__header}>Hello</h1>
        <p className={styles.page__title}>We’re glad to see you on our platform </p>
        <LoginReduxForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default LoginPage;
