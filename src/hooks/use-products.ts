import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchProducts,
  fetchProductById,

} from "@/store/features/products.slice";
import type { Product } from "@/types/products";

interface GetProductsParams {
  id?: string | number;
  category?: string;
  query?: string;
  limit?: number;
  skip?: number;
  select?: string[];
  sortBy?: keyof Product;
  order?: "asc" | "desc";
}

const getQueryKey = (params?: GetProductsParams) => {
  return JSON.stringify(params);
};

export const useProducts = (params?: GetProductsParams) => {
  const dispatch = useAppDispatch();
  const queryKey = getQueryKey(params);

  const currentQuery = useAppSelector(
    (state) =>
      state.products.queries[queryKey] || {
        items: [],
        status: "idle",
        error: null,
      }
  );
  const total = useAppSelector((state) => state.products.total);

  const refetch = useCallback(() => {
    dispatch(fetchProducts(params));
  }, [dispatch, params]);

  useEffect(() => {
    if (currentQuery.status === "idle") {
      dispatch(fetchProducts(params));
    }
  }, [currentQuery.status, dispatch, queryKey]);

  return {
    products: currentQuery.items,
    total,
    isLoading: currentQuery.status === "loading",
    isError: currentQuery.status === "failed",
    error: currentQuery.error,
    refetch,
  };
};

export const useProductById = (params: {
  id: string | string[] | number;
  select?: string[];
}) => {
  const dispatch = useAppDispatch();
  const productId = Array.isArray(params.id) ? params.id[0] : params.id;
  const queryKey = getQueryKey({ id: productId });

  const currentQuery = useAppSelector(
    (state) =>
      state.products.queries[queryKey] || {
        items: [],
        status: "idle",
        error: null,
      }
  );

  const refetch = useCallback(() => {
    dispatch(fetchProductById({ id: productId, select: params.select }));
  }, [dispatch, productId, params.select]);

  useEffect(() => {
    if (currentQuery.status === "idle") {
      dispatch(fetchProductById({ id: productId, select: params.select }));
    }
  }, [currentQuery.status, dispatch, productId, params.select, queryKey]);

  return {
    product: currentQuery.items[0],
    isLoading: currentQuery.status === "loading",
    isError: currentQuery.status === "failed",
    error: currentQuery.error,
    refetch,
  };
};
