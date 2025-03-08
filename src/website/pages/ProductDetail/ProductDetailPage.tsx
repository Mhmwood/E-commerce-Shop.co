import { useParams } from "react-router-dom";

import ImageDisplay from "./components/ImageDisplay";
import InfoDisplay from "./components/InfoDisplay";

import { useProductById } from "@/hooks/use-products";
import ProductTabSection from "./components/ProductTabSection";
import ProductSection from "@/components/products/ProductSection";
import ShowLoader from "../../../components/ui/Loaders/ShowLoader";
import { BreadcrumbBar } from "@/components/shadcn components/BreadcrumbBar";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { product } = useProductById({
    id: Number(id),
  });

  if (!product) {
    return (
      <div className="min-h-lvh flex justify-center items-center">
        <ShowLoader />
      </div>
    );
  }
  return (
    <div className="py-10 md:py-20 px-4 md:px-20 mt-7">
      <div className="mt-6 mb-9">
        <BreadcrumbBar link={`${product.category}`} name={product.title} />
      </div>
      <section className="grid gap-x-6 max-lg:gap-y-5 lg:grid-cols-[30.125rem_1fr] xl:grid-cols-[38.125rem_1fr]">
        <ImageDisplay images={product?.images || []} />
        <InfoDisplay product={product} />
      </section>
      <section>
        <ProductTabSection product={product} />
      </section>
      <section className="mt-12">
        <ProductSection
          title="You might also like"
          limit={5}
          category={product.category}
          sortBy="rating"
          order="desc"
        />
      </section>
    </div>
  );
};
export default ProductDetailPage;
