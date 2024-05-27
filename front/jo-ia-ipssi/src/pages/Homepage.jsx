import React from "react";
import Navbar from "../components/Head";
import Ranking from "../components/Ranking";
import RankingChart from "../components/RankingChart";
import TrendChart from "../components/TrendChart";
import PieChart from "../components/PieChart";
import ParallaxComponent from "../components/ParallaxComponent";
import Footer from "../components/Footer";


export default function Homepage() {
  return (
    <>
      <Navbar />

      <div className="container">
        <div className="row my-5">
          <Ranking />
          <RankingChart />
          <TrendChart />
        </div>
      </div>
      <ParallaxComponent />

      <div className="container">
        <div className="row my-5">
          <PieChart />
          <RankingChart />
          <RankingChart />
        </div>
      </div>
      <Footer />
    </>
  );
}
