import React, { useEffect, useMemo, useState } from 'react';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { InputPersonalDetails, SelectPhoneNumber } from '@components/fields';
import { ClearButton } from '@components/buttons';
import { PopUpClearFields, PopUpSave, PopUpStayOrLeave, PopUpTryAgain } from '@popUps';
import { Button, CancelButton } from '@buttonsLarge';
import { validateContacts } from '@validators/validateContacts';
import { trimValues } from '@validators/validators';
import { BoardAdvice } from '@components/boardAdvice/boardAdvice';
import { useContacts } from '@hooks/useContacts';
import { useLinkIsClicked } from '@hooks/useLinkIsClicked';
import { useNavigate, useParams } from 'react-router-dom';
import {
  changeDirtyStatusFormCv,
  linkIsNotClicked,
  updatePersonaInformation
} from '../../../redux/actions';
import cx from 'classnames';
import $api from '../../../http/api';
import styles from '../CvSteps.module.scss';

export const Contacts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contacts = useContacts();
  const [clearFields, setClearFields] = useState(false);
  const [btnNextIsClicked, setBtnNextIsClicked] = useState(false);

  const hrefLinkIsClicked = useLinkIsClicked();
  const { current: linkIsClicked } = hrefLinkIsClicked;

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>2. Contacts</h2>
      <Formik
        enableReinitialize={true}
        initialValues={contacts}
        validateOnChange={false}
        validate={validateContacts}
        onSubmit={async (formikValues, { setStatus }) => {
          const values = trimValues(formikValues);

          const currentValues = {
            phoneCodeId: values.phoneCodeId,
            phoneNumber: values.phoneNumber,
            email: values.email,
            skype: values.skype,
            linkedin: values.linkedin,
            portfolio: values.portfolio
          };

          try {
            let data;
            if (!uuid) {
              ({ data } = await $api.post('cvs/', currentValues));
            } else {
              ({ data } = await $api.put('cvs/' + uuid, currentValues));
            }

            dispatch(updatePersonaInformation(data));

            if (!uuidParams && btnNextIsClicked) {
              navigate('../contacts');
            } else if (uuidParams && btnNextIsClicked) {
              navigate('../contacts/' + uuid);
            }
          } catch (e) {
            setStatus({ errorResponse: true });
          } finally {
            setBtnNextIsClicked(false);
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
          isSubmitting,
          setStatus,
          setFieldValue,
          setTouched,
          setValues,
          errors
        }) => {
          const { uuid } = values;

          useEffect(() => {
            dispatch(changeDirtyStatusFormCv(dirty));
          }, [dirty]);

          const onClickStayPopUp = () => {
            dispatch(linkIsNotClicked());
            setTouched({
              name: true,
              surname: true,
              country: true,
              position: true,
              city: true
            });
          };

          const oneIsNotEmptyValue = useMemo(
            () => Object.keys(values).some((k) => values[k] !== ''),
            [values]
          );

          const allFieldsAreFilledIn = useMemo(
            () => Object.keys(values).every((k) => values[k] !== ''),

            [values]
          );
          const correctAndNotFully = useMemo(() => {
            const values = Object.values(errors);
            return !!values.length && values.every((value) => value === 'Required field');
          }, [errors]);

          return (
            <Form className={styles.form}>
              {dirty && isValid && linkIsClicked && !status?.errorResponse && (
                <PopUpSave adaptive={false} isSubmitting={isSubmitting}>
                  Do you want to save the changes in CV?
                </PopUpSave>
              )}

              {status?.errorResponse && (
                <PopUpTryAgain
                  adaptive={false}
                  isSubmitting={isSubmitting}
                  onClickHandler={() => setStatus({ errorResponse: false })}
                  type='button'
                >
                  Failed to save data. Please try again
                </PopUpTryAgain>
              )}
              {dirty && allFieldsAreFilledIn && !isValid && linkIsClicked && (
                <PopUpStayOrLeave adaptive={false} onClickStay={onClickStayPopUp}>
                  <>The data is entered incorrectly</>
                  <>If you leave this page, the data will not be saved.</>
                </PopUpStayOrLeave>
              )}
              {dirty &&
                !correctAndNotFully &&
                !allFieldsAreFilledIn &&
                !isValid &&
                linkIsClicked && (
                  <PopUpStayOrLeave adaptive={false} onClickStay={onClickStayPopUp}>
                    <>The data is entered incorrectly and not fully</>
                    <>If you leave this page, the data will not be saved.</>
                  </PopUpStayOrLeave>
                )}
              {dirty && correctAndNotFully && linkIsClicked && (
                <PopUpStayOrLeave adaptive={false} onClickStay={onClickStayPopUp}>
                  <>The data is entered not fully</>
                  <>If you leave this page, the data will not be saved.</>
                </PopUpStayOrLeave>
              )}

              {clearFields && (
                <PopUpClearFields
                  adaptive={false}
                  clearFields={() => {
                    setTouched({
                      phoneCode: false,
                      phoneCodeId: false,
                      cellPhone: false,
                      email: false,
                      skype: false,
                      linkedin: false,
                      portfolio: false
                    });
                    setValues(
                      {
                        phoneCode: '',
                        phoneCodeId: '',
                        cellPhone: '',
                        email: '',
                        skype: '',
                        linkedin: '',
                        portfolio: ''
                      },
                      true
                    );
                    setClearFields(false);
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
                    <SelectPhoneNumber name='phoneCode' setFieldValue={setFieldValue}>
                      <InputPersonalDetails
                        name='cellPhone'
                        label='Cell phone number'
                        activeLabel='Cell phone number'
                        maxLength={25}
                        showError={false}
                      />
                    </SelectPhoneNumber>
                  </div>
                  <div className={styles.form__inputBlock}>
                    <div className={styles.form__label}>Email</div>
                    <InputPersonalDetails
                      data-id='email'
                      name='email'
                      adaptive={false}
                      maxLength={50}
                      label='Enter your email'
                      activeLabel='Enter your email'
                    />
                  </div>
                  <div className={styles.form__inputBlock}>
                    <div className={cx(styles.form__label, styles.form__label_afterNone)}>
                      Skype
                    </div>
                    <InputPersonalDetails
                      data-id='skype'
                      name='skype'
                      adaptive={false}
                      maxLength={50}
                      label='Enter your Skype'
                      activeLabel='Enter your Skype'
                    />
                  </div>
                  <div className={styles.form__inputBlock}>
                    <div className={styles.form__label}>Linkdin</div>
                    <InputPersonalDetails
                      data-id='linkedin'
                      name='linkedin'
                      adaptive={false}
                      maxLength={255}
                      label='Add the link'
                      activeLabel='Add the link'
                    />
                  </div>
                  <div className={styles.form__inputBlock}>
                    <div className={cx(styles.form__label, styles.form__label_afterNone)}>
                      Portfolio
                    </div>
                    <InputPersonalDetails
                      data-id='portfolio'
                      name='portfolio'
                      adaptive={false}
                      maxLength={255}
                      label='Add the link'
                      activeLabel='Add the link'
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
                    onClick={() => navigate('../personal-info/' + uuidParams)}
                  >
                    Back
                  </CancelButton>
                </div>
                <div className={styles.form__button}>
                  <Button
                    type='button'
                    {...(uuid &&
                      !dirty &&
                      !isSubmitting && {
                        onClick: () => navigate('../contacts/' + uuidParams)
                      })}
                    {...(dirty &&
                      !isSubmitting && {
                        type: 'submit',
                        onClick: () => setBtnNextIsClicked(true)
                      })}
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
