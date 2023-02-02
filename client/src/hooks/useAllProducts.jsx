import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useCallback } from "react";

export default function useAllProducts(url, pathname) {
  const handleProductsList = useCallback(async () => {
    try {
      return (await axios.get(url)).data;
    } catch (error) {
      return console.error(error);
    }
  }, [url]);
  const {
    isLoading,
    error,
    data: productsList,
  } = useQuery(["productsList", pathname], handleProductsList, {});
  useEffect(() => {
    handleProductsList();
  }, [handleProductsList]);
  return { isLoading, error, productsList };
}
