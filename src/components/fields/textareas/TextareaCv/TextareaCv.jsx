import React, { useCallback, useState } from 'react';
import { useField } from 'formik';
import { debounce } from '@utils/debounce';
import classNames from 'classnames/bind';
import styles from '../Textarea.module.scss';

const cx = classNames.bind(styles);

export const TextareaCv = ({
  name,
  maxLength,
  label,
  activeLabel,
  actionOnBlur,
  adaptive = true,
  ...props
}) => {
  const [warning, setWarning] = useState(false);
  const [active, setActive] = useState(false);
  const [field, meta] = useField(name);
  const hasError = !!(meta.error && meta.touched);

  const { value } = field;

  const handleBlur = (e) => {
    field.onBlur(e);
    setActive(false);
    if (actionOnBlur) {
      actionOnBlur(name, value);
    }
  };

  const handleFocus = (e) => {
    setActive(true);
  };

  const updateStateWarning = useCallback(
    debounce(
      (state) => {
        setWarning(state);
      },
      1000,
      false
    ),
    []
  );
  const handleChange = (e) => {
    e.target.value = e.target.value.replace(/\n/, '');

    const { value } = e.target;

    if (value.length > maxLength) {
      e.target.value = value.substring(0, maxLength);
      setWarning(true);
      updateStateWarning(false);
    }

    field.onChange(e);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.textarea}>
        <textarea
          {...props}
          {...field}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChange={handleChange}
          className={cx(styles.textarea__block, {
            textarea_error: hasError,
            textarea_warning: warning,
            textarea_adaptive: adaptive
          })}
          placeholder={active ? activeLabel : label}
        />
        <span className={cx(styles.textarea__counter)}>
          {value.length}/{maxLength}
        </span>
      </div>
      {hasError && (
        <div
          className={cx(styles.error, {
            error_adaptive: adaptive,
            error_notAdaptive: !adaptive
          })}
        >
          <svg
            width='18'
            height='18'
            viewBox='0 0 18 18'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M9 5.5C9.27614 5.5 9.5 5.72386 9.5 6V9.75C9.5 10.0261 9.27614 10.25 9 10.25C8.72386 10.25 8.5 10.0261 8.5 9.75V6C8.5 5.72386 8.72386 5.5 9 5.5Z'
              fill='#D40000'
            />
            <path
              d='M8.99609 11.25C8.58188 11.25 8.24609 11.5858 8.24609 12C8.24609 12.4142 8.58188 12.75 8.99609 12.75H9.00283C9.41704 12.75 9.75283 12.4142 9.75283 12C9.75283 11.5858 9.41704 11.25 9.00283 11.25H8.99609Z'
              fill='#D40000'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M1 9C1 4.59886 4.59886 1 9 1C13.4011 1 17 4.59886 17 9C17 13.4011 13.4011 17 9 17C4.59886 17 1 13.4011 1 9ZM9 2C5.15114 2 2 5.15114 2 9C2 12.8489 5.15114 16 9 16C12.8489 16 16 12.8489 16 9C16 5.15114 12.8489 2 9 2Z'
              fill='#D40000'
            />
          </svg>
          {meta.error}
        </div>
      )}
    </div>
  );
};
