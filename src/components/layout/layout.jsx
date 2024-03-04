import { createContext, useState } from "react";

import { Footer } from "./footer/footer";
import { Header } from "./header/header";
import { Home } from "../../pages/home/home";

export const SearchContext = createContext("");

export const Layout = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("Выбрать бренд");
  const [priceFilterValue, setPriceFilterValue] = useState(0);

  return (
    <>
      <SearchContext.Provider
        value={{
          inputValue,
          setInputValue,
          selectedBrand,
          setSelectedBrand,
          priceFilterValue,
          setPriceFilterValue,
        }}
      >
        <Header />
        <main className="main">
          <Home />
        </main>
        <Footer />
      </SearchContext.Provider>
    </>
  );
};
