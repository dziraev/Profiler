import React, { useMemo, useState } from 'react';
import { Form, Formik } from 'formik';
import cx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { CheckBox, InputPersonalDetails, SearchBar, SelectPositions } from '@components/fields';
import Photo from '@components/photo/Photo';
import { ClearButton } from '@components/buttons';
import { PopUpClearFields, PopUpTryAgain } from '@popUps';
import { Button } from '@buttonsLarge';
import { initialState } from '@reducers/CVReducers/PersonalInformationReducer';
import { validatePersonalInformation } from '@validators/validatePersonalInformation';
import { trimValues } from '@validators/validators';
import $api from '../../../http/api';
import { BoardAdvice } from '@components/boardAdvice/boardAdvice';
import styles from './PersonalInformation.module.scss';

export const PersonalInformation = () => {
  const dispatch = useDispatch();
  const { personalInformation, imageUuid } = useSelector(
    (state) => state.personalInformationReducer
  );
  const [clearFields, setClearFields] = useState(false);

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>1. Personal information</h2>
      <Formik
        initialValues={personalInformation}
        validateOnChange={false}
        validate={validatePersonalInformation}
        onSubmit={async (formikValues, { setStatus }) => {
          const values = trimValues(formikValues);

          const currentValues = {
            imageUuid,
            name: values.name,
            surname: values.surname,
            positionId: values.positionId,
            countryId: values.countryId,
            city: values.city,
            isReadyToRelocate: values.isReadyToRelocate,
            isReadyForRemoteWork: values.isReadyForRemoteWork
          };

          try {
            const response = await $api.post('/cvs', currentValues);
          } catch (e) {
            setStatus({ errorResponse: true });
          }
        }}
      >
        {(formik) => {
          const { values, status, isSubmitting, setStatus, setFieldValue, setTouched, setValues } =
            formik;

          const notEmptyValues = useMemo(
            () => Object.values(values).some((field) => field !== '' && field !== false),
            [values]
          );

          return (
            <Form className={styles.form}>
              {status?.errorResponse && (
                <PopUpTryAgain
                  isSubmitting={isSubmitting}
                  onClickHandler={() => setStatus({ errorResponse: false })}
                  type='button'
                >
                  Failed to save data. Please try again
                </PopUpTryAgain>
              )}

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
                <div className={styles.form__inputBlock}>
                  <div className={cx(styles.form__label, styles.form__label_afterNone)}>Photo</div>
                  <Photo />
                </div>
                <div className={styles.form__lines}>
                  <div className={styles.form__clearFields}>
                    <ClearButton disabled={!notEmptyValues} onClick={() => setClearFields(true)}>
                      Clear fields
                    </ClearButton>
                  </div>
                  <div className={styles.form__inputBlock}>
                    <div className={styles.form__label}>Name</div>
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
                    <div className={styles.form__label}>Surname</div>
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
                    <div className={styles.form__label}>Position</div>
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
                    <div className={styles.form__label}>Country</div>
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
                    <div className={styles.form__label}>City</div>
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
                  <CheckBox name='isReadyToRelocate' label='Ready to relocate' />
                  <CheckBox name='isReadyForRemoteWork' label='Ready for remote work' />
                </div>
              </div>
              <div className={styles.form__buttons}>
                <div className={styles.form__button}>
                  <Button type={isSubmitting ? 'button' : 'submit'}>Next</Button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};
