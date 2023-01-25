import React, { useMemo, useState } from 'react';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { CheckBox, InputPersonalDetails, SearchBar, SelectPositions } from '@components/fields';
import Photo from '@components/photo/Photo';
import { ClearButton } from '@components/buttons';
import { PopUpClearFields } from '@popUps';
import { Button } from '@buttonsLarge';
import { initialState } from '@reducers/CVReducers/PersonalInformationReducer';
import { validatePersonalInformation } from '@validators/validatePersonalInformation';
import { BoardAdvice } from '@components/boardAdvice/boardAdvice';
import styles from './PersonalInformation.module.scss';

export const PersonalInformation = () => {
  const dispatch = useDispatch();
  const personalInformation = useSelector(
    (state) => state.personalInformationReducer.personalInformation
  );
  const [clearFields, setClearFields] = useState(false);

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>1. Personal information</h2>
      <Formik
        initialValues={personalInformation}
        validateOnChange={false}
        validate={validatePersonalInformation}
        onSubmit={(values) => {}}
      >
        {(formik) => {
          const { values, setFieldValue, setTouched, setValues } = formik;

          const notEmptyValues = useMemo(
            () => Object.values(values).some((field) => field !== '' && field !== 0),
            [values]
          );

          return (
            <Form className={styles.form}>
              {clearFields && (
                <PopUpClearFields
                  clearFields={() => {
                    setTouched({
                      name: true,
                      surname: true,
                      country: true,
                      position: true,
                      city: true
                    });
                    setValues(initialState.personalInformation, true);
                    setClearFields(false);
                  }}
                  dontClearFields={() => setClearFields(false)}
                />
              )}
              <div className={styles.form__container}>
                <Photo page='cabinet' />
                <div className={styles.form__lines}>
                  <div className={styles.form__clearFields}>
                    <ClearButton disabled={!notEmptyValues} onClick={() => setClearFields(true)}>
                      Clear fields
                    </ClearButton>
                  </div>
                  <div className={styles.form__inputBlock}>
                    <label className={styles.form__label}>Name</label>
                    <InputPersonalDetails
                      data-id='name'
                      name='name'
                      adaptive={false}
                      maxLength={50}
                      label='Name'
                      activeLabel='Enter your name'
                    />
                  </div>
                  <div className={styles.form__inputBlock}>
                    <label className={styles.form__label}>Surname</label>
                    <InputPersonalDetails
                      data-id='surname'
                      name='surname'
                      adaptive={false}
                      maxLength={50}
                      label='Surname'
                      activeLabel='Enter your surname'
                    />
                  </div>
                  <div className={styles.form__inputBlock}>
                    <label className={styles.form__label}>Position</label>
                    <SelectPositions
                      data-id='position'
                      name='position'
                      adaptive={false}
                      label='Position'
                      activeLabel='Choose your position'
                      setFieldValue={setFieldValue}
                    />
                  </div>
                  <div className={styles.form__inputBlock}>
                    <label className={styles.form__label}>Country</label>
                    <SearchBar
                      data-id='country'
                      name='country'
                      adaptive={false}
                      label='Country'
                      maxLength={50}
                      activeLabel='Enter your location'
                      setFieldValue={setFieldValue}
                    />
                  </div>
                  <div className={styles.form__inputBlock}>
                    <label className={styles.form__label}>City</label>
                    <InputPersonalDetails
                      data-id='city'
                      name='city'
                      adaptive={false}
                      maxLength={50}
                      label='City'
                      activeLabel='Enter your localization city'
                    />
                  </div>
                </div>
                <div className={styles.form__advice}>
                  <BoardAdvice />
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
