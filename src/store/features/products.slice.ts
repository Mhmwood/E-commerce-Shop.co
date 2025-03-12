import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productEndpoints } from "@/api/products";
import type { Product } from "@/types/products";

interface ProductsState {
  queries: {
    [key: string]: {
      items: Product[];
      status: "idle" | "loading" | "succeeded" | "failed";
      error?: string | null;
      countOfQueries: number;
    };
  };
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  total: number;
  skip: number;
  limit: number;
}

interface GetProductsParams {
  category?: string;
  query?: string;
  limit?: number;
  skip?: number;
  select?: string[];
  sortBy?: keyof Product;
  order?: "asc" | "desc";
}

interface GetProductByIdParams {
  id: number | string;
  select?: string[];
}


export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params?: GetProductsParams) => {
    return await productEndpoints.getProducts(params);
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async ({ id, select }: GetProductByIdParams) => {
    return await productEndpoints.getProductById({ id, select });
  }
);



export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (query: string) => {
    return await productEndpoints.searchProducts({ query });
  }
);

const initialState: ProductsState = {
  queries: {},
  status: "idle",
  error: null,
  total: 0,
  skip: 0,
  limit: 0,
};

const getQueryKey = (params?: any): string => {
  return JSON.stringify(params);
};

const clearFirstQueryCache = (
  state: { queries: Record<string, { countOfQueries: number }> },
  maxQueries: number = 5
): void => {
  const keys = Object.keys(state.queries);
  if (keys.length >= maxQueries) {
    delete state.queries[keys[0]];
  }
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH PRODUCTS
      .addCase(fetchProducts.pending, (state, action) => {
        const queryKey = getQueryKey(action.meta.arg);
        state.queries[queryKey] = {
          items: [],
          status: "loading",
          error: null,
          countOfQueries: 0,
        };
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const queryKey = getQueryKey(action.meta.arg);

        state.queries[queryKey] = {
          items: action.payload.products,
          status: "succeeded",
          error: null,
          countOfQueries: (state.queries[queryKey]?.countOfQueries || 0) + 1,
        };
        state.total = action.payload.total;
        state.skip = action.payload.skip;
        state.limit = action.payload.limit;

        clearFirstQueryCache(state);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        const queryKey = getQueryKey(action.meta.arg);
        state.queries[queryKey] = {
          items: [],
          status: "failed",
          error: action.error.message || "Failed to fetch products",
          countOfQueries: state.queries[queryKey]?.countOfQueries || 0,
        };
      })

      // FETCH PRODUCT BY ID
      .addCase(fetchProductById.pending, (state, action) => {
        const queryKey = getQueryKey(action.meta.arg);
        state.queries[queryKey] = {
          items: [],
          status: "loading",
          error: null,
          countOfQueries: 0,
        };
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        const queryKey = getQueryKey(action.meta.arg);
        state.queries[queryKey] = {
          items: [action.payload], // Single item response
          status: "succeeded",
          error: null,
          countOfQueries: (state.queries[queryKey]?.countOfQueries || 0) + 1,
        };
        clearFirstQueryCache(state);
      })

      .addCase(fetchProductById.rejected, (state, action) => {
        const queryKey = getQueryKey(action.meta.arg);
        state.queries[queryKey] = {
          items: [],
          status: "failed",
          error: action.error.message || "Failed to fetch product",
          countOfQueries: state.queries[queryKey]?.countOfQueries || 0,
        };
      })



      // SEARCH PRODUCTS
      .addCase(searchProducts.pending, (state, action) => {
        const queryKey = getQueryKey(action.meta.arg);
        state.queries[queryKey] = {
          items: [],
          status: "loading",
          error: null,
          countOfQueries: 0,
        };
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        const queryKey = getQueryKey(action.meta.arg);
        state.queries[queryKey] = {
          items: action.payload.products,
          status: "succeeded",
          error: null,
          countOfQueries: (state.queries[queryKey]?.countOfQueries || 0) + 1,
        };
        state.total = action.payload.total;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        const queryKey = getQueryKey(action.meta.arg);
        state.queries[queryKey] = {
          items: [],
          status: "failed",
          error: action.error.message || "Failed to search products",
          countOfQueries: state.queries[queryKey]?.countOfQueries || 0,
        };
      });
  },
});

export default productsSlice.reducer;
