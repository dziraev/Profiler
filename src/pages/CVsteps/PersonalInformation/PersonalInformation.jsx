import React, { useEffect, useMemo, useState } from 'react';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { usePersonalInformation } from '@hooks/usePersonalInformation';
import { CheckBox, InputPersonalDetails, SearchBar, SelectPositions } from '@components/fields';
import PhotoCV from '@components/photo/PhotoCV/PhotoCV';
import { ClearButton } from '@components/buttons';
import { PopUpClearFields, PopUpSave, PopUpStayOrLeave, PopUpTryAgain } from '@popUps';
import { Button } from '@buttonsLarge';
import { validatePersonalInformation } from '@validators/validatePersonalInformation';
import { trimValues } from '@validators/validators';
import { BoardAdvice } from '@components/boardAdvice/boardAdvice';
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

export const PersonalInformation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const personalInformation = usePersonalInformation();
  const [clearFields, setClearFields] = useState(false);
  const [btnNextIsClicked, setBtnNextIsClicked] = useState(false);

  const hrefLinkIsClicked = useLinkIsClicked();
  const { current: linkIsClicked } = hrefLinkIsClicked;

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>1. Personal information</h2>
      <Formik
        enableReinitialize={true}
        initialValues={personalInformation}
        validateOnChange={false}
        validate={validatePersonalInformation}
        onSubmit={async (formikValues, { setStatus }) => {
          const values = trimValues(formikValues);

          const { uuid } = values;

          const currentValues = {
            imageUuid: values.imageUuid,
            name: values.name,
            surname: values.surname,
            positionId: values.positionId,
            countryId: values.countryId,
            city: values.city,
            isReadyToRelocate: values.isReadyToRelocate,
            isReadyForRemoteWork: values.isReadyForRemoteWork
          };

          try {
            let data;
            if (!uuid) {
              ({ data } = await $api.post('cvs', currentValues));
            } else {
              ({ data } = await $api.put('cvs/' + uuid, currentValues));
            }

            dispatch(updatePersonaInformation(data));

            if (data.uuid && btnNextIsClicked) {
              navigate('../contacts/' + data.uuid);
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
          handleReset,
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
            () =>
              Object.keys(values)
                .filter((k) => k !== 'uuid' && k !== 'imageUuid')
                .some((k) => values[k] !== '' && values[k] !== false),
            [values]
          );

          const allFieldsAreFilledIn = useMemo(
            () =>
              Object.keys(values)
                .filter(
                  (k) =>
                    k !== 'uuid' &&
                    k !== 'imageUuid' &&
                    k !== 'isReadyToRelocate' &&
                    k !== 'isReadyForRemoteWork'
                )
                .every((k) => values[k] !== ''),

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
                  type='button'
                  adaptive={false}
                  isSubmitting={isSubmitting}
                  onClickHandler={() => {
                    if (linkIsClicked) {
                      handleReset();
                    } else {
                      setStatus({ errorResponse: false });
                    }
                  }}
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
                      name: false,
                      surname: false,
                      country: false,
                      position: false,
                      city: false
                    });
                    setValues(
                      {
                        uuid: values.uuid,
                        imageUuid: values.imageUuid,
                        name: '',
                        surname: '',
                        country: '',
                        countryId: '',
                        position: '',
                        positionId: '',
                        city: '',
                        isReadyToRelocate: false,
                        isReadyForRemoteWork: false
                      },
                      true
                    );
                    setClearFields(false);
                  }}
                  dontClearFields={() => setClearFields(false)}
                />
              )}
              <div className={cx(styles.form__container, styles.form__container_firstPage)}>
                <div className={styles.form__photo}>
                  <div className={cx(styles.form__label, styles.form__label_afterNone)}>Photo</div>
                  <PhotoCV />
                </div>
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
                    <div className={styles.form__label}>Name</div>
                    <InputPersonalDetails
                      data-id='name'
                      name='name'
                      adaptive={false}
                      maxLength={50}
                      label='Enter your name'
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
                      label='Enter your surname'
                      activeLabel='Enter your surname'
                    />
                  </div>
                  <div className={styles.form__inputBlock}>
                    <div className={styles.form__label}>Position</div>
                    <SelectPositions
                      data-id='position'
                      name='position'
                      adaptive={false}
                      label='Choose your position'
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
                      maxLength={50}
                      label='Enter your location'
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
                      label='Enter your localization city'
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
                  <Button
                    type='button'
                    {...(uuid &&
                      !dirty &&
                      !isSubmitting && {
                        onClick: () => navigate('../contacts/' + uuid)
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
