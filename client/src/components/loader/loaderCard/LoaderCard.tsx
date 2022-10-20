import { ReactElement } from 'react';

import styles from './loaderCard.module.css';

function LoaderCard(props: { img: ReactElement; className: string }) {
  return (
    <article className={props.className}>
      <div style={{ margin: '0.5rem auto 2rem' }}>{props.img}</div>
      <div className={styles.urls__blink}>
        <div className={styles.blink}>asas </div>
        <div className={styles.blink}>asas </div>
        <div className={styles.blink}>asas </div>
        <div className={styles.blink}>asas </div>
      </div>

      <br />
      <div className={styles.blink}>Lorem ipssadasdas</div>
      <br />
      <div className={styles.blink}>
        Lorem ipssadasdas dasa ddsasdasds lorem ipssadasdas
      </div>
    </article>
  );
}

export default LoaderCard;
