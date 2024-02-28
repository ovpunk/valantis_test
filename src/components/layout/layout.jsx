import { Home } from "../../pages/home/home";
import { Footer } from "./footer/footer";
import { Header } from "./header/header";

export const Layout = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Home />
      </main>
      <Footer />
    </>
  );
};
