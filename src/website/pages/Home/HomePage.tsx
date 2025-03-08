import ProductSection from "@/components/products/ProductSection";
import Hero from "./components/Hero/Hero";
import BrowseByDress from "./components/BrowseByDress";
import OurHappyCustomers from "./components/OurHappyCustomers";

const HomePage = () => {
  return (
    <main className="mt-16">
      <Hero />
      <ProductSection
        title="NEW ARRIVALS"
        sortBy="meta"
        limit={10}
        order="desc"
      />
      <div className="px-4 md:px-20">
        <hr className="  my-8  border border-gray-300" />
      </div>
      <ProductSection title="Top Selling" sortBy="rating" order="desc" limit={10} />
      <BrowseByDress />
      <OurHappyCustomers />
    </main>
  );
};

export default HomePage;
