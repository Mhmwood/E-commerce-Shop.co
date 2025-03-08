import React, { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Product } from "@/types/products";


const ProductDetailsTab = React.lazy(
  () => import("./components/ProductDetailsTab")
);
const RatingRevewsTab = React.lazy(
  () => import("./components/RatingRevewsTab")
);

interface ProductTabSectionProps {
  product: Product;
}

const Loader = () => <div>Loading...</div>;

const ProductTabSection: React.FC<ProductTabSectionProps> = ({ product }) => {
  return (
    <Tabs defaultValue="details" className="py-8">
      <TabsList className="w-full">
        <TabsTrigger value="details" className="w-full">
          Product Details
        </TabsTrigger>
        <TabsTrigger  value="ratings-reviews" className="w-full">
          Rating & Reviews
        </TabsTrigger>
      </TabsList>

      <TabsContent value="details">
        <Suspense fallback={<Loader />}>
          <ProductDetailsTab product={product} />
        </Suspense>
      </TabsContent>

      <TabsContent value="ratings-reviews">
        <Suspense fallback={<Loader />}>
          <RatingRevewsTab reviews={product.reviews} />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabSection;
