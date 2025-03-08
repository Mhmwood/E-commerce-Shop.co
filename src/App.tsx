import { Route, Routes } from "react-router-dom";
import Footer from "./website/Footer";
import Header from "./website/Header";
import HomePage from "./website/pages/Home/HomePage";
import ProductDetailPage from "./website/pages/ProductDetail/ProductDetailPage";
import ShopPage from "./website/pages/Shop/ShopPage";
import CartPage from "./website/pages/Cart/CartPage";
import UserPage from "./website/pages/User/UserPage";

const App: React.FC = () => {
  return (
    <div className="bg-[#ffffff] text-primary font-satoshi ">
      {/* <Bunner /> ProductDetailPage */}

      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ProductDetailPage/:id" element={<ProductDetailPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:category" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
