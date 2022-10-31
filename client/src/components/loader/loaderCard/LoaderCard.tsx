import styles from './loaderCard.module.scss';

function LoaderCard() {
  const logo = import.meta.env.VITE_APP_LOGO_URL;

  return (
    <article className='my-4 card rounded bg-light shadow'>
      <div className='p-5 mx-auto'>
        <img
          alt='logo'
          className='card-img-top'
          src={logo}
          style={{ width: '80%', height: '80%' }}
        />
      </div>
      <div className={`card-body`}>
        <div className={`${styles.urls__blink ?? ''}`}>
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
      </div>
    </article>
  );
}

export default LoaderCard;
