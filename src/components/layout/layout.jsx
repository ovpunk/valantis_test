import { createContext, useState } from "react";
import { Home } from "../../pages/home/home";
import { Footer } from "./footer/footer";
import { Header } from "./header/header";

export const SearchContext = createContext("");

export const Layout = () => {
  const [value, setValue] = useState("");
  return (
    <>
      <SearchContext.Provider value={{ value, setValue }}>
        <Header />
        <main className="main">
          <Home />
        </main>
        <Footer />
      </SearchContext.Provider>
    </>
  );
};
