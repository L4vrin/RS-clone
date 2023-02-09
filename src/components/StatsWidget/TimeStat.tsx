import styles from './statsWidget.module.scss';

const TimeStat = ({ time }: { time: number }) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  return (
    <>
      {hours ? (
        <>
          <span className={styles.number}>{hours}</span>
          <span className={styles.text}>h</span>
        </>
      ) : (
        ''
      )}
      <span className={styles.number}>{minutes}</span>
      <span className={styles.text}>m</span>
    </>
  );
};

export default TimeStat;
