import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { selectAdvices } from '@components/boardAdvice/selectors';
import styles from './boardAdvice.module.scss';

const cx = classNames.bind(styles);

export const BoardAdvice = () => {
  const advices = useSelector(selectAdvices);
  const [adviceName, setAdviceName] = useState('default');

  useEffect(() => {
    const handleClick = (e) => {
      const nodeWithDataId = e.target.closest('[data-id]');
      if (nodeWithDataId) {
        setAdviceName(nodeWithDataId.getAttribute('data-id'));
      } else if (e.target.closest('[data-board-advice]')) {
        return;
      } else {
        setAdviceName('default');
      }
    };

    document.addEventListener('click', handleClick, { capture: true });
    document.addEventListener('focus', handleClick, { capture: true });

    return () => {
      document.removeEventListener('click', handleClick, { capture: true });
      document.removeEventListener('focus', handleClick, { capture: true });
    };
  }, []);

  const advice = useMemo(() => {
    for (const advice of advices) {
      if (advice.name === adviceName) return advice;
    }
  }, [adviceName]);

  return (
    <div data-board-advice key={adviceName} className={styles.boardAdvice}>
      <div
        className={cx(styles.boardAdvice__container, {
          boardAdvice__container_animation: adviceName !== 'default'
        })}
      >
        <div className={styles.boardAdvice__content}>
          <div className={styles.boardAdvice__title}>{advice?.title}</div>
          <div
            className={styles.boardAdvice__hint}
            dangerouslySetInnerHTML={{ __html: advice?.text }}
          />
        </div>
      </div>
    </div>
  );
};
