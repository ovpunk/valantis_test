import { useContext, useEffect, useState } from "react";
import { Pagination } from "../../components/pagination/pagination";
import {
  useBrandFields,
  useBrandFilter,
  useItems,
  usePriceFilter,
  useSearch,
} from "../../queries/queries";
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
  const { inputValue } = useContext(SearchContext);
  //состояние цены
  const { priceFilterValue } = useContext(SearchContext);
  //состояние уникальных брендов
  const [brands, setBrands] = useState([]);
  //состояние выбранного бренда
  const { selectedBrand } = useContext(SearchContext);

  //запрос на получение id по поиску
  const { filteredBySearchIds, searchLoading, isSearchError, searchError } =
    useSearch(inputValue);

  //запрос на получение id по фильтру цены
  const {
    filteredByPriceIds,
    filterPriceLoading,
    isFilterPriceError,
    filterPriceError,
  } = usePriceFilter(Number(priceFilterValue));

  //запрос на получение полей брендов
  const {
    brandsFields,
    brandsFieldsLoading,
    isBrandsFieldsError,
    brandsFieldsError,
  } = useBrandFields();

  //фильтрация только уникальных брендов
  useEffect(() => {
    if (brandsFields) {
      const uniqueBrands = [...new Set(brandsFields.result)];
      setBrands(uniqueBrands);
    }
  }, [brandsFields]);

  //запрос на получение твоаров конкретного бренда
  const {
    filteredByBrandIds,
    filterBrandLoading,
    isFilterBrandError,
    filterBrandError,
  } = useBrandFilter(selectedBrand);

  //фильтрация только уникальных id
  useEffect(() => {
    if (filteredBySearchIds && filteredBySearchIds.result?.length !== 0) {
      const uniquePriceIds = [...new Set(filteredBySearchIds.result)];
      setAllIds(uniquePriceIds);
    }
    if (filteredByBrandIds && filteredByBrandIds.result?.length !== 0) {
      const uniqueBrandIds = [...new Set(filteredByBrandIds.result)];
      setAllIds(uniqueBrandIds);
    }
    if (filteredByPriceIds && filteredByPriceIds.result?.length !== 0) {
      const uniqueIDs = [...new Set(filteredByPriceIds.result)];
      setAllIds(uniqueIDs);
    }
  }, [filteredByBrandIds, filteredByPriceIds, filteredBySearchIds]);

  //получение id для конкретной страницы
  useEffect(() => {
    const currentIds = allIds.slice(offset, offset + 50);
    setIdsForPage(currentIds);
  }, [allIds, offset]);

  //запрос на получение товаров по id
  const { items, itemsLoading, isItemsError, itemsError } =
    useItems(idsForPage);
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

  //После поиска откат на 1-ую страницу в пагинации
  useEffect(() => {
    setOffset(0);
  }, [inputValue]);

  //количество страниц
  const pagesCount = Math.ceil(allIds.length / 50);

  if (
    searchLoading ||
    itemsLoading ||
    filterPriceLoading ||
    brandsFieldsLoading ||
    filterBrandLoading
  )
    return <Loader />;

  if (isItemsError) console.log(itemsError.message);
  if (isBrandsFieldsError) console.log(brandsFieldsError.message);
  if (isSearchError) console.log(searchError.message);
  if (isFilterPriceError) console.log(filterPriceError.message);
  if (isFilterBrandError) console.log(filterBrandError.message);

  return (
    <div className="home">
      {uniqueItems && (
        <div className="container">
          <Filter
            filteredByPriceIdsCount={filteredByPriceIds.result.length}
            filteredByBrandIdsCount={filteredByBrandIds.result.length}
            brands={brands}
            setOffset={setOffset}
          />
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
