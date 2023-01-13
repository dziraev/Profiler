import React, { useEffect, useRef, useState } from 'react';
import { Form, Formik } from 'formik';
import { validateDetails } from '../../utils/validators/validateDetails';
import { useDispatch } from 'react-redux';
import {
  changeDirtyStatusFormPD,
  linkIsNotClicked,
  personalDetailsUpdate,
  resetDirtyStatusFormPD
} from '../../redux/actions';
import { PopUpCancelChanges, PopUpSave, PopUpTryAgain } from '@components/popup';
import {
  InputPersonalDetails,
  SearchBar,
  SelectPhoneNumber,
  SelectPositions
} from '@components/fields';
import { useNavigate } from 'react-router-dom';
import { Button, CancelButton } from '@components/buttons';
import { Notification } from '@components/tooltip/Notification';
import { getChangedValues } from '../../utils/getChangedValues';
import { usePersonalDetails } from '@hooks/usePersonalDetails';
import $api from '../../http/api';
import info from '../../static/images/info.png';
import styles from './PersonalDetails.module.scss';

const PersonalDetails = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [cancelIsClicked, setCancelIsClicked] = useState(false);
  const [countryId, setCountryId] = useState(null);
  const { personalDetails, linkIsClicked } = usePersonalDetails();
  const hrefLinkIsClicked = useRef(null);
  hrefLinkIsClicked.current = linkIsClicked;
  useEffect(() => {
    setIsEdit(false);
    dispatch(linkIsNotClicked());
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
        onSubmit={async (values, formikHelpers) => {
          const { setStatus } = formikHelpers;
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
            if (hrefLinkIsClicked.current && hrefLinkIsClicked.current === '/auth') {
              localStorage.removeItem('token');
              dispatch({ type: 'USER_LOGOUT' });
              navigate(linkIsClicked);
            }
            if (hrefLinkIsClicked.current && hrefLinkIsClicked.current !== '/auth') {
              navigate(linkIsClicked);
            }
            dispatch(resetDirtyStatusFormPD());
          } catch (e) {
            dispatch(linkIsNotClicked());
            setStatus({ errorResponse: true });
          }
        }}
        onReset={() => {
          dispatch(resetDirtyStatusFormPD());
          setIsEdit(false);
          setCancelIsClicked(false);
          dispatch(linkIsNotClicked());
        }}
        validate={validateDetails}
      >
        {(formik) => {
          const { dirty, isSubmitting, setFieldValue, handleReset, status, setStatus } = formik;

          useEffect(() => {
            dispatch(changeDirtyStatusFormPD(dirty));
          }, [dirty]);

          return (
            <Form className={styles.form}>
              {dirty && linkIsClicked && (
                <PopUpSave isSubmitting={isSubmitting} handleReset={handleReset}>
                  Do you want to save the changes in Personal details?
                </PopUpSave>
              )}
              {status?.errorResponse && (
                <PopUpTryAgain
                  isSubmitting={isSubmitting}
                  onClickHandler={() => setStatus({ errorResponse: false })}
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
                    <Button type='button' onClick={() => setIsEdit(true)}>
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
