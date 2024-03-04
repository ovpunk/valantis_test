import { SearchContext } from "../layout/layout";
import styles from "./filter.module.scss";
import { useContext, useState } from "react";
export const Filter = ({
  filteredByPriceIdsCount,
  filteredByBrandIdsCount,
  brands,
  setOffset,
}) => {
  //состояние поля цены
  const [value, setValue] = useState("");

  //состояние видимости фильтра
  const [visibleFilter, setVisibleFilter] = useState(false);

  const {
    priceFilterValue,
    setPriceFilterValue,
    selectedBrand,
    setSelectedBrand,
  } = useContext(SearchContext);

  //сброс фильтров, откат к 1 странице
  const handleResetFilter = () => {
    setPriceFilterValue(0);
    setSelectedBrand("Выбрать бренд");
    setOffset(0);
  };

  return (
    <>
      <div
        className={styles.filter_title}
        onClick={() => setVisibleFilter(!visibleFilter)}
      >
        <p>Фильтр</p>
        {!visibleFilter ? (
          <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
            <title />
            <path d="M81.8457,25.3876a6.0239,6.0239,0,0,0-8.45.7676L48,56.6257l-25.396-30.47a5.999,5.999,0,1,0-9.2114,7.6879L43.3943,69.8452a5.9969,5.9969,0,0,0,9.2114,0L82.6074,33.8431A6.0076,6.0076,0,0,0,81.8457,25.3876Z" />
          </svg>
        ) : (
          <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
            <title />
            <path d="M82.6074,62.1072,52.6057,26.1052a6.2028,6.2028,0,0,0-9.2114,0L13.3926,62.1072a5.999,5.999,0,1,0,9.2114,7.6879L48,39.3246,73.396,69.7951a5.999,5.999,0,1,0,9.2114-7.6879Z" />
          </svg>
        )}
      </div>
      {visibleFilter && (
        <div className={styles.filter}>
          <div className={styles.price}>
            <p>Найти по цене:</p>
            <input
              type="number"
              placeholder="Ввести цену"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setPriceFilterValue(value);
                }
              }}
            />
            <button onClick={() => setPriceFilterValue(value)}>Найти</button>
          </div>
          <div className={styles.brand}>
            <p>Найти по бренду:</p>
            <select onChange={(e) => setSelectedBrand(e.target.value)}>
              {brands.map((brand) => (
                <option key={brand}>
                  {brand === null ? "Выбрать бренд" : brand}
                </option>
              ))}
            </select>
          </div>
          {(!!priceFilterValue || selectedBrand !== "Выбрать бренд") && (
            <button
              onClick={() => handleResetFilter()}
              className={styles.reset}
            >
              Сбросить фильтры
            </button>
          )}
        </div>
      )}
      <div className={styles.description_wrapper}>
        {filteredByPriceIdsCount === 0 && priceFilterValue ? (
          <p className={styles.description}>
            По цене {priceFilterValue} ₽ ничего не найдено
          </p>
        ) : (
          ""
        )}
        {filteredByPriceIdsCount > 0 && priceFilterValue ? (
          <p className={styles.description}>
            По цене {priceFilterValue} ₽ найдено {filteredByPriceIdsCount}{" "}
            товар(а/ов)
          </p>
        ) : (
          ""
        )}
        {filteredByBrandIdsCount ? (
          <p className={styles.description}>
            {selectedBrand} найдено {filteredByBrandIdsCount} товар(а/ов)
          </p>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
