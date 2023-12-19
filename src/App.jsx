import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./scenes/global/Navbar";
import { Footer } from "./scenes/global/Footer";
import { Home } from "./scenes/home/Home";
import { Checkout } from "./scenes/checkout/Checkout";
import { Confirmation } from "./scenes/checkout/Confirmation";
import { ProductDetails } from "./scenes/productDetails/ProductDetails";
import { CartMenu } from "./scenes/global/CartMenu";
import { SearchResults } from "./scenes/search/SearchResults";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0, "instant");
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="products/:productCategory/:productName/:productId/"
            element={<ProductDetails />}
          />
          <Route path="search/" element={<SearchResults />} />
          <Route path="checkout/" element={<Checkout />} />
          <Route path="checkout/success/" element={<Confirmation />} />
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
