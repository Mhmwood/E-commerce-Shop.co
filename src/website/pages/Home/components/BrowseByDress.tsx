import { casual, formal, party, gym } from "@/assets/img/Browse By Dress";
import { useNavigate } from "react-router-dom";
const BrowseByDress = () => {
  const navigate = useNavigate();
  return (
    <section className=" py-10 md:py-20  px-4 md:px-20">
      <div className="p-16 bg-secondary-foreground rounded-3xl text-center ">
        <h2 className="text-4xl font-extrabold mb-16 font-integral">
          BROWSE BY DRESS STYLE
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5  ">
          <div
            onClick={() => navigate("/shop/mens-shirts")}
            className="cursor-pointer relative overflow-hidden rounded-3xl md:col-span-1  h-[190px] md:h-[289px]"
          >
            <h4 className="absolute z-10  font-bold text-5xl top-0 left-0 transform translate-y-6 translate-x-9">
              shirts
            </h4>
            <div className="w-full z-0  h-full  ">
              <img
                src={casual}
                className="transform  transition-transform duration-300 hover:scale-105 object-cover w-full h-full"
                alt="casual"
              />
            </div>
          </div>

          <div
            onClick={() => navigate("/shop/mens-watches")}
            className="cursor-pointer relative overflow-hidden rounded-3xl md:col-span-2 h-[190px] md:h-[289px] "
          >
            <h4 className="absolute z-10  font-bold text-5xl top-0 left-0 transform translate-y-6 translate-x-9">
              watches
            </h4>
            <div className="w-full z-0  h-full ">
              <img
                src={formal}
                className="transform  transition-transform duration-300 hover:scale-105 object-cover w-full h-full"
                alt="formal"
              />
            </div>
          </div>

          <div
            onClick={() => navigate("/shop/womens-dresses")}
            className="cursor-pointer relative overflow-hidden rounded-3xl md:col-span-2 h-[190px] md:h-[289px]"
          >
            <h4 className="absolute z-10 font-integral  font-bold text-5xl top-0 left-0 transform translate-y-6 translate-x-9">
              Party
            </h4>
            <div className="w-full z-0  h-full ">
              <img
                src={party}
                className="transform  transition-transform duration-300 hover:scale-105 object-cover w-full h-full"
                alt="party"
              />
            </div>
          </div>

          <div
            onClick={() => navigate("/shop/sports-accessories")}
            className="cursor-pointer relative overflow-hidden rounded-3xl md:col-span-1 h-[190px] md:h-[289px] "
          >
            <h4 className="absolute z-10  font-bold text-5xl top-0 left-0 transform translate-y-6 translate-x-9">
              Gym
            </h4>
            <div className="w-full z-0  h-full ">
              <img
                src={gym}
                className="transform transition-transform duration-300 hover:scale-105 object-cover w-full h-full"
                alt="gym"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrowseByDress;
