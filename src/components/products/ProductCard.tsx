import StarsRating from "@/components/ui/StarsRating";
import { Product } from "@/types/products";
import { useNavigate } from "react-router-dom";
import PriceDisplay from "./PriceDisplay";


const ProductCard = ({
  title,
  images,
  price,
  rating,
  discountPercentage,
  id,
}: Product) => {
  const navigate = useNavigate();

 

  return (
    <div className=" max-w-[295px] cursor-pointer">
      <div
        className="overflow-hidden rounded-[1.25rem]"
        onClick={() => navigate(`/ProductDetailPage/${id}`)}
      >
        <figure className="block  bg-secondary">
          {!images || images.length === 0 ? (
            <div className="rounded-xl bg-warn/10 p-4">
              No product images available
            </div>
          ) : (
            <img
              className="transform transition-transform duration-300 hover:scale-105 w-[295px] h-[298px] object-cover"
              src={images[0]}
              alt={title}
              loading="lazy"
           
            />
          )}
        </figure>
      </div>
      <div className="px-5 pb-5 mt-4">
        
        <h5 className="text-xl font-bold">{title }</h5>
        <StarsRating rating={rating} showNumber />
        <PriceDisplay price={price} discount={discountPercentage} />
      </div>
    </div>
  );
};

export default ProductCard;
