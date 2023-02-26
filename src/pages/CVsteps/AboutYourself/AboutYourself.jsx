import React, { useEffect, useMemo, useState } from 'react';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { ClearButton } from '@components/buttons';
import { PopUpClearFields, PopUpSave, PopUpStayOrLeave, PopUpTryAgain } from '@popUps';
import { Button, CancelButton } from '@buttonsLarge';
import { trimValues } from '@validators/validators';
import { TextareaCv } from '@components/fields';
import { BoardAdvice } from '@components/boardAdvice/boardAdvice';
import {
  useAboutYourself,
  useLinkIsClicked,
  useLoadingConstructorCv,
  useLoadingSpecificCv,
  useUpdateFieldsAllCv
} from '@hooks';
import { validateAboutYourself } from '@validators/validateAboutYourself';
import { InputCv } from '@hoc/InputCv';
import { useNavigate, useParams } from 'react-router-dom';
import { navigationLinkPopUp } from '@utils/navigationLinkPopUp';
import {
  changeDirtyStatusInConstructorCv,
  changeDirtyStatusInSpecificCv,
  clearFieldsInAboutYourselfConstructorCv,
  linkIsNotClicked,
  resetDirtyStatusInConstructorCv,
  resetDirtyStatusInSpecificCv,
  updateFieldInAboutYourselfConstructorCv
} from '@actions';
import { CvPaths } from '@configs/configs';
import cx from 'classnames';
import $api from '../../../http/api';
import styles from '../CvSteps.module.scss';

export const AboutYourself = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { aboutYourself, isAboutExists } = useAboutYourself();
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
      <h2 className={cx(styles.title, styles.title_mb_60)}>3. About yourself</h2>
      <Formik
        initialValues={aboutYourself}
        validateOnChange={false}
        validate={validateAboutYourself}
        onSubmit={async (formikValues, { setStatus }) => {
          const values = trimValues(formikValues, true);

          try {
            if (uuid && !isAboutExists) {
              const { data } = await $api.post('cvs/' + uuid + '/about', values);
            } else {
              const { data } = await $api.put('cvs/' + uuid + '/about', values);
            }

            if (uuid && buttonStatus.btnNextIsClicked) {
              navigate(CvPaths.SKILLS + uuid);
            } else if (uuid && buttonStatus.btnBackIsClicked) {
              navigate(CvPaths.CONTACTS + uuid);
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
          isSubmitting,
          handleReset,
          setTouched,
          setValues,
          errors
        }) => {
          useEffect(() => {
            if (isAboutExists) {
              dispatch(changeDirtyStatusInSpecificCv(dirty));
            } else {
              dispatch(changeDirtyStatusInConstructorCv(dirty));
            }
            return () => {
              if (isAboutExists) {
                dispatch(resetDirtyStatusInSpecificCv());
              } else {
                dispatch(resetDirtyStatusInConstructorCv());
              }
            };
          }, [dirty]);

          const onClickStayPopUp = () => {
            dispatch(linkIsNotClicked());
            setTouched({
              description: true
            });
          };

          const oneIsNotEmptyValue = useMemo(
            () => Object.keys(values).some((k) => values[k] !== ''),
            [values]
          );

          const allRequiredFieldsAreFilledIn = useMemo(
            () =>
              Object.keys(values)
                .filter((k) => k !== 'selfPresentation')
                .every((k) => values[k] !== ''),

            [values]
          );
          const correctAndNotFully = useMemo(() => {
            const values = Object.values(errors);
            return !!values.length && values.every((value) => value === 'Required field');
          }, [errors]);

          const updateFieldInAboutYourselfInConstructorCv = (fieldName, value, isPageExists) => {
            if (!isPageExists) {
              dispatch(updateFieldInAboutYourselfConstructorCv(fieldName, value));
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
                    handleReset();
                    if (linkIsClicked) {
                      updateFieldsAllCv();
                    }
                  }}
                >
                  Failed to save data. Please try again
                </PopUpTryAgain>
              )}
              {dirty && allRequiredFieldsAreFilledIn && !isValid && linkIsClicked && (
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
                !allRequiredFieldsAreFilledIn &&
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
                      description: false
                    });
                    setValues(
                      {
                        description: '',
                        selfPresentation: ''
                      },
                      true
                    );
                    setClearFields(false);
                    if (!isAboutExists) {
                      dispatch(clearFieldsInAboutYourselfConstructorCv());
                    }
                  }}
                  dontClearFields={() => setClearFields(false)}
                />
              )}
              <div className={cx(styles.form__container, styles.form__container_aboutYourselfPage)}>
                <div className={styles.form__lines}>
                  <div className={styles.form__clearFields}>
                    <ClearButton
                      disabled={!oneIsNotEmptyValue}
                      onClick={() => setClearFields(true)}
                      tabIndex={13}
                    >
                      Clear fields
                    </ClearButton>
                  </div>
                  <div className={styles.form__textarea}>
                    <div className={cx(styles.form__label, styles.form__label_pt_12)}>
                      Description
                    </div>
                    <TextareaCv
                      data-id='description'
                      name='description'
                      adaptive={false}
                      maxLength={450}
                      label='Enter information about yourself'
                      activeLabel='Enter information about yourself'
                      actionOnBlur={(fieldName, value) => {
                        updateFieldInAboutYourselfInConstructorCv(fieldName, value, isAboutExists);
                      }}
                      tabIndex={11}
                    />
                  </div>
                  <div className={styles.form__inputBlock}>
                    <div className={cx(styles.form__label, styles.form__label_afterNone)}>
                      Self-presentation
                    </div>
                    <InputCv
                      data-id='selfPresentation'
                      name='selfPresentation'
                      adaptive={false}
                      maxLength={255}
                      label='Add the link'
                      activeLabel='Add the link'
                      actionOnBlur={(fieldName, value) => {
                        updateFieldInAboutYourselfInConstructorCv(fieldName, value, isAboutExists);
                      }}
                      tabIndex={12}
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
                    {...(isAboutExists &&
                      dirty &&
                      !isSubmitting && {
                        type: 'submit',
                        onClick: () =>
                          setButtonStatus({ btnNextIsClicked: false, btnBackIsClicked: true })
                      })}
                    {...(isAboutExists &&
                      !dirty &&
                      !isSubmitting && {
                        onClick: () => navigate(CvPaths.CONTACTS + uuid)
                      })}
                    {...(!isAboutExists &&
                      !isSubmitting && { onClick: () => navigate(CvPaths.CONTACTS + uuid) })}
                    isLoading={
                      !status?.errorResponse &&
                      !linkIsClicked &&
                      isSubmitting &&
                      !buttonStatus.btnNextIsClicked
                    }
                    tabIndex={15}
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
                    {...(isAboutExists &&
                      !dirty &&
                      !isSubmitting && {
                        type: 'button',
                        onClick: () => navigate(CvPaths.SKILLS + uuid)
                      })}
                    isLoading={
                      !status?.errorResponse &&
                      !linkIsClicked &&
                      isSubmitting &&
                      !buttonStatus.btnBackIsClicked
                    }
                    tabIndex={14}
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
