import Card from "@/components/products/ProductCard";
import {
  PaginationDemo,
  SelectDemo,
} from "@/components/shadcn components/components";
import ShowError from "@/components/ui/errs/ShowError";
import ShowLoader from "@/components/ui/Loaders/ShowLoader";
import { useProducts } from "@/hooks/use-products";
import { Product } from "@/types/products";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import FliterMenu from "./FliterMenu";
import { useClickOutside } from "@/hooks/use-click-outside";

const ShowProduct = ({
  category,
  sortBy,
  order,
}: {
  category?: string;
  sortBy?: keyof Product;
  order?: "asc" | "desc";
  isSearch?: boolean;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortByState, setSortBy] = useState<keyof Product | undefined>(sortBy);
  const [openMenu, setOpenMenu] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setOpenMenu(false));
  const location = useLocation();

  const limit = 9;
  useEffect(() => {
    setSortBy(sortBy);
    setOpenMenu(false);
    setCurrentPage(1);
  }, [sortBy, location]);

  const { products, isLoading, total, isError, error } = useProducts({
    category: category || undefined,
    limit: limit,
    sortBy: sortByState,
    order,
    skip: (currentPage - 1) * limit,
  });

  const totalPages = Math.ceil(total / limit);
  localStorage.setItem("category", category || "");

  const selectOptionsMap = {
    "Most Popular": "reviews",
    "Top Related": "rating",
    Newest: "meta",
    Price: "price",
  } as Record<string, keyof Product>;

  const [searchParams] = useSearchParams();
  const minPrice = searchParams.get("minprice") as string | undefined;
  const maxPrice = searchParams.get("maxprice") as string | undefined;
  return (
    <div className="relative">
      <nav className="flex justify-between items-center ">
        <h4 className=" hidden lg:block text-2xl font-bold mr-2 md:mr-0">
          {category}
        </h4>
        <div className=" flex gap-3 text-gray-400">
          <span className="">
            Showing {(currentPage - 1) * limit + 1} -
            {Math.min(currentPage * limit, total)} of {total} Products
          </span>
          <div className=" hidden md:flex  ">
            <span className="w-full mr-1 ">Sort by:</span>
            <SelectDemo
              options={Object.keys(selectOptionsMap)}
              onChange={(value) =>
                setSortBy(selectOptionsMap[value] || "reviews")
              }
            />
          </div>
        </div>

        <AnimatePresence>
          {openMenu && (
            <motion.div
              initial={{ x: "-15vw", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-15vw", opacity: 0 }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
              className="absolute top-16   z-10 lg:hidden   w-full "
              ref={ref}
            >
              <FliterMenu />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="  lg:hidden  relative">
          <button
            className=" flex  "
            onClick={() => setOpenMenu((prev) => !prev)}
          >
            <svg
              width={54}
              height={54}
              viewBox="0 0 24 24"
              fill="none"
              className="   hover:fill-gray-700  fill-gray-800 bg-secondary p-1 rounded-full "
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.125 12.125V20.75C13.125 21.0484 13.0065 21.3345 12.7955 21.5455C12.5845 21.7565 12.2984 21.875 12 21.875C11.7016 21.875 11.4155 21.7565 11.2045 21.5455C10.9935 21.3345 10.875 21.0484 10.875 20.75V12.125C10.875 11.8266 10.9935 11.5405 11.2045 11.3295C11.4155 11.1185 11.7016 11 12 11C12.2984 11 12.5845 11.1185 12.7955 11.3295C13.0065 11.5405 13.125 11.8266 13.125 12.125ZM18.75 18.5C18.4516 18.5 18.1655 18.6185 17.9545 18.8295C17.7435 19.0405 17.625 19.3266 17.625 19.625V20.75C17.625 21.0484 17.7435 21.3345 17.9545 21.5455C18.1655 21.7565 18.4516 21.875 18.75 21.875C19.0484 21.875 19.3345 21.7565 19.5455 21.5455C19.7565 21.3345 19.875 21.0484 19.875 20.75V19.625C19.875 19.3266 19.7565 19.0405 19.5455 18.8295C19.3345 18.6185 19.0484 18.5 18.75 18.5ZM21 14.75H19.875V4.25C19.875 3.95163 19.7565 3.66548 19.5455 3.4545C19.3345 3.24353 19.0484 3.125 18.75 3.125C18.4516 3.125 18.1655 3.24353 17.9545 3.4545C17.7435 3.66548 17.625 3.95163 17.625 4.25V14.75H16.5C16.2016 14.75 15.9155 14.8685 15.7045 15.0795C15.4935 15.2905 15.375 15.5766 15.375 15.875C15.375 16.1734 15.4935 16.4595 15.7045 16.6705C15.9155 16.8815 16.2016 17 16.5 17H21C21.2984 17 21.5845 16.8815 21.7955 16.6705C22.0065 16.4595 22.125 16.1734 22.125 15.875C22.125 15.5766 22.0065 15.2905 21.7955 15.0795C21.5845 14.8685 21.2984 14.75 21 14.75ZM5.25 15.5C4.95163 15.5 4.66548 15.6185 4.4545 15.8295C4.24353 16.0405 4.125 16.3266 4.125 16.625V20.75C4.125 21.0484 4.24353 21.3345 4.4545 21.5455C4.66548 21.7565 4.95163 21.875 5.25 21.875C5.54837 21.875 5.83452 21.7565 6.0455 21.5455C6.25647 21.3345 6.375 21.0484 6.375 20.75V16.625C6.375 16.3266 6.25647 16.0405 6.0455 15.8295C5.83452 15.6185 5.54837 15.5 5.25 15.5ZM7.5 11.75H6.375V4.25C6.375 3.95163 6.25647 3.66548 6.0455 3.4545C5.83452 3.24353 5.54837 3.125 5.25 3.125C4.95163 3.125 4.66548 3.24353 4.4545 3.4545C4.24353 3.66548 4.125 3.95163 4.125 4.25V11.75H3C2.70163 11.75 2.41548 11.8685 2.2045 12.0795C1.99353 12.2905 1.875 12.5766 1.875 12.875C1.875 13.1734 1.99353 13.4595 2.2045 13.6705C2.41548 13.8815 2.70163 14 3 14H7.5C7.79837 14 8.08452 13.8815 8.2955 13.6705C8.50647 13.4595 8.625 13.1734 8.625 12.875C8.625 12.5766 8.50647 12.2905 8.2955 12.0795C8.08452 11.8685 7.79837 11.75 7.5 11.75ZM14.25 7.25H13.125V4.25C13.125 3.95163 13.0065 3.66548 12.7955 3.4545C12.5845 3.24353 12.2984 3.125 12 3.125C11.7016 3.125 11.4155 3.24353 11.2045 3.4545C10.9935 3.66548 10.875 3.95163 10.875 4.25V7.25H9.75C9.45163 7.25 9.16548 7.36853 8.9545 7.5795C8.74353 7.79048 8.625 8.07663 8.625 8.375C8.625 8.67337 8.74353 8.95952 8.9545 9.1705C9.16548 9.38147 9.45163 9.5 9.75 9.5H14.25C14.5484 9.5 14.8345 9.38147 15.0455 9.1705C15.2565 8.95952 15.375 8.67337 15.375 8.375C15.375 8.07663 15.2565 7.79048 15.0455 7.5795C14.8345 7.36853 14.5484 7.25 14.25 7.25Z"
                floodOpacity="0.4"
              />
            </svg>
          </button>
          {openMenu && <div className="absolute  p-5 inset-0"></div>}
        </div>
      </nav>
      {/* isLoading */}
      <div
        className={`${
          isLoading || "min-[375px]:grid max-[375px]:flex"
        } justify-center  flex-wrap grid-cols-2 md:grid-cols-3 gap-5 mt-4 border-b w-full  `}
      >
        {isLoading ? (
          <div className="flex   justify-center items-center h-screen w-full">
            <ShowLoader />
          </div>
        ) : isError ? (
          <div className="flex   justify-center items-center h-screen col-span-full">
            <ShowError errorMsg={error} />
          </div>
        ) : minPrice && maxPrice ? (
          products
            .filter(
              (product: Product) =>
                product.price >= Number(minPrice) &&
                product.price <= Number(maxPrice)
            )
            .map((product: Product) => <Card key={product.id} {...product} />)
            .length === 0 && (
            <div className="flex  justify-center items-center h-screen col-span-full">
              <p className="text-black/60">No products availabl</p>
            </div>
          )
        ) : (
          products.map((product: Product) => (
            <Card key={product.id} {...product} />
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-5 flex justify-center">
          <PaginationDemo
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default ShowProduct;
