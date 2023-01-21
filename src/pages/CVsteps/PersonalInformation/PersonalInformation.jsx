import React from 'react';
import { Form, Formik } from 'formik';
import { CheckBox, InputPersonalDetails, SearchBar, SelectPositions } from '@components/fields';
import { Button } from '@components/buttons';
import { ClearButton } from '@components/buttons';
import { validatePersonalInformation } from '@validators/validatePersonalInformation';
import { useSelector } from 'react-redux';
import styles from './PersonalInformation.module.scss';

export const PersonalInformation = () => {
  const personalInformation = useSelector(
    (state) => state.personalInformationReducer.personalInformation
  );

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>1. Personal information</h2>
      <Formik
        initialValues={personalInformation}
        validateOnChange={false}
        validate={validatePersonalInformation}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(formik) => {
          const { dirty, setFieldValue } = formik;

          return (
            <Form className={styles.form}>
              <div className={styles.form__container}>
                <div className={styles.form__lines}>
                  <div className={styles.form__clearFields}>
                    <ClearButton disabled={!dirty}>Clear fields</ClearButton>
                  </div>
                  <div className={styles.form__inputBlock}>
                    <label className={styles.form__label}>Name</label>
                    <InputPersonalDetails
                      name='name'
                      maxLength={50}
                      label='Name'
                      activeLabel='Enter your name'
                      adaptiveError={false}
                    />
                  </div>
                  <div className={styles.form__inputBlock}>
                    <label className={styles.form__label}>Surname</label>
                    <InputPersonalDetails
                      name='surname'
                      maxLength={50}
                      label='Surname'
                      activeLabel='Enter your surname'
                      adaptiveError={false}
                    />
                  </div>
                  <div className={styles.form__inputBlock}>
                    <label className={styles.form__label}>Position</label>
                    <SelectPositions
                      name='position'
                      label='Position'
                      activeLabel='Choose your position'
                      setFieldValue={setFieldValue}
                    />
                  </div>
                  <div className={styles.form__inputBlock}>
                    <label className={styles.form__label}>Country</label>
                    <SearchBar
                      name='country'
                      label='Country'
                      maxLength={50}
                      activeLabel='Enter your location'
                      setFieldValue={setFieldValue}
                    />
                  </div>
                  <div className={styles.form__inputBlock}>
                    <label className={styles.form__label}>City</label>
                    <InputPersonalDetails
                      name='city'
                      maxLength={50}
                      label='City'
                      activeLabel='Enter your localization city'
                      adaptiveError={false}
                    />
                  </div>
                </div>
                <div className={styles.boardAdvice}>
                  <div className={styles.boardAdvice__title}>Advice on filling in</div>
                  <div className={styles.boardAdvice__hint}>
                    Click on the field to get a hint. Please fill in all fields in English.
                  </div>
                </div>
                <div className={styles.form__checkboxes}>
                  <CheckBox name='readyToRelocate' label='Ready to relocate' />
                  <CheckBox name='readyForRemoteWork' label='Ready for remote work' />
                </div>
              </div>
              <div className={styles.form__buttons}>
                <div className={styles.form__button}>
                  <Button type='submit'>Next</Button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};
