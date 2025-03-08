import { useParams, useSearchParams } from "react-router-dom";
import ShowProduct from "./components/ShowProduct";
import { Product } from "@/types/products";
import FliterMenu from "./components/FliterMenu";
import { useEffect } from "react";
import { BreadcrumbBar } from "@/components/shadcn components/BreadcrumbBar";

const ShopPage = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") as keyof Product | undefined;
  const order = searchParams.get("order") as "asc" | "desc" | undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="py-10 md:py-20 px-4 md:px-20 mt-10">
      <BreadcrumbBar name={category || ""} />
      <div className="lg:grid grid-cols-12 gap-5 mt-6 ">
        <div className="col-span-3 hidden lg:block ">
          <FliterMenu />
        </div>

        <div className="col-span-9 w-full  ">
          <ShowProduct category={category} sortBy={sortBy} order={order} />
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
