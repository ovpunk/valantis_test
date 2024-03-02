import styles from "./home.module.scss";
import { useContext, useEffect, useState } from "react";
import { Pagination } from "../../components/pagination/pagination";
import { useItems, useSearch } from "../../queries/queries";
import { Products } from "../../components/products/products";
import { Filter } from "../../components/filter/filter";
import { SearchContext } from "../../components/layout/layout";
import { Loader } from "../../components/loader/loader";

export const Home = () => {
  //состояние всех id
  const [allIds, setAllIds] = useState([]);
  //состояние id для конкретной страницы
  const [idsForPage, setIdsForPage] = useState([]);
  //состояние уникальных товаров страницы
  const [uniqueItems, setUniqueItems] = useState([]);
  //состояние для смещение относительно начала списка.
  const [offset, setOffset] = useState(0);

  //состояние поля для контекста(для запроса по клику)
  const { value } = useContext(SearchContext);

  useEffect(() => {
    console.log("value", value);
  }, [value]);

  //запрос на получение всех id
  //const { ids, idsLoading } = useIds();

  //запрос на получение id по поиску
  const { filteredBySearchIds, searchLoading, searchError } = useSearch(value);

  //После поиска откат на 1 страницу в пагинации
  useEffect(() => {
    setOffset(0);
  }, [value]);

  //фильтрация только уникальных id
  useEffect(() => {
    if (filteredBySearchIds) {
      const uniqueIDs = [...new Set(filteredBySearchIds.result)];
      setAllIds(uniqueIDs);
    }
  }, [filteredBySearchIds]);

  //получение id для конкретной страницы
  useEffect(() => {
    const currentIds = allIds.slice(offset, offset + 50);
    setIdsForPage(currentIds);
  }, [allIds, offset]);

  //запрос на получение товаров по id
  const { items, itemsLoading, itemsError } = useItems(idsForPage);

  //фильтрация только уникальных товаров
  useEffect(() => {
    const unique = items?.result.reduce((acc, current) => {
      if (!acc.some((item) => item.id === current.id)) {
        acc.push(current);
      }
      return acc;
    }, []);
    setUniqueItems(unique);
  }, [items?.result]);

  const pagesCount = Math.ceil(allIds.length / 50);

  //if (fieldsLoading) return <h1>FIELDS LOADING</h1>;

  if (searchLoading || itemsLoading) return <Loader />;
  if (itemsError) return <h1>ERROR</h1>;
  if (searchError) return <h1>ErrorSearch</h1>;

  return (
    <div className={styles.home}>
      {uniqueItems && (
        <div className="container">
          <Filter />
          <Products uniqueItems={uniqueItems} />
          <Pagination
            offset={offset}
            setOffset={setOffset}
            pagesCount={pagesCount}
          />
        </div>
      )}
    </div>
  );
};
