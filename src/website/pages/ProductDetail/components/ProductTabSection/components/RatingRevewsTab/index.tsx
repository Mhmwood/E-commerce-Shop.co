import CustomersReviewsList from "@/components/Users/CustomersReviewsList";
import { ProductReview } from "@/types/products";

const RatingReviewTabs = ({ reviews }: { reviews: ProductReview[] }) => {
  return (
    <div className="space-y-10">
      <h3 className="mb-3 text-2xl font-bold md:col-span-2 lg:col-span-3 mr-5">
        All Reviews
        <span className=" font-normal text-black/60">({reviews.length})</span>
      </h3>

      <CustomersReviewsList reviews={reviews} sortOrder="desc" grid={true} />
    </div>
  );
};
export default RatingReviewTabs;
