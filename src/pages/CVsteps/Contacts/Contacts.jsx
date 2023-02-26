import React, { useEffect, useMemo, useState } from 'react';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { SelectPhoneNumberCv } from '@components/fields';
import { ClearButton } from '@components/buttons';
import { PopUpClearFields, PopUpSave, PopUpStayOrLeave, PopUpTryAgain } from '@popUps';
import { Button, CancelButton } from '@buttonsLarge';
import { validateContacts } from '@validators/validateContacts';
import { trimValues } from '@validators/validators';
import { BoardAdvice } from '@components/boardAdvice/boardAdvice';
import {
  useContacts,
  useLinkIsClicked,
  useLoadingConstructorCv,
  useLoadingSpecificCv,
  useUpdateFieldsAllCv
} from '@hooks';
import { InputCv } from '@hoc/InputCv';
import { useNavigate, useParams } from 'react-router-dom';
import { navigationLinkPopUp } from '@utils/navigationLinkPopUp';
import {
  changeDirtyStatusInConstructorCv,
  changeDirtyStatusInSpecificCv,
  clearFieldsInContactsConstructorCv,
  linkIsNotClicked,
  resetDirtyStatusInConstructorCv,
  resetDirtyStatusInSpecificCv,
  updateFieldInContactsConstructorCv
} from '@actions';
import { CvPaths } from '@configs/configs';
import cx from 'classnames';
import $api from '../../../http/api';
import styles from '../CvSteps.module.scss';

