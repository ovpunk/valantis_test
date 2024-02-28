import styles from "./home.module.scss";

import { useEffect, useState } from "react";
import { Pagination } from "../../components/pagination/pagination";
import { useIds, useItems } from "../../queries/queries";
import { Products } from "../../components/products/products";

export const Home = () => {
  //состояние всех id
  const [allIds, setAllIds] = useState([]);
  //состояние id для конкретной страницы
  const [idsForPage, setIdsForPage] = useState([]);
  //состояние уникальных товаров страницы
  const [uniqueItems, setUniqueItems] = useState([]);
  //состояние для смещение относительно начала списка.
  const [offset, setOffset] = useState(0);

  //запрос на получение всех id
  const { ids, idsLoading } = useIds();

  //фильтрация только уникальных id
  useEffect(() => {
    if (ids) {
      const uniqueIDs = [...new Set(ids.result)];
      setAllIds(uniqueIDs);
    }
  }, [ids]);

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

  if (idsLoading || itemsLoading) return <h1>LOADING</h1>;
  if (itemsError) return <h1>ERROR</h1>;
  return (
    <div className={styles.home}>
      {uniqueItems && (
        <>
          <Products uniqueItems={uniqueItems} />
          <Pagination
            offset={offset}
            setOffset={setOffset}
            pagesCount={pagesCount}
          />
        </>
      )}
    </div>
  );
};
