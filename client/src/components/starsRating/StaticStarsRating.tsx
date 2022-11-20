import styles from './staticStarsRating.module.scss';

function StaticStarsRating(props: { rating: number; comment: string }) {
  return (
    <div
      className={styles.Stars}
      style={
        {
          '--rating': props.rating
        } as React.CSSProperties
      }
    >
      {' '}
      {props.comment}
    </div>
  );
}

export default StaticStarsRating;
