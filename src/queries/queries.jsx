import { useQuery } from "@tanstack/react-query";
import { getIdsFetch, getItemsFetch } from "../api/api";

//запрос на получение всех id
export const useIds = () => {
  const { data: ids, isLoading: idsLoading } = useQuery({
    queryKey: ["getIds"],
    queryFn: async () => {
      const res = await getIdsFetch();
      if (res.ok) {
        const response = await res.json();
        return response;
      }
      throw new Error("Failed to fetch ids");
    },
  });
  return {
    ids,
    idsLoading,
  };
};
//запрос на получение товаров по id
export const useItems = (idsForPage) => {
  const {
    data: items,
    isLoading: itemsLoading,
    isError: itemsError,
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
      throw new Error("Failed to fetch ids");
    },
    enabled: !!idsForPage,
  });
  return { items, itemsLoading, itemsError };
};
