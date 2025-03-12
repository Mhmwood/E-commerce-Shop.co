import axios from "axios";
import { apiClient } from "@/lib/axios";
import { Product } from "@/types/products";
interface ProductsResponse {
  products: Product[];
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


interface SearchParams {
  query: string;
}

export const productEndpoints = {
  async getProducts(params?: GetProductsParams): Promise<ProductsResponse> {
    try {
      let endpoint = "products";

      if (params?.category) {
        endpoint = `products/category/${params.category}`;
      } else if (params?.query) {
        endpoint = "products/search";
      }

      const queryParams = {
        ...(params?.query && { q: params.query }),
        ...(params?.limit && { limit: params.limit }),
        ...(params?.skip && { skip: params.skip }),
        ...(params?.select && { select: params.select.join(",") }),
        ...(params?.sortBy && { sortBy: params.sortBy }),
        ...(params?.order && { order: params.order }),
      };

      const { data } = await apiClient.get<ProductsResponse>(endpoint, {
        params: queryParams,
      });

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching products:", error.message);
        throw new Error(
          error.response?.data?.message || "Failed to fetch products"
        );
      }
      throw new Error("Failed to fetch products");
    }
  },

  async getProductById({ id, select }: GetProductByIdParams): Promise<Product> {
    try {
      const { data } = await apiClient.get<Product>(`products/${id}`, {
        params: {
          ...(select && { select: select.join(",") }),
        },
      });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message ||
            `Failed to fetch product with id ${id}`
        );
      }
      throw new Error(`Failed to fetch product with id ${id}`);
    }
  },

  async searchProducts({ query }: SearchParams): Promise<ProductsResponse> {
    try {
      const { data } = await apiClient.get<ProductsResponse>(
        "products/search",
        {
          params: { q: query },
        }
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || `No products found for "${query}"`
        );
      }
      throw new Error(`Failed to search products with query "${query}"`);
    }
  },
};
