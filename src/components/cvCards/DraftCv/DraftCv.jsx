import React from 'react';
import { CvPaths } from '@configs/configs';
import { useNavigate } from 'react-router-dom';
import styles from './DraftCv.module.scss';

export const DraftCv = ({ position, uuid, status }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.card} onClick={() => navigate(CvPaths.PERSONALINFORMATION + uuid)}>
      <div className={styles.draft__container}>
        <div className={styles.draft__dot}>
          <svg
            width='4'
            height='12'
            viewBox='0 0 4 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M2.33334 12C1.92084 12 1.56784 11.8533 1.27434 11.5598C0.980344 11.2658 0.833344 10.9125 0.833344 10.5C0.833344 10.0875 0.980344 9.73425 1.27434 9.44025C1.56784 9.14675 1.92084 9 2.33334 9C2.74584 9 3.09909 9.14675 3.39309 9.44025C3.68659 9.73425 3.83334 10.0875 3.83334 10.5C3.83334 10.9125 3.68659 11.2658 3.39309 11.5598C3.09909 11.8533 2.74584 12 2.33334 12ZM2.33334 7.5C1.92084 7.5 1.56784 7.353 1.27434 7.059C0.980344 6.7655 0.833344 6.4125 0.833344 6C0.833344 5.5875 0.980344 5.23425 1.27434 4.94025C1.56784 4.64675 1.92084 4.5 2.33334 4.5C2.74584 4.5 3.09909 4.64675 3.39309 4.94025C3.68659 5.23425 3.83334 5.5875 3.83334 6C3.83334 6.4125 3.68659 6.7655 3.39309 7.059C3.09909 7.353 2.74584 7.5 2.33334 7.5ZM2.33334 3C1.92084 3 1.56784 2.853 1.27434 2.559C0.980344 2.2655 0.833344 1.9125 0.833344 1.5C0.833344 1.0875 0.980344 0.7345 1.27434 0.441C1.56784 0.147 1.92084 0 2.33334 0C2.74584 0 3.09909 0.147 3.39309 0.441C3.68659 0.7345 3.83334 1.0875 3.83334 1.5C3.83334 1.9125 3.68659 2.2655 3.39309 2.559C3.09909 2.853 2.74584 3 2.33334 3Z'
              fill='#25225D'
            />
          </svg>
        </div>
        <div className={styles.title}>
          <div className={styles.title__status}>{status}</div>
          <div className={styles.title__position}>{position}</div>
        </div>
      </div>
    </div>
  );
};