export const Contacts = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { contacts, isContactsExists } = useContacts();
  const [clearFields, setClearFields] = useState(false);
  const [buttonStatus, setButtonStatus] = useState({
    btnNextIsClicked: false,
    btnBackIsClicked: false
  });

  const isLoading = useLoadingSpecificCv();
  const isLoadingConstructorCv = useLoadingConstructorCv();
  const updateFieldsAllCv = useUpdateFieldsAllCv();

  const hrefLinkIsClicked = useLinkIsClicked();
  const { current: linkIsClicked } = hrefLinkIsClicked;

  if (isLoading || isLoadingConstructorCv) {
    return;
  }

  return (
    <section className={styles.wrapper}>
      <h2 className={cx(styles.title, styles.title_mb_60)}>2. Contacts</h2>
      <Formik
        initialValues={contacts}
        validateOnChange={false}
        validate={validateContacts}
        onSubmit={async (formikValues, { setStatus }) => {
          const values = trimValues(formikValues, true);

          const currentValues = {
            phoneCodeId: values.phoneCodeId,
            phoneNumber: values.phoneNumber,
            email: values.email,
            skype: values.skype,
            linkedin: values.linkedin,
            portfolio: values.portfolio
          };

          try {
            if (uuid && !isContactsExists) {
              const { data } = await $api.post('cvs/' + uuid + '/contacts', currentValues);
            } else {
              const { data } = await $api.put('cvs/' + uuid + '/contacts', currentValues);
            }

            if (uuid && buttonStatus.btnNextIsClicked) {
              navigate(CvPaths.ABOUTYOURSELF + uuid);
            } else if (uuid && buttonStatus.btnBackIsClicked) {
              navigate(CvPaths.PERSONALINFORMATION + uuid);
            }

            if (linkIsClicked) {
              updateFieldsAllCv();
              navigationLinkPopUp(linkIsClicked, dispatch, navigate);
            }
          } catch (e) {
            setStatus({ errorResponse: true });
          }
        }}
        onReset={() => {
          const { current } = hrefLinkIsClicked;
          if (current) {
            navigationLinkPopUp(current, dispatch, navigate);
          }
        }}
      >
        {({
          values,
          dirty,
          isValid,
          status,
          touched,
          isSubmitting,
          setStatus,
          setFieldValue,
          handleReset,
          setTouched,
          setValues,
          errors
        }) => {
          useEffect(() => {
            if (isContactsExists) {
              dispatch(changeDirtyStatusInSpecificCv(dirty));
            } else {
              dispatch(changeDirtyStatusInConstructorCv(dirty));
            }
            return () => {
              if (isContactsExists) {
                dispatch(resetDirtyStatusInSpecificCv());
              } else {
                dispatch(resetDirtyStatusInConstructorCv());
              }
            };
          }, [dirty]);

          const onClickStayPopUp = () => {
            dispatch(linkIsNotClicked());
            setTouched({
              phoneNumber: true,
              email: true,
              linkedin: true
            });
          };

          const oneIsNotEmptyValue = useMemo(
            () =>
              Object.keys(values)
                .filter((k) => k !== 'phoneCode' && k !== 'phoneCodeId')
                .some((k) => values[k] !== ''),
            [values]
          );

          const allFieldsAreFilledIn = useMemo(
            () =>
              Object.keys(values)
                .filter((k) => k !== 'skype' && k !== 'portfolio')
                .every((k) => values[k] !== ''),
            [values]
          );
          const correctAndNotFully = useMemo(() => {
            const values = Object.values(errors);
            return !!values.length && values.every((value) => value === 'Required field');
          }, [errors]);

          const updateFieldInContactsStore = (fieldName, value, isPageExists) => {
            if (!isPageExists) {
              dispatch(updateFieldInContactsConstructorCv(fieldName, value));
            }
          };

          return (
            <Form className={styles.form}>
              {dirty && isValid && linkIsClicked && !status?.errorResponse && (
                <PopUpSave
                  adaptive={false}
                  isSubmitting={isSubmitting}
                  onClickDontSave={updateFieldsAllCv}
                >
                  Do you want to save the changes in CV?
                </PopUpSave>
              )}

              {status?.errorResponse && (
                <PopUpTryAgain
                  type='button'
                  adaptive={false}
                  isSubmitting={isSubmitting}
                  onClickHandler={() => {
                    if (linkIsClicked) {
                      handleReset();
                      updateFieldsAllCv();
                    } else {
                      setStatus({ errorResponse: false });
                    }
                  }}
                >
                  Failed to save data. Please try again
                </PopUpTryAgain>
              )}
              {dirty && allFieldsAreFilledIn && !isValid && linkIsClicked && (
                <PopUpStayOrLeave
                  adaptive={false}
                  onClickStay={onClickStayPopUp}
                  onClickLeave={updateFieldsAllCv}
                >
                  <>The data is entered incorrectly</>
                  <>If you leave this page, the data will not be saved.</>
                </PopUpStayOrLeave>
              )}
              {dirty &&
                !correctAndNotFully &&
                !allFieldsAreFilledIn &&
                !isValid &&
                linkIsClicked && (
                  <PopUpStayOrLeave
                    adaptive={false}
                    onClickStay={onClickStayPopUp}
                    onClickLeave={updateFieldsAllCv}
                  >
                    <>The data is entered incorrectly and not fully</>
                    <>If you leave this page, the data will not be saved.</>
                  </PopUpStayOrLeave>
                )}
              {dirty && correctAndNotFully && linkIsClicked && (
                <PopUpStayOrLeave
                  adaptive={false}
                  onClickStay={onClickStayPopUp}
                  onClickLeave={updateFieldsAllCv}
                >
                  <>The data is entered not fully</>
                  <>If you leave this page, the data will not be saved.</>
                </PopUpStayOrLeave>
              )}

              {clearFields && (
                <PopUpClearFields
                  adaptive={false}
                  clearFields={() => {
                    setTouched({
                      phoneNumber: false,
                      email: false,
                      linkedin: false
                    });
                    setValues(
                      {
                        phoneCode: values.phoneCode,
                        phoneCodeId: values.phoneCodeId,
                        phoneNumber: '',
                        email: '',
                        skype: '',
                        linkedin: '',
                        portfolio: ''
                      },
                      true
                    );
                    setClearFields(false);
                    if (!isContactsExists) {
                      dispatch(clearFieldsInContactsConstructorCv());
                    }
                  }}
                  dontClearFields={() => setClearFields(false)}
                />
              )}
              <div className={cx(styles.form__container, styles.form__container_contactsPage)}>
                <div className={styles.form__lines}>
                  <div className={styles.form__clearFields}>
                    <ClearButton
                      disabled={!oneIsNotEmptyValue}
                      onClick={() => setClearFields(true)}
                      tabIndex={16}
                    >
                      Clear fields
                    </ClearButton>
                  </div>
                  <div className={styles.form__inputBlock}>
                    <div className={styles.form__label}>Phone</div>
                    <SelectPhoneNumberCv
                      adaptive={false}
                      name='phoneCode'
                      isPhoneNumberTouched={touched.phoneNumber}
                      setFieldValue={setFieldValue}
                      onClickPhoneCodesHandler={(fieldName, value) => {
                        updateFieldInContactsStore(fieldName, value, isContactsExists);
                      }}
                      tabIndex={-1}
                    >
                      <InputCv
                        data-id='phone'
                        adaptive={false}
                        name='phoneNumber'
                        label='Cell phone number'
                        activeLabel='Cell phone number'
                        maxLength={25}
                        showError={false}
                        actionOnBlur={(fieldName, value) => {
                          updateFieldInContactsStore(fieldName, value, isContactsExists);
                        }}
                        tabIndex={11}
                      />
                    </SelectPhoneNumberCv>
                  </div>
                  <div className={styles.form__inputBlock}>
                    <div className={styles.form__label}>Email</div>
                    <InputCv
                      data-id='email'
                      name='email'
                      adaptive={false}
                      maxLength={50}
                      label='Enter your email'
                      activeLabel='Enter your email'
                      actionOnBlur={(fieldName, value) => {
                        updateFieldInContactsStore(fieldName, value, isContactsExists);
                      }}
                      tabIndex={12}
                    />
                  </div>
                  <div className={styles.form__inputBlock}>
                    <div className={cx(styles.form__label, styles.form__label_afterNone)}>
                      Skype
                    </div>
                    <InputCv
                      data-id='skype'
                      name='skype'
                      adaptive={false}
                      maxLength={50}
                      label='Enter your Skype login'
                      activeLabel='Enter your Skype login'
                      actionOnBlur={(fieldName, value) => {
                        updateFieldInContactsStore(fieldName, value, isContactsExists);
                      }}
                      tabIndex={13}
                    />
                  </div>
                  <div className={styles.form__inputBlock}>
                    <div className={styles.form__label}>LinkedIn</div>
                    <InputCv
                      data-id='linkedin'
                      name='linkedin'
                      adaptive={false}
                      maxLength={255}
                      label='Add the link'
                      activeLabel='Add the link'
                      actionOnBlur={(fieldName, value) => {
                        updateFieldInContactsStore(fieldName, value, isContactsExists);
                      }}
                      tabIndex={14}
                    />
                  </div>
                  <div className={styles.form__inputBlock}>
                    <div className={cx(styles.form__label, styles.form__label_afterNone)}>
                      Portfolio
                    </div>
                    <InputCv
                      data-id='portfolio'
                      name='portfolio'
                      adaptive={false}
                      maxLength={255}
                      label='Add the link'
                      activeLabel='Add the link'
                      actionOnBlur={(fieldName, value) => {
                        updateFieldInContactsStore(fieldName, value, isContactsExists);
                      }}
                      tabIndex={15}
                    />
                  </div>
                </div>
                <div className={styles.form__advice}>
                  <BoardAdvice />
                </div>
              </div>
              <div className={styles.form__buttons}>
                <div className={styles.form__button}>
                  <CancelButton
                    type='button'
                    {...(isContactsExists &&
                      dirty &&
                      !isSubmitting && {
                        type: 'submit',
                        onClick: () =>
                          setButtonStatus({ btnNextIsClicked: false, btnBackIsClicked: true })
                      })}
                    {...(isContactsExists &&
                      !dirty &&
                      !isSubmitting && {
                        onClick: () => navigate(CvPaths.PERSONALINFORMATION + uuid)
                      })}
                    {...(!isContactsExists &&
                      !isSubmitting && {
                        onClick: () => navigate(CvPaths.PERSONALINFORMATION + uuid)
                      })}
                    isLoading={
                      !status?.errorResponse &&
                      !linkIsClicked &&
                      isSubmitting &&
                      !buttonStatus.btnNextIsClicked
                    }
                    tabIndex={18}
                  >
                    Back
                  </CancelButton>
                </div>
                <div className={styles.form__button}>
                  <Button
                    type='submit'
                    onClick={() =>
                      setButtonStatus({
                        btnBackIsClicked: false,
                        btnNextIsClicked: true
                      })
                    }
                    {...(isContactsExists &&
                      !dirty &&
                      !isSubmitting && {
                        type: 'button',
                        onClick: () => navigate(CvPaths.ABOUTYOURSELF + uuid)
                      })}
                    isLoading={
                      !status?.errorResponse &&
                      !linkIsClicked &&
                      isSubmitting &&
                      !buttonStatus.btnBackIsClicked
                    }
                    tabIndex={17}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};
