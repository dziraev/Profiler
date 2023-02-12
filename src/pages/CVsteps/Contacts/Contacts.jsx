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
import { useContacts } from '@hooks/useContacts';
import { useLinkIsClicked } from '@hooks/useLinkIsClicked';
import { useLoadingSpecificCv } from '@hooks/useLoadingSpecificCv';
import { InputCv } from '@hoc/InputCv';
import { useNavigate, useParams } from 'react-router-dom';
import {
  changeDirtyStatusInConstructorCv,
  changeDirtyStatusInSpecificCv,
  clearFieldsInContactsConstructorCv,
  linkIsNotClicked,
  updateContactsInSpecificCv,
  updateFieldInContactsConstructorCv
} from '@actions';
import cx from 'classnames';
import $api from '../../../http/api';
import styles from '../CvSteps.module.scss';
import { useLoadingConstructorCv } from '@hooks/useLoadingConstructorCv';
import { useUpdateFieldsConstructorCv } from '@hooks/useUpdateFieldsConstructorCv';

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
  const updateFieldsConstructorCv = useUpdateFieldsConstructorCv();

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
              dispatch(
                updateContactsInSpecificCv({
                  contacts: data,
                  isContactsExists: true
                })
              );
            } else {
              const { data } = await $api.put('cvs/' + uuid + '/contacts', currentValues);
              dispatch(updateContactsInSpecificCv({ contacts: data }));
            }

            if (uuid && buttonStatus.btnNextIsClicked) {
              navigate('../about-yourself/' + uuid);
            } else if (uuid && buttonStatus.btnBackIsClicked) {
              navigate('../personal-info/' + uuid);
            }
            setButtonStatus({
              btnNextIsClicked: false,
              btnBackIsClicked: false
            });
          } catch (e) {
            setStatus({ errorResponse: true });
          }
        }}
        onReset={() => {
          const { current } = hrefLinkIsClicked;
          if (current && current === '/auth') {
            localStorage.removeItem('token');
            dispatch({ type: 'USER_LOGOUT' });
            navigate(current);
          }
          if (current && current !== '/auth') {
            navigate(current);
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
                  {...(!isContactsExists && {
                    onClickSave: updateFieldsConstructorCv,
                    onClickDontSave: updateFieldsConstructorCv
                  })}
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
                      // !isContactsExists ? updateFieldsConstructorCv() : null; //TODO: cannot use it because when calling the SavePopUps the fields are already cleared
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
                  {...(!isContactsExists && { onClickLeave: updateFieldsConstructorCv })}
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
                    {...(!isContactsExists && { onClickLeave: updateFieldsConstructorCv })}
                  >
                    <>The data is entered incorrectly and not fully</>
                    <>If you leave this page, the data will not be saved.</>
                  </PopUpStayOrLeave>
                )}
              {dirty && correctAndNotFully && linkIsClicked && (
                <PopUpStayOrLeave
                  adaptive={false}
                  onClickStay={onClickStayPopUp}
                  {...(!isContactsExists && { onClickLeave: updateFieldsConstructorCv })}
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
              <div className={cx(styles.form__container, styles.form__container_secondPage)}>
                <div className={styles.form__lines}>
                  <div className={styles.form__clearFields}>
                    <ClearButton
                      disabled={!oneIsNotEmptyValue}
                      onClick={() => setClearFields(true)}
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
                        onClick: () => setButtonStatus({ ...buttonStatus, btnBackIsClicked: true })
                      })}
                    {...(isContactsExists &&
                      !dirty &&
                      !isSubmitting && {
                        onClick: () => navigate('../personal-info/' + uuid)
                      })}
                    {...(!isContactsExists &&
                      !isSubmitting && { onClick: () => navigate('../personal-info/' + uuid) })}
                    isLoading={
                      !status?.errorResponse &&
                      !linkIsClicked &&
                      isSubmitting &&
                      !buttonStatus.btnNextIsClicked
                    }
                  >
                    Back
                  </CancelButton>
                </div>
                <div className={styles.form__button}>
                  <Button
                    type='submit'
                    onClick={() =>
                      setButtonStatus({
                        ...buttonStatus,
                        btnNextIsClicked: true
                      })
                    }
                    {...(isContactsExists &&
                      !dirty &&
                      !isSubmitting && {
                        type: 'button',
                        onClick: () => navigate('../about-yourself/' + uuid)
                      })}
                    isLoading={
                      !status?.errorResponse &&
                      !linkIsClicked &&
                      isSubmitting &&
                      !buttonStatus.btnBackIsClicked
                    }
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
