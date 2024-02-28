import styles from "./products.module.scss";

export const Products = ({ uniqueItems }) => {
  return (
    <div className="container">
      <div className={styles.products}>
        {uniqueItems &&
          uniqueItems.map((el) => (
            <div key={el.id} className={styles.product}>
              <p className={styles.id}>{el.id}</p>
              <h1 className={styles.name}>{el.product}</h1>

              <p className={styles.price}>
                <span>Цена:</span> {el.price} ₽
              </p>
              <span className={styles.brand}>{el.brand && el.brand}</span>
            </div>
          ))}
      </div>
    </div>
  );
};
