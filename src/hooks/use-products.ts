import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchProducts,
  fetchProductById,
  fetchProductsByCategory,
  fetchPaginatedProducts,
  
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
  const { queries, total } = useAppSelector((state) => state.products);

  useEffect(() => {
    const queryKey = getQueryKey(params);
    if (!queries[queryKey]?.status || queries[queryKey]?.status === "failed") {
      dispatch(fetchProducts(params));
    }
  }, [dispatch, params, queries]);

  const queryKey = getQueryKey(params);
  const currentQuery = queries[queryKey] || {
    items: [],
    status: "idle",
    error: null,
  };

  return {
    products: currentQuery.items,
    total,
    isLoading: currentQuery.status === "loading",
    isError: currentQuery.status === "failed",
    error: currentQuery.error,
  };
};
export const useProductById = (params: {
  id: string | string[] | number;
  select?: string[];
}): {
  product: Product | undefined;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
} => {
  const dispatch = useAppDispatch();
  const { queries, status, error } = useAppSelector((state) => state.products);

  const queryKey = getQueryKey({
    id: Array.isArray(params.id) ? params.id[0] : params.id,
  });
  const items = queries[queryKey]?.items || [];

  useEffect(() => {
    const productId = Array.isArray(params.id) ? params.id[0] : params.id;

    dispatch(
      fetchProductById({
        id: productId,
        select: params.select,
      })
    );
  }, [dispatch, params.id, params.select]);

  return {
    product: items[0],
    isLoading: status === "loading",
    isError: status === "failed",
    error,
  };
};

export const useProductsByCategory = (params: {
  category: string;
  select?: string[];
  limit?: number;
  skip?: number;
}) => {
  const dispatch = useAppDispatch();
  const { queries, status, error, total } = useAppSelector(
    (state) => state.products
  );

  const queryKey = getQueryKey(params);
  const items = queries[queryKey]?.items || [];

  useEffect(() => {
    dispatch(fetchProductsByCategory(params));
  }, [dispatch, params]);

  return {
    products: items,
    total,
    isLoading: status === "loading" || status === "idle",
    isError: status === "failed",
    error,
  };
};

export const usePaginatedProducts = (params: {
  limit?: number;
  skip?: number;
  select?: string[];
}) => {
  const dispatch = useAppDispatch();
  const { queries, status, error, total } = useAppSelector(
    (state) => state.products
  );

  const queryKey = getQueryKey(params);
  const items = queries[queryKey]?.items || [];

  useEffect(() => {
    dispatch(fetchPaginatedProducts(params));
  }, [dispatch, params]);

  return {
    products: items,
    total,
    isLoading: status === "loading" || status === "idle",
    isError: status === "failed",
    error,
  };
};

