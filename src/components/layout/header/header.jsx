import { useContext, useEffect, useState } from "react";
import styles from "./header.module.scss";
import { SearchContext } from "../layout";

export const Header = () => {
  //состояние поля в компоненте
  const [value, setValue] = useState("");

  //состояние поля для контекста(для запроса по клику)
  const { setInputValue } = useContext(SearchContext);

  const { setSelectedBrand } = useContext(SearchContext);

  const { setPriceFilterValue } = useContext(SearchContext);

  //изменение состояния для контекста
  const handleSearch = () => {
    setSelectedBrand("Выбрать бренд");
    setPriceFilterValue(0);
    setInputValue(value);
  };

  //возврат, если поле поиска пустое
  useEffect(() => {
    if (value.length === 0) {
      setInputValue("");
    }
  }, [value.length, setInputValue]);

  return (
    <header className="header">
      <div className={styles.logo}>Valantis</div>
      <div className={styles.search_wrapper}>
        <input
          placeholder="Поиск"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button onClick={() => handleSearch()}>
          <svg
            className="feather feather-search"
            fill="none"
            height="24"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" x2="16.65" y1="21" y2="16.65" />
          </svg>
        </button>
      </div>
    </header>
  );
};
