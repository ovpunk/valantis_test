import { useQuery } from "@tanstack/react-query";
import {
  brandFilterFetch,
  fieldsFetch,
  getItemsFetch,
  priceFilterFetch,
  searchFetch,
} from "../api/api";

//запрос на получение товаров по id
export const useItems = (idsForPage) => {
  const {
    data: items,
    isLoading: itemsLoading,
    isError: isItemsError,
    error: itemsError,
  } = useQuery({
    queryKey: ["getItems", idsForPage],
    queryFn: async () => {
      if (idsForPage) {
        const res = await getItemsFetch(idsForPage);
        if (res.ok) {
          const response = await res.json();
          return response;
        }
      }
      throw new Error("Failed to fetch items");
    },
    enabled: !!idsForPage,
  });
  return { items, itemsLoading, isItemsError, itemsError };
};
//запрос на получение списка брендов
export const useBrandFields = () => {
  const {
    data: brandsFields,
    isLoading: brandsFieldsLoading,
    isError: isBrandsFieldsError,
    error: brandsFieldsError,
  } = useQuery({
    queryKey: ["getFilds"],
    queryFn: async () => {
      const res = await fieldsFetch();
      if (res.ok) {
        const response = await res.json();
        return response;
      }
      throw new Error("Failed to fetch field");
    },
  });
  return {
    brandsFields,
    brandsFieldsLoading,
    isBrandsFieldsError,
    brandsFieldsError,
  };
};

//запрос на получение id по названию товара
export const useSearch = (value) => {
  const {
    data: filteredBySearchIds,
    isLoading: searchLoading,
    isError: isSearchError,
    error: searchError,
  } = useQuery({
    queryKey: ["geSearchFilter", value],
    queryFn: async () => {
      const res = await searchFetch(value);
      if (res.ok) {
        const response = await res.json();
        return response;
      }
      throw new Error("Failed to fetch search");
    },
  });
  return { filteredBySearchIds, searchLoading, isSearchError, searchError };
};

//запрос на получение id по цене
export const usePriceFilter = (value) => {
  const {
    data: filteredByPriceIds,
    isLoading: filterPriceLoading,
    isError: isFilterPriceError,
    error: filterPriceError,
  } = useQuery({
    queryKey: ["getPriceFilter", value],
    queryFn: async () => {
      const res = await priceFilterFetch(value);
      if (res.ok) {
        const response = await res.json();
        return response;
      }
      throw new Error("Failed to fetch filter price");
    },
  });

  return {
    filteredByPriceIds,
    filterPriceLoading,
    isFilterPriceError,
    filterPriceError,
  };
};

//запрос на получение списка id по названию бренда
export const useBrandFilter = (value) => {
  const {
    data: filteredByBrandIds,
    isLoading: filterBrandLoading,
    isError: isFilterBrandError,
    error: filterBrandError,
  } = useQuery({
    queryKey: ["getBrandFilter", value],
    queryFn: async () => {
      const res = await brandFilterFetch(value);
      if (res.ok) {
        const response = await res.json();
        return response;
      }
      throw new Error("Failed to fetch filter brand");
    },
  });
  return {
    filteredByBrandIds,
    filterBrandLoading,
    isFilterBrandError,
    filterBrandError,
  };
};
