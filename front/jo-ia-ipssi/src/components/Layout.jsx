import { useEffect } from "react";
import Head from "./Head";
import Footer from "./Footer";

const Layout = ({
  title = "IA - JO - IPSSI",
  description = "Plongez dans l'avenir des Jeux Olympiques de Paris 2024 avec notre plateforme d'analyse de données et de modélisation prédictive",
  children,
}) => {
  useEffect(() => {
    document.title = title;
    document.getElementsByTagName("META")[3].content = description;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
