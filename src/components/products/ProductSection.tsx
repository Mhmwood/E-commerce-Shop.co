import { useProducts } from "@/hooks/use-products";
import ProductList from "./ProductList";
import { Product } from "@/types/products";
import { useNavigate } from "react-router-dom";
import ShowLoader from "../ui/Loaders/ShowLoader";

interface ProductSectionProps {
  title: string;
  category?: string;
  sortBy?: keyof Product;
  order?: "asc" | "desc";
  limit?: number;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  category,
  sortBy,
  order,
  limit = 10,
}) => {
  const { products, isLoading } = useProducts({
    category: category || undefined,
    sortBy,
    order,
    limit,
  });

  const navigator = useNavigate();

  return (
    <section className="py-10 md:py-20 transition-all duration-300">
      <div className="flex flex-col items-center justify-center space-y-14">
        {isLoading ? (
          <ShowLoader />
        ) : (
          <>
            <h2 className="text-4xl font-extrabold font-integral">{title}</h2>
            <ProductList products={products} />
            <div className="flex space-x-4">
              <button
                onClick={() =>
                  navigator(
                    `/shop/${category || ""}?sortBy=${sortBy}&order=${order}`
                  )
                }
                className="w-auto rounded-full py-4 px-8 border-2 hover:bg-primary hover:text-white transition-all duration-300"
              >
                Show All
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductSection;
