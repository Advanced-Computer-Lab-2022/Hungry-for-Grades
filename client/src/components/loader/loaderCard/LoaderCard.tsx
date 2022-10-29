import styles from './loaderCard.module.scss';
import { type LoaderCardProps } from './types';

function LoaderCard(props: LoaderCardProps) {
  const logo = import.meta.env.VITE_APP_AUTHOR;

  return (
    <article className={props.className}>
      <div style={{ margin: '0.5rem auto 2rem' }}>
        <img
          alt='logo'
          src={logo}
          style={{ width: '100px', height: '100px' }}
        />
      </div>
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
