import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { validateDetails } from '../../utils/validators/validateDetails';
import { useDispatch, useSelector } from 'react-redux';
import {
  countriesLoad,
  editModeOff,
  editModeOn,
  personalDetailsUpdate,
  phoneCodesLoad,
  positionsLoad
} from '../../redux/actions';
import { InputPersonalDetails } from '@components/fields';
import { Button, CancelButton } from '@components/buttons';
import { SearchBar, SelectPositions, SelectPhoneNumber } from '@components/fields';
import { PopUpSave } from '../../components/popup/save/PopUpSave';
import { selectPersonalDetails } from './selectors';
import styles from './PersonalDetails.module.scss';

const PersonalDetails = (props) => {
  const dispatch = useDispatch();
  const personalDetails = useSelector(selectPersonalDetails);
  const isEdit = useSelector((state) => state.editModeReducer.isEdit);
  const linkIsClicked = useSelector((state) => state.linkIsClickedReducer.linkIsClicked);
  const [countryId, setCountryId] = useState(null);
  useEffect(() => {
    dispatch(countriesLoad());
    dispatch(phoneCodesLoad());
    dispatch(positionsLoad());
  }, []);

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
          dispatch(editModeOff());
        }}
        onReset={() => {
          dispatch(editModeOff());
        }}
        validate={validateDetails}
      >
        {(formik) => {
          const { dirty, setFieldValue, handleSubmit, handleReset } = formik;

          return (
            <Form className={styles.form}>
              {isEdit && linkIsClicked ? (
                <PopUpSave handleSubmit={handleSubmit} handleReset={handleReset}>
                  Do you want to save the changes in Personal details?
                </PopUpSave>
              ) : (
                ''
              )}
              <div className={styles.form__inputs}>
                <div className={styles.form__input}>
                  <InputPersonalDetails
                    name='name'
                    maxLength={50}
                    label='Name'
                    activeLabel='Enter your name'
                    disabled={!isEdit}
                  />
                </div>
                <div className={styles.form__input}>
                  <InputPersonalDetails
                    name='surname'
                    maxLength={50}
                    label='Surname'
                    activeLabel='Enter your surname'
                    disabled={!isEdit}
                  />
                </div>
                <div className={`${styles.form__input} ${styles['order-2']}`}>
                  <SearchBar
                    name='country'
                    label='Country'
                    maxLength={50}
                    activeLabel='Enter your location'
                    autoComplete={'off'}
                    disabled={!isEdit}
                    setCountryId={setCountryId}
                    setFieldValue={setFieldValue}
                  />
                </div>
                <div className={`${styles.form__input} ${styles['order-3']}`}>
                  <InputPersonalDetails
                    name='email'
                    label='Email'
                    activeLabel='Enter your email'
                    disabled={!isEdit}
                  />
                </div>
                <div className={`${styles.form__input} ${styles['order-2']}`}>
                  <SelectPhoneNumber
                    name='phoneCode'
                    disabled={!isEdit}
                    countryId={countryId}
                    setFieldValue={setFieldValue}
                  >
                    <InputPersonalDetails
                      name='cellPhone'
                      label='Cell phone number'
                      activeLabel='Enter cell phone number'
                      maxLength={25}
                      disabled={!isEdit}
                      showError={false}
                    />
                  </SelectPhoneNumber>
                </div>
                <div className={`${styles.form__input} ${styles['order-1']}`}>
                  <SelectPositions
                    name='position'
                    label='Position'
                    disabled={!isEdit}
                    setFieldValue={setFieldValue}
                  />
                </div>
              </div>
              <div className={styles.form__buttons}>
                {!isEdit && (
                  <div className={styles.form__button}>
                    <Button type='button' onClick={() => dispatch(editModeOn())}>
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
