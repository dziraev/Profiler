import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { ANIMATION_TIME } from './consts';
import styles from './styles.module.scss';
import animationStyles from './animation.module.scss';

const contentAnimation = {
  enter: animationStyles.contentEnter,
  enterActive: animationStyles.contentEnterActive,
  exit: animationStyles.contentExit,
  exitActive: animationStyles.contentExitActive
};

export const Layout = ({ children, show }) => {
  const contentRef = useRef();

  const [animationIn, setAnimationIn] = useState(false);

  useEffect(() => {
    setAnimationIn(show);
  }, [show]);

  return (
    <div className={styles.container}>
      <CSSTransition
        in={animationIn}
        nodeRef={contentRef}
        timeout={ANIMATION_TIME}
        mountOnEnter
        unmountOnExit
        classNames={contentAnimation}
      >
        <div ref={contentRef} className={styles.content}>
          <div className={styles.content__sign}>
            <svg
              width='64'
              height='64'
              viewBox='0 0 64 64'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M32.0006 58.6668C46.6673 58.6668 58.6673 46.6668 58.6673 32.0002C58.6673 17.3335 46.6673 5.3335 32.0006 5.3335C17.334 5.3335 5.33398 17.3335 5.33398 32.0002C5.33398 46.6668 17.334 58.6668 32.0006 58.6668Z'
                stroke='#71BD38'
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M20.666 32.0003L28.2127 39.5469L43.3327 24.4536'
                stroke='#71BD38'
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
          <div className={styles.content__text}>{children}</div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Layout;
