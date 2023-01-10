import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { validateDetails } from '../../utils/validators/validateDetails';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  countriesLoad,
  editModeOff,
  editModeOn,
  linkIsNotClicked,
  personalDetailsUpdate,
  phoneCodesLoad,
  positionsLoad
} from '../../redux/actions';
import { PopUpSave, PopUpTryAgain, PopUpCancelChanges } from '@components/popup';
import { InputPersonalDetails } from '@components/fields';
import { Button, CancelButton } from '@components/buttons';
import { SearchBar, SelectPositions, SelectPhoneNumber } from '@components/fields';
import { selectPersonalDetails } from './selectors';
import { Notification } from '@components/tooltip/Notification';
import { getChangedValues } from '../../utils/getChangedValues';
import $api from '../../http/api';
import info from '../../static/images/info.png';
import styles from './PersonalDetails.module.scss';

const PersonalDetails = (props) => {
  const [errorResponse, setErrorResponse] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const personalDetails = useSelector(selectPersonalDetails);
  const isEdit = useSelector((state) => state.editModeReducer.isEdit);
  const linkIsClicked = useSelector((state) => state.linkIsClickedReducer.linkIsClicked);
  const [countryId, setCountryId] = useState(null);
  const [cancelIsClicked, setCancelIsClicked] = useState(false);
  useEffect(() => {
    dispatch(countriesLoad());
    dispatch(phoneCodesLoad());
    dispatch(positionsLoad());
  }, []);

  return (
    <section className={styles.wrapper}>
      <div className={styles.blockTitle}>
        <h2 className={styles.title}>Personal details</h2>
        <Notification>
          <img src={info} alt='notification'></img>
        </Notification>
      </div>
      <Formik
        enableReinitialize={true}
        initialValues={personalDetails}
        validateOnChange={false}
        onSubmit={async (values) => {
          for (let key in values) {
            if (typeof values[key] === 'string') values[key] = values[key].trim();
          }

          const initialValues = {
            name: personalDetails.name || null,
            surname: personalDetails.surname || null,
            countryId: personalDetails.countryId || null,
            email: personalDetails.email || null,
            phoneCodeId: personalDetails.phoneCodeId || null,
            cellPhone: personalDetails.cellPhone || null,
            positionId: personalDetails.positionId || null
          };

          const currentValues = {
            name: values.name || null,
            surname: values.surname || null,
            countryId: values.countryId || null,
            email: values.email || null,
            phoneCodeId: values.phoneCodeId || null,
            cellPhone: values.cellPhone || null,
            positionId: values.positionId || null
          };

          try {
            if (!values.userInDB) {
              const response = await $api.post('/profile', currentValues);
            } else {
              const changedValues = getChangedValues(currentValues, initialValues);
              const response = await $api.put('/profile', changedValues);
            }
            dispatch(personalDetailsUpdate(values));
            dispatch(editModeOff());
            dispatch(linkIsNotClicked());
          } catch (e) {
            setErrorResponse(true);
            dispatch(editModeOff());
            dispatch(linkIsNotClicked());
          }
        }}
        onReset={() => {
          dispatch(editModeOff());
          setCancelIsClicked(false);
          dispatch(linkIsNotClicked());
        }}

        validate={validateDetails}
      >
        {(formik) => {
          const { dirty, isSubmitting, setFieldValue, handleReset, handleSubmit } = formik;

          return (
            <Form className={styles.form}>
              {isEdit && linkIsClicked && (
                <PopUpSave isSubmitting={isSubmitting} handleReset={handleReset} handleSubmit={handleSubmit}>
                  Do you want to save the changes in Personal details?
                </PopUpSave>
              )}
              {errorResponse && (
                <PopUpTryAgain
                  type={isSubmitting ? 'button' : 'submit'}
                  onClick={() => setErrorResponse(false)}
                >
                  Failed to save data. Please try again
                </PopUpTryAgain>
              )}
              {cancelIsClicked && dirty && (
                <PopUpCancelChanges setCancelIsClicked={setCancelIsClicked}>
                  Do you really want to cancel the changes?
                </PopUpCancelChanges>
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
                    maxLength={50}
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
                    activeLabel='Choose your position'
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
                      <CancelButton
                        type='reset'
                        {...(dirty && {
                          type: 'button',
                          onClick: () => setCancelIsClicked(!cancelIsClicked)
                        })}
                      >
                        Cancel
                      </CancelButton>
                    </div>
                    <div className={styles.form__button}>
                      <Button type={isSubmitting ? 'button' : 'submit'} disabled={!dirty}>
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
