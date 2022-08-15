import styles from "./SpinningWheelAndError.module.scss";

const SpinningWheelAndError = (props: { error: string; loading: boolean; className?: string }) => {
  const { error, loading } = props;

  if (!error && !loading) return <></>;

  return (
    <div className={`${styles.container} ${props.className}`}>
      {!error && loading && (
        <div className={styles["lds-facebook"]}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default SpinningWheelAndError;
