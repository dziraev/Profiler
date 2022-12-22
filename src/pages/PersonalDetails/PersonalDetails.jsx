import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { validateDetails } from '../../utils/validators/validateDetails';
import { useDispatch, useSelector } from 'react-redux';
import { personalDetailsUpdate } from '../../redux/actions';
import Input from '../../components/fields/inputs/Input/Input';
import Button from '../../components/buttons/Button/Button';
import CancelButton from '../../components/buttons/CancelButton/CancelButton';
import SearchBar from '../../components/fields/SearchBar/SearchBar';
import Select from '../../components/fields/Select/Select';
import styles from './PersonalDetails.module.scss';

const PersonalDetails = () => {
  const dispatch = useDispatch();
  const { countriesReducer, personalDetailsReducer } = useSelector((state) => state);
  const { countries } = countriesReducer;
  const { personalDetails } = personalDetailsReducer;

  const [isEdit, setIsEdit] = useState(false);

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Personal details</h2>
      <Formik
        enableReinitialize={true}
        initialValues={personalDetails}
        validateOnChange={false}
        onSubmit={(values) => {
          for (let key in values) {
            if (typeof values[key] === 'string') values[key] = values[key].trim();
          }
          dispatch(personalDetailsUpdate(values));
          setIsEdit(false);
        }}
        onReset={() => {
          setIsEdit(false);
        }}
        validate={validateDetails}
      >
        {(formik) => {
          const { dirty, handleReset } = formik;

          return (
            <Form className={styles.form}>
              <div className={styles.form__inputs}>
                <div className={styles.form__input}>
                  <Input
                    name='name'
                    maxLength={50}
                    label='Name'
                    activeLabel='Enter your name'
                    disabled={!isEdit}
                  />
                </div>
                <div className={styles.form__input}>
                  <Input
                    name='surname'
                    maxLength={50}
                    label='Surname'
                    activeLabel='Enter your surname'
                    disabled={!isEdit}
                  />
                </div>
                <div className={styles.form__input}>
                  <SearchBar
                    name='country'
                    label='Country'
                    activeLabel='Enter your location'
                    autoComplete={'off'}
                    disabled={!isEdit}
                    data={countries}
                  />
                </div>
                <div className={styles.form__input}>
                  <Input
                    name='email'
                    label='Email'
                    activeLabel='Enter your email'
                    disabled={!isEdit}
                  />
                </div>
                <div className={styles.form__input}>
                  <Select name='position' label='Position' disabled={!isEdit} />
                </div>
              </div>
              <div className={styles.form__buttons}>
                {!isEdit && (
                  <div className={styles.form__button}>
                    <Button type='button' onClick={() => setIsEdit(true)}>
                      Edit
                    </Button>
                  </div>
                )}
                {isEdit && (
                  <>
                    <div className={styles.form__button}>
                      <CancelButton type='reset'>Cancel</CancelButton>
                    </div>
                    <div className={styles.form__button}>
                      <Button type='submit' disabled={!dirty}>
                        Save
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

export default PersonalDetails;
