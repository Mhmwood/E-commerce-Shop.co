import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/products";

const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductList;
