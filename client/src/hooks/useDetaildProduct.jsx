import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useCallback } from "react";

export function useDetaildProduct(url, id) {
  const handleDetailList = useCallback(async () => {
    try {
      return (await axios.get(url)).data;
    } catch (error) {
      return console.error(error);
    }
  }, [url]);
  const {
    isLoading,
    error,
    data: pageDetail,
  } = useQuery(["pageDetail", id], handleDetailList, {});
  useEffect(() => {
    handleDetailList();
  }, [handleDetailList]);
  return { isLoading, error, pageDetail };
}
