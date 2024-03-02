import styles from "./loader.module.scss";

export const Loader = () => {
  return (
    <div className={styles.loader_wrapper}>
      <div className={styles.loader}></div>
    </div>
  );
};
